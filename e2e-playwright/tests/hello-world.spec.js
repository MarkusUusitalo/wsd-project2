const { test, expect } = require("@playwright/test");

test("Main page has expected title and headings.", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Quiz app"); 
    await expect(page.locator("h2")).toHaveText("What is this app???");
    await expect(page.locator("h3")).toHaveText("Login or register");
    await expect(page.locator("h4")).toHaveText("Statistics");
  
    const statisticsText = await page.locator("h5").textContent();
    expect(statisticsText).toMatch(/Topics: \d+, Questions: \d+, Answers: \d+/);
  });

test("Main page navigation links work (topics).", async ({ page }) => {
  await page.goto("/");

  await page.locator("a[href='/topics']").click();
  await expect(page).toHaveURL('/auth/login');
});

test("Main page navigation links work (quiz).", async ({ page }) => {
    await page.goto("/");

    await page.locator("a[href='/quiz']").click();
    await expect(page).toHaveURL('/auth/login');
});

test("Login and Register links are present.", async ({ page }) => {
    await page.goto("/");
  
    await expect(page.locator("a[href='/auth/login']")).toHaveText("Login");
    await expect(page.locator("a[href='/auth/register']")).toHaveText("Register");
});

test("Login page has expected elements and form submission.", async ({ page }) => {
    await page.goto("/auth/login"); 

    await expect(page.locator("input[type=email]")).toBeVisible();
    await expect(page.locator("input[type=password]")).toBeVisible();
    await expect(page.locator("button[type=submit]")).toHaveText("Login");

    await page.locator("input[type=email]").fill("test@example.com"); 
    await page.locator("input[type=password]").fill("password"); 

    await page.locator("button[type=submit]").click();
  });
  
  test("Login page has a link to the main page.", async ({ page }) => {
    await page.goto("/auth/login"); 

    await expect(page.locator("a[href='/']")).toHaveText("Main");
    await page.locator("a[href='/']").click();
    await expect(page).toHaveURL("/");
  });

  test("User can register and then log in with random credentials", async ({ page }) => {
    const randomEmail = `test${Math.random().toString().slice(2)}@example.com`;
    const randomPassword = `password${Math.random().toString().slice(2)}`;

    await page.goto("/auth/register");

    await page.locator("input[name='email']").fill(randomEmail);
    await page.locator("input[name='password']").fill(randomPassword);
    await page.locator("input[type='submit']").click();

    await expect(page).toHaveURL("/auth/login");

    await page.locator("input[name='email']").fill(randomEmail);
    await page.locator("input[name='password']").fill(randomPassword);
    await page.locator("button[type='submit']").click();

    await expect(page).toHaveURL("/topics");
  });

test("Admin can add a topic.", async ({ page }) => {

    await page.goto("/auth/login");
    await page.locator("input[name='email']").fill("admin@admin.com");
    await page.locator("input[name='password']").fill("123456");
    await page.locator("button[type='submit']").click();
    const randomTopic = `test${Math.random().toString().slice(2)}`;
    await expect(page).toHaveURL("/topics");

    await page.locator("input[name='name']").fill(randomTopic);
    await page.locator("form[action='/topics'] input[type='submit']").click();

    
    await expect(page.locator(`li.topic-list-item:has(h3:has-text('${randomTopic}'))`)).toBeVisible();

});

test("Statistics add up.", async ({ page }) => {
    await page.goto("/");
  
    const initialStatisticsText = await page.locator("h5").textContent();
    const initialTopicsMatch = initialStatisticsText.match(/Topics: (\d+)/);
    const initialNumberOfTopics = initialTopicsMatch ? parseInt(initialTopicsMatch[1], 10) : 0;

    await page.goto("/auth/login");
    await page.locator("input[name='email']").fill("admin@admin.com");
    await page.locator("input[name='password']").fill("123456");
    await page.locator("button[type='submit']").click();
    const randomTopic = `test${Math.random().toString().slice(2)}`;
    await expect(page).toHaveURL("/topics");
    await page.locator("input[name='name']").fill(randomTopic);        
    await page.locator("form[action='/topics'] input[type='submit']").click();
    await expect(page.locator(`li.topic-list-item:has(h3:has-text('${randomTopic}'))`)).toBeVisible();

    await page.goto("/");
    const updatedStatisticsText = await page.locator("h5").textContent();
    const updatedTopicsMatch = updatedStatisticsText.match(/Topics: (\d+)/);
    const updatedNumberOfTopics = updatedTopicsMatch ? parseInt(updatedTopicsMatch[1], 10) : 0;

    await expect(updatedNumberOfTopics).toBe(initialNumberOfTopics + 1);
});
  
  

test("Topic is in /quiz.", async ({ page }) => {

    await page.goto("/auth/login");
    await page.locator("input[name='email']").fill("admin@admin.com");
    await page.locator("input[name='password']").fill("123456");
    await page.locator("button[type='submit']").click();
    const randomTopic = `test${Math.random().toString().slice(2)}`;
    await expect(page).toHaveURL("/topics");

    await page.locator("input[name='name']").fill(randomTopic);
    await page.locator("form[action='/topics'] input[type='submit']").click();

    
    await expect(page.locator(`li.topic-list-item:has(h3:has-text('${randomTopic}'))`)).toBeVisible();

    await page.goto("/quiz");

    await expect(page.locator(`h3:has-text('${randomTopic}')`)).toBeVisible();
});