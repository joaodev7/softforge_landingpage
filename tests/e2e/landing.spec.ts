import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renderiza hero, metadados e todas as seções", async ({ page }) => {
    await expect(page).toHaveTitle(/SoftForge/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Forjamos software");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");

    for (const id of [
      "servicos",
      "cases",
      "processo",
      "diferenciais",
      "depoimentos",
      "faq",
      "contato",
    ]) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
    }

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.length).toBeGreaterThan(100);
    expect(description!.length).toBeLessThanOrEqual(170);

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    const parsed = JSON.parse(jsonLd!);
    const types = parsed["@graph"].map((n: { "@type": string }) => n["@type"]);
    expect(types).toEqual(
      expect.arrayContaining([
        "Organization",
        "FAQPage",
        "ProfessionalService",
        "SoftwareApplication",
      ]),
    );
  });

  test("lista os 6 serviços principais", async ({ page }) => {
    const services = page.locator("#servicos > div > ul > li");
    await expect(services).toHaveCount(6);
    await expect(page.locator("#servicos")).toContainText("Fábrica de Software");
    await expect(page.locator("#servicos")).toContainText("Landing Pages");
  });

  test("exibe os produtos reais PRAXIS e catchVagas na seção de cases", async ({ page }) => {
    const casesSection = page.locator("#cases");
    await expect(casesSection.getByRole("heading", { name: "PRAXIS" })).toBeVisible();
    await expect(casesSection).toContainText("RDC 216");
    await expect(casesSection).toContainText(".NET 8 Web API");

    await expect(casesSection.getByRole("heading", { name: "catchVagas" })).toBeVisible();
    await expect(casesSection).toContainText("Telegram");
    await expect(casesSection).toContainText("Python 3.10+");
  });

  test("CTA do hero leva ao formulário de contato", async ({ page }) => {
    await page.getByRole("link", { name: /Solicitar orçamento grátis/ }).click();
    await expect(page).toHaveURL(/#contato$/);
    await expect(page.getByRole("form", { name: "Formulário de orçamento" })).toBeInViewport();
  });

  test("link do WhatsApp é seguro e abre em nova aba", async ({ page }) => {
    const wa = page.locator("section").first().getByRole("link", { name: /WhatsApp/ });
    await expect(wa).toHaveAttribute("href", /^https:\/\/wa\.me\/\d+/);
    await expect(wa).toHaveAttribute("target", "_blank");
    await expect(wa).toHaveAttribute("rel", /noopener/);
  });

  test("FAQ abre e fecha (acordeão exclusivo)", async ({ page }) => {
    const items = page.locator("#faq details");
    await expect(items).toHaveCount(6);
    await items.nth(0).locator("summary").click();
    await expect(items.nth(0)).toHaveAttribute("open", "");
    await items.nth(1).locator("summary").click();
    await expect(items.nth(1)).toHaveAttribute("open", "");
    await expect(items.nth(0)).not.toHaveAttribute("open", "");
  });
});

test.describe("Formulário de contato", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contato");
  });

  test("exibe erros de validação acessíveis e foca o primeiro campo", async ({ page }) => {
    await page.getByRole("button", { name: /Enviar e receber orçamento/ }).click();
    const name = page.getByLabel(/^Nome/);
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Informe seu nome.")).toBeVisible();
    await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
    await expect(page.getByText(/concordar com a Política de Privacidade/)).toBeVisible();
  });

  test("envia com sucesso quando os dados são válidos", async ({ page }) => {
    await page.getByLabel(/^Nome/).fill("Maria Teste");
    await page.getByLabel(/^E-mail/).fill("maria@example.com");
    await page.getByLabel(/WhatsApp \/ Telefone/).fill("(11) 98888-7777");
    await page.getByLabel(/Serviço de interesse/).selectOption("Landing Page");
    await page
      .getByLabel(/Conte sobre o seu projeto/)
      .fill("Quero uma landing page para o meu produto.");
    await page.getByLabel(/Concordo com o tratamento/).check();
    await page.getByRole("button", { name: /Enviar e receber orçamento/ }).click();

    await expect(page.getByRole("heading", { name: "Recebemos sua mensagem!" })).toBeVisible();
    await expect(page.getByText(/Obrigado, Maria!/)).toBeVisible();
  });
});

test.describe("API /api/contact", () => {
  test("rejeita payload inválido com 422", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "A", email: "x", message: "", consent: false },
      headers: { "x-forwarded-for": "10.0.0.1" },
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.errors).toHaveProperty("email");
  });

  test("honeypot preenchido é aceito silenciosamente", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { website: "http://spam.example", name: "Bot" },
      headers: { "x-forwarded-for": "10.0.0.2" },
    });
    expect(res.status()).toBe(200);
  });
});

test.describe("Navegação", () => {
  test("menu mobile abre, navega e fecha", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Somente mobile");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Abrir menu" });
    await toggle.click();
    await expect(page.getByRole("button", { name: "Fechar menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    const mobileNav = page.getByRole("navigation", { name: "Menu mobile" });
    await mobileNav.getByRole("link", { name: "Cases" }).click();
    await expect(page).toHaveURL(/#cases$/);
    await expect(mobileNav).toBeHidden();
  });

  test("tecla ESC fecha o menu mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Somente mobile");
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Menu mobile" })).toBeHidden();
  });

  test("skip link é o primeiro foco e leva ao conteúdo", async ({ page, isMobile }) => {
    test.skip(isMobile, "Somente desktop (teclado)");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });

  test("página de privacidade e 404", async ({ page }) => {
    await page.goto("/privacidade");
    await expect(
      page.getByRole("heading", { level: 1, name: "Política de Privacidade" }),
    ).toBeVisible();
    await expect(page.getByText("LGPD").first()).toBeVisible();

    const res = await page.goto("/rota-inexistente");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Página não encontrada" })).toBeVisible();
  });

  test("sitemap e robots disponíveis", async ({ request }) => {
    expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap:");
  });
});

test.describe("Acessibilidade (axe-core / WCAG 2.2 AA)", () => {
  for (const path of ["/", "/privacidade"]) {
    test(`sem violações em ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.nodes.length} nós — ${v.nodes[0]?.target}`,
      );
      expect(summary, summary.join("\n")).toEqual([]);
    });
  }

  test("sem overflow horizontal", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
