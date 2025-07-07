"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"

interface LoginModalProps {
  onClose: () => void
  onLogin: (email: string) => void
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    onLogin(email)
  }

  const handleNaverLogin = () => {
    // Simulate NAVER login
    onLogin("naver_user@naver.com")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <button onClick={onClose} className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="text-2xl text-center">로그인</CardTitle>
          <p className="text-sm text-gray-600 text-center">공공주택 신청을 위해 로그인해 주세요</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "이메일로 로그인"}
            </Button>
          </form>

          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">또는</span>
            </div>
          </div>

          {/* NAVER Login Button */}
          <Button onClick={handleNaverLogin} className="w-full bg-green-500 hover:bg-green-600 text-white">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
            </svg>
            NAVER로 로그인
          </Button>

          <div className="text-center space-y-2">
            <div className="text-sm text-gray-600">
              <a href="#" className="hover:underline">
                비밀번호를 잊으셨나요?
              </a>
            </div>
            <div className="text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                회원가입
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
