import { expect, test } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const routes = ['/', '/sobre', '/solucoes', '/dev', '/saude', '/store', '/portfolio', '/contato', '/privacidade', '/dev/produtos/hotspot-pix', '/dev/produtos/questionarios', '/dev/produtos/clinicas', '/login', '/admin'];
for (const width of [320, 390, 768, 1440, 1920]) {
  test(`rotas, assets e ausência de overflow — ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    for (const route of routes) {
      await page.goto(`./#${route}`);
      await expect(page.locator('h1')).toHaveCount(1);
      await page.evaluate(async () => { await document.fonts.ready; });
      for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator('img').evaluateAll(images => images.every(i => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth > 0))).toBeTruthy();
      const overflow = await page.evaluate(() => ({ width: innerWidth, actual: document.documentElement.scrollWidth, elements: [...document.querySelectorAll('main *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).map(el => ({ tag: el.tagName, class: el.className, width: Math.round(el.getBoundingClientRect().width), right: Math.round(el.getBoundingClientRect().right) })).slice(0, 12) }));
      expect(overflow.actual <= overflow.width + 1, route + ' ' + JSON.stringify(overflow)).toBeTruthy();
      expect(await page.title()).toContain('LB Conexão');
      await page.reload();
      await expect(page.locator('h1')).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

test('menu móvel: navegação, estado e Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('./');
  const toggle = page.getByRole('button', { name: 'Abrir menu' });
  await toggle.click(); await expect(page.locator('#main-nav')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(page.locator('#main-nav')).toBeHidden();
  await expect(toggle).toBeFocused(); await toggle.click();
  await page.locator('#main-nav').getByRole('link', { name: 'Saúde', exact: true }).click();
  await expect(page).toHaveURL(/#\/saude$/); await expect(page.locator('#main-nav')).toBeHidden();
});

test('formulário valida, prepara, codifica e não envia automaticamente', async ({ page }) => {
  const external: string[] = []; page.on('request', r => { if (!r.url().startsWith('http://127.0.0.1')) external.push(r.url()); });
  await page.goto('./#/contato?area=dev&solucao=Hotspot%20PIX');
  await page.getByRole('button', { name: 'Preparar mensagem' }).click();
  await expect(page.getByRole('link', { name: 'Continuar no WhatsApp' })).toHaveCount(0);
  await page.getByLabel('Como podemos chamar você?').fill('Revisão & teste');
  await page.getByLabel('O que você precisa?').fill('Preciso de informações sobre o projeto e os recursos planejados.');
  await page.getByLabel('Funcionalidades que você imagina').fill('Painel e sessões');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Preparar mensagem' }).click();
  const link = page.getByRole('link', { name: 'Continuar no WhatsApp' });
  await expect(link).toBeVisible(); const href = await link.getAttribute('href');
  expect(href).toMatch(/^https:\/\/wa.me\/5595981204347\?text=/);
  expect(new URL(href!).searchParams.get('text')).toContain('Revisão & teste');
  expect(new URL(href!).searchParams.get('text')).toContain('Hotspot PIX');
  expect(external).toEqual([]);
  await page.getByLabel('O que você precisa?').fill('Uma necessidade diferente para revisar.');
  await expect(link).toHaveCount(0);
});

test('Store tem filtros funcionais e não inventa ofertas', async ({ page }) => {
  await page.goto('./#/store'); await expect(page.getByRole('status')).toHaveText('0 ofertas disponíveis');
  await page.getByRole('button', { name: 'Tecnologia', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Tecnologia', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('searchbox').fill('notebook');
  await expect(page.getByRole('status')).toContainText('notebook');
  await page.getByRole('button', { name: 'Limpar filtros' }).click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Todas', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.offer-card')).toHaveCount(0);
});

test('movimento reduzido evita download e autoplay; vídeo disponível manualmente', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); const videos: string[] = [];
  page.on('request', r => { if (r.url().endsWith('.mp4')) videos.push(r.url()); });
  await page.goto('./'); await expect(page.locator('video')).not.toHaveAttribute('src', /.+/);
  expect(videos).toEqual([]);
  await page.getByRole('button', { name: 'Reproduzir vídeo institucional' }).click();
  await expect(page.getByRole('button', { name: 'Pausar vídeo institucional' })).toBeVisible();
  await page.getByRole('button', { name: 'Pausar vídeo institucional' }).click();
  expect(await page.locator('video').evaluate(v => (v as HTMLVideoElement).paused)).toBeTruthy();
});

test('projetos planejados subordinados ao DEV e FAQ acessível', async ({ page }) => {
  await page.goto('./'); await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.locator('#main-nav')).not.toContainText('Hotspot');
  await page.locator('summary').filter({ hasText: 'O Hotspot PIX já está disponível?' }).click();
  await expect(page.locator('details[open]')).toContainText('em desenvolvimento');
  await page.goto('./#/dev/produtos/hotspot-pix');
  await expect(page.locator('.feature-list')).toContainText('Planejado');
  await expect(page.locator('.back-link')).toHaveAttribute('href', '#/dev');
});

test('404, link para pular conteúdo e links externos seguros', async ({ page }) => {
  await page.goto('./#/inexistente'); await expect(page.locator('h1')).toContainText('nova conexão');
  await page.goto('./'); await page.locator('.skip-link').focus(); await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const unsafe = await page.locator('a[target="_blank"]').evaluateAll(links => links.filter(a => !a.getAttribute('rel')?.includes('noopener')).length);
  expect(unsafe).toBe(0);
});

test('capturas V3 desktop, tablet e celular', async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 768, 1024], ['mobile', 390, 844]] as const) {
    await page.setViewportSize({ width, height });
    for (const route of ['', 'dev', 'saude', 'store', 'sobre', 'solucoes', 'portfolio', 'contato']) {
      await page.goto(`./#/${route}`);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
      await expect.poll(() => page.locator('img').evaluateAll(images => images.every(i => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth > 0))).toBeTruthy();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `docs/v3/after/${route || 'home'}-${name}-viewport.png` });
      await page.screenshot({ path: `docs/v3/after/${route || 'home'}-${name}.png`, fullPage: true });
    }
  }
});

test('cenas e textos permanecem visíveis sem IntersectionObserver', async ({ page }) => {
  await page.addInitScript(() => { delete (window as any).IntersectionObserver; });
  await page.goto('./');
  await expect(page.locator('.division-scene')).toHaveCount(3);
  for (const title of await page.locator('.division-scene h2').all()) {
    await title.scrollIntoViewIfNeeded();
    await expect(title).toBeVisible();
    expect(await title.evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  }
});

test('revelações e parallax preservam a rolagem nativa', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  const title = page.locator('#scene-title-dev');
  await title.scrollIntoViewIfNeeded();
  await expect(title).toHaveClass(/scene-revealed/);
  await expect(title).toHaveCSS('opacity', '1');
  await page.mouse.wheel(0, 250);
  const drift = await page.locator('.scene-dev [data-parallax]').evaluate(el => parseFloat((el as HTMLElement).style.getPropertyValue('--scene-drift')) || 0);
  expect(Math.abs(drift)).toBeLessThanOrEqual(18);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(title).toHaveCSS('animation-name', 'none');
});

test('diagnóstico local de carregamento e estabilidade', async ({ page }) => {
  test.setTimeout(60000);
  const measurements = [];
  for (const [name, width, height, throttled] of [['desktop-local', 1440, 900, false], ['mobile-rede-simulada', 390, 844, true]] as const) {
    await page.setViewportSize({ width, height });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: throttled ? 150 : 0, downloadThroughput: throttled ? 200000 : -1, uploadThroughput: throttled ? 93750 : -1 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttled ? 4 : 1 });
    await page.addInitScript(() => {
      (window as any).__visualMetrics = { lcpMs: 0, cls: 0 };
      new PerformanceObserver(list => { for (const entry of list.getEntries()) (window as any).__visualMetrics.lcpMs = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => { for (const entry of list.getEntries() as any) if (!entry.hadRecentInput) (window as any).__visualMetrics.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto('./');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.cinematic-home h1')).toHaveCSS('opacity', '1');
    await expect.poll(() => page.locator('.cinematic-home img').evaluate(i => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth > 0)).toBeTruthy();
    measurements.push({ name, viewport: `${width}x${height}`, ...await page.evaluate(() => (window as any).__visualMetrics) });
    await cdp.detach();
  }
  writeFileSync('docs/v3/medicoes-locais.json', JSON.stringify({ note: 'Uma navegação por cenário no Chromium local, cache desabilitado. Mobile: 1,6 Mbps, latência 150 ms, CPU 4x. Não equivale a Core Web Vitals de campo. INP não medido.', measurements }, null, 2));
});
