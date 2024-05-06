// @ts-check
import { expect, test } from "@playwright/test";

test.describe("ActionMenu", () => {
  test("Keyboard interactions", async ({ page }) => {
    await test.step("Add a new card set", async () => {
      await page.goto("/");
      await page.getByRole("link", { name: "Create card set" }).click();
      await expect(page).toHaveURL("/set/create");
      await page.getByRole("textbox", { name: /title/i }).fill("Cool new set");
      await page.getByRole("button", { name: "Create set" }).click();
      await expect(page).toHaveURL(/\/set\/.*/);
      await expect(
        page.getByRole("heading", { name: "Cool new set" })
      ).toBeVisible();
    });

    await test.step("It should be opened if the user presses space when the button is focused", async () => {
      await page.getByRole("button", { name: "Set options" }).press(" ");
      await expect(page.getByRole("menu")).toBeVisible();
      await page.getByRole("heading", { level: 1 }).click();
      await expect(page.getByRole("menu")).not.toBeVisible();
    });

    await test.step("It should be opened if the user presses enter when the button is focused", async () => {
      await page.getByRole("button", { name: "Set options" }).press("Enter");
      await expect(page.getByRole("menu")).toBeVisible();
      await page.getByRole("heading", { level: 1 }).click();
      await expect(page.getByRole("menu")).not.toBeVisible();
    });

    await test.step("It should be closed if the user presses escape if the menu is open", async () => {
      await page.getByRole("button", { name: "Set options" }).press("Enter");
      await expect(page.getByRole("menu")).toBeVisible();
      await page.getByRole("button", { name: "Set options" }).press("Escape");
      await expect(page.getByRole("menu")).not.toBeVisible();
      await expect(
        page.getByRole("button", { name: "Set options" })
      ).toBeFocused();
    });

    await test.step("It should be opened and focus the first item if the user presses the down arrow key when the button is focused", async () => {
      await page
        .getByRole("button", { name: "Set options" })
        .press("ArrowDown");
      await expect(page.getByRole("menu")).toBeVisible();
      await expect(page.getByRole("menuitem", { name: "Edit" })).toBeFocused();
      await page.getByRole("button", { name: "Set options" }).press("Escape");
      await expect(page.getByRole("menu")).not.toBeVisible();
      await expect(
        page.getByRole("button", { name: "Set options" })
      ).toBeFocused();
    });

    await test.step("It should be opened and focus the last item if the user presses the up arrow key when the button is focused", async () => {
      await page.getByRole("button", { name: "Set options" }).press("ArrowUp");
      await expect(page.getByRole("menu")).toBeVisible();
      await expect(
        page.getByRole("menuitem", { name: "Delete" })
      ).toBeFocused();
      await page.getByRole("button", { name: "Set options" }).press("Escape");
      await expect(page.getByRole("menu")).not.toBeVisible();
      await expect(
        page.getByRole("button", { name: "Set options" })
      ).toBeFocused();
    });

    await test.step("It should be closed if the user presses tab if the menu is open", async () => {
      await page.getByRole("button", { name: "Set options" }).press("ArrowUp");
      await expect(page.getByRole("menu")).toBeVisible();
      await page.getByRole("button", { name: "Set options" }).press("Tab");
      await expect(page.getByRole("menu")).not.toBeVisible();
    });

    await test.step("It should move focus to the first item if the user presses the down arrow key when the last item is focused", async () => {
      await page.getByRole("button", { name: "Set options" }).press("ArrowUp");
      await expect(page.getByRole("menu")).toBeVisible();
      await expect(
        page.getByRole("menuitem", { name: "Delete" })
      ).toBeFocused();
      await page.getByRole("menuitem", { name: "Delete" }).press("ArrowDown");
      await expect(page.getByRole("menuitem", { name: "Edit" })).toBeFocused();
      await page.getByRole("button", { name: "Set options" }).press("Escape");
      await expect(page.getByRole("menu")).not.toBeVisible();
    });

    await test.step("It should move focus to the last item if the user presses the up arrow key when the first item is focused", async () => {
      await page
        .getByRole("button", { name: "Set options" })
        .press("ArrowDown");
      await expect(page.getByRole("menu")).toBeVisible();
      await expect(page.getByRole("menuitem", { name: "Edit" })).toBeFocused();
      await page.getByRole("menuitem", { name: "Edit" }).press("ArrowUp");
      await expect(
        page.getByRole("menuitem", { name: "Delete" })
      ).toBeFocused();
      await page.getByRole("button", { name: "Set options" }).press("Escape");
      await expect(page.getByRole("menu")).not.toBeVisible();
    });

    await test.step("It should move focus to the first item if the user presses the Home key", async () => {
      await page.getByRole("button", { name: "Set options" }).press("ArrowUp");
      await expect(page.getByRole("menu")).toBeVisible();
      await expect(
        page.getByRole("menuitem", { name: "Delete" })
      ).toBeFocused();
      await page.getByRole("menuitem", { name: "Delete" }).press("Home");
      await expect(page.getByRole("menuitem", { name: "Edit" })).toBeFocused();
      await page.getByRole("button", { name: "Set options" }).press("Escape");
      await expect(page.getByRole("menu")).not.toBeVisible();
    });

    await test.step("It should move focus to the last item if the user presses the End key", async () => {
      await page
        .getByRole("button", { name: "Set options" })
        .press("ArrowDown");
      await expect(page.getByRole("menu")).toBeVisible();
      await expect(page.getByRole("menuitem", { name: "Edit" })).toBeFocused();
      await page.getByRole("menuitem", { name: "Edit" }).press("End");
      await expect(
        page.getByRole("menuitem", { name: "Delete" })
      ).toBeFocused();
      await page.getByRole("button", { name: "Set options" }).press("Escape");
      await expect(page.getByRole("menu")).not.toBeVisible();
    });

    await test.step("Delete the card set", async () => {
      await page.getByRole("button", { name: "Set options" }).click();
      await page.getByRole("menuitem", { name: "Delete" }).click();
      await page.getByRole("button", { name: "Delete" }).click();
    });
  });
});
