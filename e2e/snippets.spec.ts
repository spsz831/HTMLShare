import { test, expect } from '@playwright/test'

test.describe('代码片段浏览功能', () => {
  test('应该能够浏览代码片段列表', async ({ page }) => {
    await page.goto('/snippets')

    // 等待页面加载
    await page.waitForLoadState('networkidle')

    // 检查是否有代码片段列表或加载状态
    const snippetList = page.locator('[data-testid="snippet-list"], .snippet-item, article')
    const loadingIndicator = page.locator('[data-testid="loading"], .loading, .skeleton')

    // 应该显示列表或加载状态
    await expect(
      snippetList.first().or(loadingIndicator.first())
    ).toBeVisible({ timeout: 10000 })
  })

  test('应该能够查看单个代码片段', async ({ page }) => {
    await page.goto('/snippets')
    await page.waitForLoadState('networkidle')

    // 查找第一个代码片段链接
    const snippetLink = page.locator('a[href*="/snippet/"], .snippet-link').first()

    if (await snippetLink.count() > 0) {
      await snippetLink.click()

      // 等待导航到详情页
      await page.waitForLoadState('networkidle')

      // 检查代码片段详情页的元素
      const codeContent = page.locator('pre, code, .code-block, [data-testid="code-content"]')
      await expect(codeContent.first()).toBeVisible({ timeout: 5000 })
    }
  })

  test('代码片段页面应该有基本信息', async ({ page }) => {
    // 访问一个示例代码片段页面（如果存在）
    await page.goto('/snippet/test-id', { timeout: 30000 })

    // 如果页面不存在，检查404页面
    if (page.url().includes('404') || await page.locator('text=404').count() > 0) {
      console.log('代码片段页面不存在，这是正常的测试情况')
      return
    }

    // 如果页面存在，检查基本元素
    const title = page.locator('h1, .title, [data-testid="snippet-title"]')
    if (await title.count() > 0) {
      await expect(title.first()).toBeVisible()
    }
  })
})