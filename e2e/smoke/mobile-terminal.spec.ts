import { expect, test } from "@playwright/test";

test("terminal stays available on mobile after mode toggles", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const terminalMarker = page.getByText("user@portfolio:", { exact: true });
  const toggleButton = page.getByRole("button", { name: "Toggle View Mode" });

  await expect(terminalMarker).toBeVisible();

  await toggleButton.click();
  await expect(page.getByRole("heading", { name: /Hola, soy/i })).toBeVisible();

  await toggleButton.click();
  await expect(terminalMarker).toBeVisible();
});
