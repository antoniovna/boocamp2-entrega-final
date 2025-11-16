import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8080';

test('Deve carregar a página principal', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Multiverse Codex/);
});

test('Deve exibir cartões de personagens vindos da API', async ({ page }) => {
  await page.goto(BASE_URL);
  
  // Aguarda que pelo menos um card apareça
  const card = page.locator('[data-testid="char-card"]').first();
  await expect(card).toBeVisible({ timeout: 10000 });
});