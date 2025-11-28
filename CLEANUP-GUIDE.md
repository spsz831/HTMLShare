# 🧹 外部服务清理指南

## 第1步：GitHub 仓库删除

### 方法1：通过 GitHub CLI（推荐）
```bash
# 安装 GitHub CLI（如果还没安装）
# Windows: winget install GitHub.cli
# 或访问 https://cli.github.com/

# 登录GitHub（如果还没登录）
gh auth login

# 删除仓库（请替换为您的用户名）
gh repo delete YOUR_USERNAME/HTMLShare --yes
```

### 方法2：通过 GitHub 网页界面
1. 访问：https://github.com/YOUR_USERNAME/HTMLShare
2. 点击 "Settings" 选项卡
3. 滚动到页面底部，找到 "Danger Zone"
4. 点击 "Delete this repository"
5. 输入仓库名称确认删除

---

## 第2步：Vercel 部署清理

### 通过 Vercel CLI
```bash
# 安装 Vercel CLI（如果还没安装）
npm i -g vercel

# 登录Vercel
vercel login

# 列出所有项目
vercel list

# 删除HTMLShare项目
vercel remove htmlshare --yes
```

### 通过 Vercel Dashboard
1. 访问：https://vercel.com/dashboard
2. 找到 HTMLShare 项目
3. 点击项目��入详情页
4. 点击 "Settings" 选项卡
5. 滚动到 "Delete Project" 区域
6. 点击 "Delete" 按钮并确认

---

## 第3步：Supabase 项目清理

### 通过 Supabase Dashboard（推荐）
1. 访问：https://supabase.com/dashboard/projects
2. 找到您的 HTMLShare 项目
3. 点击项目进入详情页
4. 点击左侧菜单的 "Settings"
5. 点击 "General" 标签
6. 滚动到页面底部，找到 "Delete project"
7. 点击 "Delete project" 按钮
8. 输入项目名称确认删除

### 通过 Supabase CLI
```bash
# 如果有 Supabase CLI
supabase projects list
supabase projects delete YOUR_PROJECT_REF
```

---

## 第4步：清理本地Git历史（可选）

如果您想完全重新开始Git历史：

```bash
# 删除现有Git历��
rm -rf .git

# 初始化新的Git仓库
git init
git branch -M main

# 添加所有文件
git add .
git commit -m "🚀 Initial commit: HTMLShare v2.0 (Astro + D1)"
```

---

## 验证清理完成

执行以下命令确认清理成功：

```bash
# 检查是否还有Vercel配置
ls -la | grep vercel

# 检查是否还有Supabase配置
ls -la | grep supabase

# 检查新项目结构
tree . -I node_modules
```

---

## 🎯 清理检查清单

- [ ] GitHub 仓库已删除
- [ ] Vercel 项目已删除
- [ ] Supabase 项目已删除
- [ ] 本地旧架构文件已清理
- [ ] 新的 Astro 项目结构就位
- [ ] Git 历史已重置（可选）

完成所有步骤后，您将拥有一个完全干净的新架构项目！🎉