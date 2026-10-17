import { NextResponse, type NextRequest } from "next/server";
import { normalizeContact, validateContact } from "@/lib/contact";
import { getServerEnv } from "@/lib/env";

/**
 * Recebe leads do formulário de contato.
 *
 * Toda a configuração de envio (RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL,
 * CONTACT_WEBHOOK_URL e parâmetros de rate limit) é lida via `.env` em `src/lib/env.ts`.
 */

const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string, maxRequests: number, windowMs: number) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > maxRequests;
}

const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(request: NextRequest) {
  const serverEnv = getServerEnv();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";

  if (rateLimited(ip, serverEnv.rateLimitMax, serverEnv.rateLimitWindowMs)) {
    return NextResponse.json(
      { message: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 },
    );
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ message: "Requisição inválida." }, { status: 400 });
  }

  const data = normalizeContact(raw);

  // Honeypot preenchido → finge sucesso para não dar pistas ao bot.
  if (data.website) {
    return NextResponse.json({ message: "Mensagem enviada com sucesso!" });
  }

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Verifique os campos destacados.", errors },
      { status: 422 },
    );
  }

  // 1. Envio de e-mail via Resend (quando RESEND_API_KEY está configurada no .env)
  if (serverEnv.resendApiKey) {
    const rows = [
      ["Nome", data.name],
      ["E-mail", data.email],
      ["Telefone", data.phone || "-"],
      ["Empresa", data.company || "-"],
      ["Serviço", data.service],
      ["Mensagem", data.message],
    ]
      .map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v).replace(/\n/g, "<br>")}</p>`)
      .join("");

    const res = await fetch(serverEnv.resendApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serverEnv.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: serverEnv.contactFromEmail,
        to: [serverEnv.contactToEmail],
        reply_to: data.email,
        subject: `Novo lead: ${data.service} — ${data.name}`,
        html: rows,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Falha no envio via Resend", res.status, await res.text());
      return NextResponse.json(
        { message: "Não conseguimos enviar agora. Tente pelo WhatsApp ou e-mail." },
        { status: 502 },
      );
    }
  } else {
    // Minimização de dados no log quando a chave não está definida (LGPD).
    console.info("[contact] Novo lead recebido (RESEND_API_KEY não configurada no .env):", {
      service: data.service,
      domain: data.email.split("@")[1],
    });
  }

  // 2. Webhook opcional (CRM / Slack / Discord / n8n) se CONTACT_WEBHOOK_URL estiver no .env
  if (serverEnv.contactWebhookUrl) {
    try {
      await fetch(serverEnv.contactWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "softforge-landing",
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: data.service,
          message: data.message,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("[contact] Falha ao notificar CONTACT_WEBHOOK_URL", err);
    }
  }

  return NextResponse.json({
    message: `Obrigado, ${data.name.split(" ")[0]}! Nossa equipe entrará em contato em até 24 horas úteis.`,
  });
}
