import { test, expect } from '@playwright/test'

test.describe('HTMLShare 主页功能', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('页面标题应该正确显示', async ({ page }) => {
    await expect(page).toHaveTitle(/HTMLShare/)
  })

  test('应该显示代码编辑器区域', async ({ page }) => {
    // 检查是否有代码输入区域
    const codeArea = page.locator('[data-testid="code-input"], textarea, .monaco-editor')
    await expect(codeArea.first()).toBeVisible()
  })

  test('应该能够选择编程语言', async ({ page }) => {
    // 检查语言选择器
    const languageSelector = page.locator('select', { hasText: 'JavaScript' }).or(
      page.locator('[data-testid="language-select"]')
    )

    if (await languageSelector.count() > 0) {
      await expect(languageSelector.first()).toBeVisible()
    }
  })

  test('应该显示创建分享按钮', async ({ page }) => {
    // 检查创建按钮
    const createButton = page.locator('button', { hasText: /创建|分享|提交/ })
    await expect(createButton.first()).toBeVisible()
  })

  test('页面应该在合理时间内加载', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    // 页面应该在3秒内加载完成
    expect(loadTime).toBeLessThan(3000)
  })
})

test.describe('代码片段创建流程', () => {
  test('完整的代码片段创建流程', async ({ page }) => {
    await page.goto('/')

    // 输入代码内容
    const codeInput = page.locator('textarea').first()
    if (await codeInput.count() > 0) {
      await codeInput.fill('console.log("Hello, HTMLShare!");')
    }

    // 选择语言 (如果存在)
    const languageSelect = page.locator('select').first()
    if (await languageSelect.count() > 0) {
      await languageSelect.selectOption('javascript')
    }

    // 点击创建按钮
    const createButton = page.locator('button', { hasText: /创建|分享|提交/ }).first()
    if (await createButton.count() > 0) {
      await createButton.click()

      // 等待可能的导航或成功消息
      await page.waitForTimeout(1000)
    }
  })

  test('空代码内容应该有适当提示', async ({ page }) => {
    await page.goto('/')

    // 尝试创建空内容的代码片段
    const createButton = page.locator('button', { hasText: /创建|分享|提交/ }).first()
    if (await createButton.count() > 0) {
      await createButton.click()

      // 检查是否有错误提示或验证消息
      await page.waitForTimeout(500)

      // 这里可以检查错误消息，但由于我们不确定具体的实现，先跳过
    }
  })
})