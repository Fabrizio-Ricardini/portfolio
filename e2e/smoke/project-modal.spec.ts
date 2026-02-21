import { expect, test } from "@playwright/test";

test("opens and closes project modal with keyboard and restores focus", async ({
  page,
}) => {
  await page.goto("/");

  const toggleButton = page.getByRole("button", { name: "Toggle View Mode" });
  await toggleButton.click();
  await expect(page.getByRole("heading", { name: /Hola, soy/i })).toBeVisible();

  const projectCard = page
    .getByRole("button", { name: /Open details for/i })
    .first();

  await expect(projectCard).toBeVisible();
  await projectCard.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(projectCard).toBeFocused();
});
