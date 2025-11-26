'use client'

import React, { useState } from 'react'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import { AuthProvider } from '@/components/auth/AuthProvider'

// 禁用静态生成
export const dynamic = 'force-dynamic'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {isLogin ? (
            <LoginForm
              onSwitchToRegister={() => setIsLogin(false)}
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    </AuthProvider>
  )
}