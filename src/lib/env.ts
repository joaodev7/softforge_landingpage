/**
 * Centralização e validação de variáveis de ambiente (.env).
 *
 * - `publicEnv`: variáveis públicas (`NEXT_PUBLIC_*`) seguras para Server e Client Components.
 * - `getServerEnv()`: variáveis exclusivas de servidor (chaves de API, webhooks, rate limit).
 */

const str = (val: string | undefined, fallback: string): string => {
  const trimmed = val?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
};

const num = (val: string | undefined, fallback: number): number => {
  if (!val) return fallback;
  const parsed = Number.parseInt(val.trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const publicEnv = {
  siteUrl: str(process.env.NEXT_PUBLIC_SITE_URL, "https://softforge.com.br"),
  companyName: str(process.env.NEXT_PUBLIC_COMPANY_NAME, "SoftForge"),
  companyLegalName: str(
    process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME,
    "SoftForge Tecnologia LTDA",
  ),
  companyCnpj: str(process.env.NEXT_PUBLIC_COMPANY_CNPJ, "00.000.000/0001-00"),
  contactEmail: str(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "contato@softforge.com.br"),
  founderName: str(process.env.NEXT_PUBLIC_FOUNDER_NAME, "João Vitor P. Andrade"),
  founderEmail: str(process.env.NEXT_PUBLIC_FOUNDER_EMAIL, "joao@softforge.com.br"),
  phoneDisplay: str(process.env.NEXT_PUBLIC_PHONE_DISPLAY, "+55 (11) 90000-0000"),
  whatsappNumber: str(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, "5511900000000"),
  city: str(process.env.NEXT_PUBLIC_CITY, "São Paulo, SP"),
  instagramHandle: str(process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE, "@softforge"),
  social: {
    linkedin: str(
      process.env.NEXT_PUBLIC_LINKEDIN_URL,
      "https://www.linkedin.com/company/softforge",
    ),
    instagram: str(
      process.env.NEXT_PUBLIC_INSTAGRAM_URL,
      "https://www.instagram.com/softforge",
    ),
    github: str(process.env.NEXT_PUBLIC_GITHUB_URL, "https://github.com/softforge"),
  },
} as const;

export type ServerEnv = {
  resendApiKey: string | null;
  resendApiUrl: string;
  contactFromEmail: string;
  contactToEmail: string;
  contactWebhookUrl: string | null;
  rateLimitMax: number;
  rateLimitWindowMs: number;
};

/**
 * Lê variáveis sensíveis apenas no servidor (Route Handlers / Server Actions).
 */
export function getServerEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("getServerEnv() só pode ser chamado no servidor.");
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim() || null;
  const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim() || null;

  return {
    resendApiKey,
    resendApiUrl: str(process.env.RESEND_API_URL, "https://api.resend.com/emails"),
    contactFromEmail: str(
      process.env.CONTACT_FROM_EMAIL,
      "SoftForge Site <onboarding@resend.dev>",
    ),
    contactToEmail: str(process.env.CONTACT_TO_EMAIL, publicEnv.contactEmail),
    contactWebhookUrl,
    rateLimitMax: num(process.env.CONTACT_RATE_LIMIT_MAX, 5),
    rateLimitWindowMs: num(process.env.CONTACT_RATE_LIMIT_WINDOW_MS, 10 * 60 * 1000),
  };
}
