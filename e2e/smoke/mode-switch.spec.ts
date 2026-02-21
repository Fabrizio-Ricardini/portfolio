import { expect, test } from "@playwright/test";

test("switches between terminal and modern modes", async ({ page }) => {
  await page.goto("/");

  const toggleButton = page.getByRole("button", { name: "Toggle View Mode" });

  await expect(page.getByText("EXPLORER", { exact: true })).toBeVisible();

  await toggleButton.click();
  await expect(page.getByRole("heading", { name: /Hola, soy/i })).toBeVisible();

  await toggleButton.click();
  await expect(page.getByText("EXPLORER", { exact: true })).toBeVisible();
});
