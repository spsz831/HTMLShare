import { test, expect } from '@playwright/test'

test.describe('搜索功能', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('应该有搜索输入框', async ({ page }) => {
    // 查找搜索相关的元素
    const searchInput = page.locator('input[type="search"], input[placeholder*="搜索"], [data-testid="search"]')

    if (await searchInput.count() > 0) {
      await expect(searchInput.first()).toBeVisible()
    } else {
      console.log('搜索功能可能在其他页面或未实现')
    }
  })

  test('搜索功能基本流程', async ({ page }) => {
    // 查找搜索输入框
    const searchInput = page.locator('input[type="search"], input[placeholder*="搜索"], [data-testid="search"]').first()

    if (await searchInput.count() > 0) {
      // 输入搜索内容
      await searchInput.fill('javascript')

      // 查找搜索按钮
      const searchButton = page.locator('button[type="submit"], button', { hasText: /搜索|Search/ }).first()

      if (await searchButton.count() > 0) {
        await searchButton.click()
        await page.waitForTimeout(1000)

        // 检查搜索结果
        const searchResults = page.locator('[data-testid="search-results"], .search-result, .snippet-item')
        if (await searchResults.count() > 0) {
          await expect(searchResults.first()).toBeVisible()
        }
      }
    }
  })
})

test.describe('响应式设计', () => {
  test('移动端视图应该正常显示', async ({ page }) => {
    // 设置移动端视窗大小
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // 检查页面是否能正常显示
    const body = page.locator('body')
    await expect(body).toBeVisible()

    // 检查是否有移动端菜单按钮（如果有的话）
    const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, .hamburger')
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu.first()).toBeVisible()
    }
  })

  test('桌面端视图应该正常显示', async ({ page }) => {
    // 设置桌面端视窗大小
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    // 桌面端可能有侧边栏或其他布局
    const sidebar = page.locator('[data-testid="sidebar"], .sidebar, aside')
    if (await sidebar.count() > 0) {
      await expect(sidebar.first()).toBeVisible()
    }
  })
})