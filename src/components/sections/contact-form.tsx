"use client";

import Link from "next/link";
import { useState } from "react";
import {
  normalizeContact,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";
import { serviceOptions } from "@/lib/site";
import { buttonClasses } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = normalizeContact(Object.fromEntries(new FormData(form)));
    const found = validateContact(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move o foco para o primeiro campo inválido (WCAG 3.3.1).
      const first = Object.keys(found)[0] as keyof ContactInput;
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        message?: string;
        errors?: ContactErrors;
      };
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.message ?? "Não foi possível enviar sua mensagem.");
      }
      setStatus("success");
      setServerMessage(json.message ?? "Mensagem enviada com sucesso!");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerMessage(err instanceof Error ? err.message : "Erro inesperado.");
    }
  }

  const fieldProps = (name: keyof ContactInput) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const errorText = (name: keyof ContactInput) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-sm text-red-300">
        {errors[name]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div role="status" className="card flex flex-col items-center p-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
          <Icon name="check" className="size-8" />
        </span>
        <h3 className="mt-6 text-2xl font-bold">Recebemos sua mensagem!</h3>
        <p className="mt-3 text-muted">{serverMessage}</p>
        <button
          type="button"
          className={buttonClasses("secondary", "mt-8")}
          onClick={() => setStatus("idle")}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label="Formulário de orçamento"
      className="card relative space-y-5 p-6 sm:p-8"
    >
      {/* Honeypot: invisível para humanos, preenchido por bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-subtle">
            Nome <span aria-hidden="true" className="text-brand-400">*</span>
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required className="field" />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-subtle">
            E-mail <span aria-hidden="true" className="text-brand-400">*</span>
          </label>
          <input {...fieldProps("email")} type="email" autoComplete="email" required className="field" />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-subtle">
            WhatsApp / Telefone
          </label>
          <input
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(11) 90000-0000"
            className="field"
          />
          {errorText("phone")}
        </div>
        <div>
          <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-subtle">
            Empresa
          </label>
          <input {...fieldProps("company")} type="text" autoComplete="organization" className="field" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="mb-1.5 block text-sm font-medium text-subtle">
          Serviço de interesse <span aria-hidden="true" className="text-brand-400">*</span>
        </label>
        <select {...fieldProps("service")} required defaultValue="" className="field">
          <option value="" disabled>
            Selecione uma opção
          </option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errorText("service")}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-subtle">
          Conte sobre o seu projeto <span aria-hidden="true" className="text-brand-400">*</span>
        </label>
        <textarea
          {...fieldProps("message")}
          rows={4}
          required
          placeholder="Objetivo, prazo desejado, referências..."
          className="field resize-y"
        />
        {errorText("message")}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            {...fieldProps("consent")}
            type="checkbox"
            required
            className="mt-1 size-4 shrink-0 accent-brand-500"
          />
          <label htmlFor="contact-consent" className="text-sm text-subtle">
            Concordo com o tratamento dos meus dados para retorno deste contato, conforme a{" "}
            <Link
              href="/privacidade"
              className="font-medium text-brand-300 underline underline-offset-2 hover:text-brand-400"
            >
              Política de Privacidade
            </Link>
            .
          </label>
        </div>
        {errorText("consent")}
      </div>

      <p className="text-xs text-muted">
        <span aria-hidden="true" className="text-brand-400">*</span> Campos obrigatórios
      </p>

      <div aria-live="polite" role="status">
        {status === "error" && (
          <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {serverMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={buttonClasses("primary", "w-full text-base")}
      >
        {status === "loading" ? "Enviando..." : "Enviar e receber orçamento"}
        {status !== "loading" && <Icon name="arrow" className="size-5" />}
      </button>
    </form>
  );
}
