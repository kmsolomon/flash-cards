// @ts-check
import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Header link", async ({ page }) => {
    await page.getByRole("link", { name: "Create card set" }).click();
    await expect(page).toHaveURL("/set/create");
    await page.getByRole("link", { name: "Flash cards" }).click();
    await expect(page).toHaveURL("/");
  });

  test("Return to top of page link", async ({ page }) => {
    await expect(page).toHaveURL("/");
    await page.getByRole("link", { name: "Return to top of page" }).click();
    await expect(page).toHaveURL("/#top");
  });
});
