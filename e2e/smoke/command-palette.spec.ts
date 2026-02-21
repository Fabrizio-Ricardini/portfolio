import { expect, type Page, test } from "@playwright/test";

async function openCommandPalette(page: Page) {
  await page.keyboard.press("Control+k");

  const input = page.getByPlaceholder("Type a command...");
  if (!(await input.isVisible().catch(() => false))) {
    await page.keyboard.press("Meta+k");
  }

  await expect(input).toBeVisible();
}

test("navigates to about file from command palette in terminal mode", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("EXPLORER", { exact: true })).toBeVisible();

  await openCommandPalette(page);

  const input = page.getByPlaceholder("Type a command...");
  await input.fill("about");
  await page.keyboard.press("Enter");

  await expect(input).toBeHidden();
  await expect(page.getByText("$ cat about.md")).toBeVisible();
});
