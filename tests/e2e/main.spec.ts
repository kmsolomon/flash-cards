// @ts-check
import { expect, test } from "@playwright/test";

const FLASH_CARD_DATA = [
  { question: "How many days are in a week?", answer: "7" },
  { question: "How many hours in a day?", answer: "24" },
  { question: "How many seconds in an hour?", answer: "3600" },
];

test("Should allow you to create a new card set without filling in the description field", async ({
  page,
}) => {
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

  await test.step("Delete the card set", async () => {
    await page.getByRole("button", { name: "Set options" }).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
  });
});
test("Should allow you to create a new card set with a description filled in", async ({
  page,
}) => {
  await test.step("Add a new card set", async () => {
    await page.goto("/");
    await page.getByRole("link", { name: "Create card set" }).click();
    await expect(page).toHaveURL("/set/create");
    await page.getByRole("textbox", { name: /title/i }).fill("So descriptive");
    await page
      .getByRole("textbox", { name: /description/i })
      .fill("Here is a description about this set of cards");
    await page.getByRole("button", { name: "Create set" }).click();
    await expect(page).toHaveURL(/\/set\/.*/);
    await expect(
      page.getByRole("heading", { name: "So descriptive" })
    ).toBeVisible();
    await expect(
      page.getByText("Here is a description about this set of cards")
    ).toBeVisible();
  });

  await test.step("Delete the card set", async () => {
    await page.getByRole("button", { name: "Set options" }).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
  });
});

test("Should be able to edit and delete a card set you create", async ({
  page,
}) => {
  await test.step("Add a new card set", async () => {
    await page.goto("/");
    await page.getByRole("link", { name: "Create card set" }).click();
    await expect(page).toHaveURL("/set/create");
    await page.getByRole("textbox", { name: /title/i }).fill("Card set");
    await page.getByRole("button", { name: "Create set" }).click();
    await expect(page).toHaveURL(/\/set\/.*/);
    await expect(page.getByRole("heading", { name: "Card set" })).toBeVisible();
  });

  await test.step("Cancel edit doesn't save the changes", async () => {
    await page.getByRole("button", { name: "Set options" }).click();
    await page.getByRole("menuitem", { name: "Edit" }).click();
    await page.getByRole("textbox", { name: /title/i }).fill("Edited Title");
    await page
      .getByRole("textbox", { name: /description/i })
      .fill("Edited Description");
    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByRole("heading", { name: "Card set" })).toBeVisible();
    await expect(page.getByText("Edited Description")).not.toBeVisible();
  });

  await test.step("Edit card set", async () => {
    await page.getByRole("button", { name: "Set options" }).click();
    await page.getByRole("menuitem", { name: "Edit" }).click();
    await page.getByRole("textbox", { name: /title/i }).fill("Edited Title");
    await page
      .getByRole("textbox", { name: /description/i })
      .fill("Edited Description");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(
      page.getByRole("heading", { name: "Edited Title" })
    ).toBeVisible();
    await expect(page.getByText("Edited Description")).toBeVisible();
  });

  await test.step("Delete the card set", async () => {
    await page.getByRole("button", { name: "Set options" }).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
  });
});

test("Should be able to add flash cards to a card set", async ({ page }) => {
  await test.step("Add a new card set", async () => {
    await page.goto("/");
    await page.getByRole("link", { name: "Create card set" }).click();
    await expect(page).toHaveURL("/set/create");
    await page.getByRole("textbox", { name: /title/i }).fill("Add cards");
    await page.getByRole("button", { name: "Create set" }).click();
    await expect(page).toHaveURL(/\/set\/.*/);
    await expect(
      page.getByRole("heading", { name: "Add cards" })
    ).toBeVisible();
  });

  for (const item of FLASH_CARD_DATA) {
    await test.step(`Create flash card: ${item}`, async () => {
      await page.getByRole("link", { name: "Add flash card" }).click();
      await page
        .getByRole("textbox", { name: /question/i })
        .fill(item.question);
      await page.getByRole("textbox", { name: /answer/i }).fill(item.answer);
      await page.getByRole("button", { name: "Add card" }).click();
      await expect(
        page.getByRole("heading", { name: "Add cards" })
      ).toBeVisible();
      await expect(page.getByText(item.question)).toBeVisible();
    });
  }

  await test.step("Delete the card set", async () => {
    await page.getByRole("button", { name: "Set options" }).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
  });
});

test("Should be able to edit and delete flash cards", async ({ page }) => {
  await test.step("Add a new card set", async () => {
    await page.goto("/");
    await page.getByRole("link", { name: "Create card set" }).click();
    await expect(page).toHaveURL("/set/create");
    await page.getByRole("textbox", { name: /title/i }).fill("Edit cards");
    await page.getByRole("button", { name: "Create set" }).click();
    await expect(page).toHaveURL(/\/set\/.*/);
    await expect(
      page.getByRole("heading", { name: "Edit cards" })
    ).toBeVisible();
  });

  for (const item of FLASH_CARD_DATA) {
    await test.step(`Create flash card: ${item}`, async () => {
      await page.getByRole("link", { name: "Add flash card" }).click();
      await page
        .getByRole("textbox", { name: /question/i })
        .fill(item.question);
      await page.getByRole("textbox", { name: /answer/i }).fill(item.answer);
      await page.getByRole("button", { name: "Add card" }).click();
    });
  }

  await test.step("Edit a flash card", async () => {
    await page.getByRole("button", { name: "Edit card 1" }).click();
    await expect(
      page.getByRole("heading", { name: "Edit flash card" })
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Question" })).toHaveText(
      FLASH_CARD_DATA[0].question
    );
    await expect(page.getByRole("textbox", { name: "Answer" })).toHaveText(
      FLASH_CARD_DATA[0].answer
    );
    await page.getByRole("textbox", { name: /question/i }).fill("Hello?");
    await page.getByRole("textbox", { name: /answer/i }).fill("World!");
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(
      page.getByRole("heading", { name: "Edit cards" })
    ).toBeVisible();
    await expect(page.getByText(FLASH_CARD_DATA[0].question)).not.toBeVisible();
    await expect(page.getByText("Hello?")).toBeVisible();
  });

  await test.step("Delete a flash card", async () => {
    await page.getByRole("button", { name: "Delete card 1" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByText(FLASH_CARD_DATA[1].question)).not.toBeVisible();
  });

  await test.step("Delete the card set", async () => {
    await page.getByRole("button", { name: "Set options" }).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
  });
});

test("Should be able to navigate through a set of flash cards", async ({
  page,
}) => {
  await test.step("Add a new card set", async () => {
    await page.goto("/");
    await page.getByRole("link", { name: "Create card set" }).click();
    await expect(page).toHaveURL("/set/create");
    await page.getByRole("textbox", { name: /title/i }).fill("Edit cards");
    await page.getByRole("button", { name: "Create set" }).click();
    await expect(page).toHaveURL(/\/set\/.*/);
    await expect(
      page.getByRole("heading", { name: "Edit cards" })
    ).toBeVisible();
  });

  for (const item of FLASH_CARD_DATA) {
    await test.step(`Create flash card: ${item}`, async () => {
      await page.getByRole("link", { name: "Add flash card" }).click();
      await page
        .getByRole("textbox", { name: /question/i })
        .fill(item.question);
      await page.getByRole("textbox", { name: /answer/i }).fill(item.answer);
      await page.getByRole("button", { name: "Add card" }).click();
    });
  }

  await test.step("Review flash cards", async () => {
    await page.getByRole("link", { name: "Start reviewing" }).click();
    await test.step("First card", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "Question 1 of 3" })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Previous question" })
      ).toBeDisabled();
      await expect(
        page.getByRole("button", { name: "Next question" })
      ).toBeEnabled();
      await expect(page.getByText(FLASH_CARD_DATA[0].question)).toBeVisible();
      await page.getByRole("button", { name: "Show answer" }).click();
      await expect(page.getByText(FLASH_CARD_DATA[0].answer)).toBeVisible();
      await page.getByRole("button", { name: "Show question" }).click();
      await expect(page.getByText(FLASH_CARD_DATA[0].question)).toBeVisible();
    });
    await test.step("Second card", async () => {
      await page.getByRole("button", { name: "Next question" }).click();
      await expect(
        page.getByRole("heading", { level: 2, name: "Question 2 of 3" })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Previous question" })
      ).toBeEnabled();
      await expect(
        page.getByRole("button", { name: "Next question" })
      ).toBeEnabled();
      await expect(page.getByText(FLASH_CARD_DATA[1].question)).toBeVisible();
      await page.getByRole("button", { name: "Show answer" }).click();
      await expect(page.getByText(FLASH_CARD_DATA[1].answer)).toBeVisible();
      await page.getByRole("button", { name: "Show question" }).click();
      await expect(page.getByText(FLASH_CARD_DATA[1].question)).toBeVisible();
    });
    await test.step("Third card", async () => {
      await page.getByRole("button", { name: "Next question" }).click();
      await expect(
        page.getByRole("heading", { level: 2, name: "Question 3 of 3" })
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Previous question" })
      ).toBeEnabled();
      await expect(
        page.getByRole("button", { name: "Next question" })
      ).toBeDisabled();
      await expect(page.getByText(FLASH_CARD_DATA[2].question)).toBeVisible();
      await page.getByRole("button", { name: "Show answer" }).click();
      await expect(page.getByText(FLASH_CARD_DATA[2].answer)).toBeVisible();
      await page.getByRole("button", { name: "Show question" }).click();
      await expect(page.getByText(FLASH_CARD_DATA[2].question)).toBeVisible();
    });
    await test.step("Previous question button works", async () => {
      await page.getByRole("button", { name: "Previous question" }).click();
      await expect(
        page.getByRole("heading", { level: 2, name: "Question 2 of 3" })
      ).toBeVisible();
      await page.getByRole("button", { name: "Previous question" }).click();
      await expect(
        page.getByRole("heading", { level: 2, name: "Question 1 of 3" })
      ).toBeVisible();
    });

    await page.getByRole("link", { name: "Return to set overview" }).click();
    await expect(
      page.getByRole("button", { name: "Set options" })
    ).toBeVisible();
  });

  await test.step("Delete the card set", async () => {
    await page.getByRole("button", { name: "Set options" }).click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
  });
});
