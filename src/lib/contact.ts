import { serviceOptions } from "./site";

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
  /** Honeypot anti-spam: deve permanecer vazio. */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown, max: number) =>
  (typeof v === "string" ? v : "").trim().slice(0, max);

/** Normaliza dados vindos do cliente (FormData ou JSON). */
export function normalizeContact(raw: Record<string, unknown>): ContactInput {
  return {
    name: str(raw.name, 100),
    email: str(raw.email, 150).toLowerCase(),
    phone: str(raw.phone, 30),
    company: str(raw.company, 100),
    service: str(raw.service, 60),
    message: str(raw.message, 2000),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
    website: str(raw.website, 200),
  };
}

/** Validação compartilhada entre cliente e servidor. */
export function validateContact(data: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Informe seu nome.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Informe um e-mail válido.";

  const digits = data.phone.replace(/\D/g, "");
  if (data.phone && (digits.length < 10 || digits.length > 13)) {
    errors.phone = "Informe um telefone válido com DDD.";
  }

  if (!(serviceOptions as readonly string[]).includes(data.service)) {
    errors.service = "Selecione o serviço de interesse.";
  }

  if (data.message.length < 10) {
    errors.message = "Conte um pouco mais sobre o projeto (mín. 10 caracteres).";
  }

  if (!data.consent) {
    errors.consent = "É necessário concordar com a Política de Privacidade.";
  }

  return errors;
}
