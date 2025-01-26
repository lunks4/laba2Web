'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { login } from '@/actions'
import { useToast } from '@/hooks/use-toast'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailError('')
    setPasswordError('')

    const res = await login({ email, password })

    if (res?.error) {
      if (res.message) setError(res.message)
      if ('email' in res) setEmailError(res.email?.toString() ?? '')
      if ('password' in res) setPasswordError(res.password?.toString() ?? '')
    } else {
      toast({ title: 'Вход выполнен', description: 'Вы успешно вошли в систему' })
      redirect('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <Link href="/" className="ml-2 text-2xl font-bold text-primary">
              Гелиос
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Вход в личный кабинет</CardTitle>
          <CardDescription className="text-center">
            Введите ваш email и пароль для входа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="mail@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button className="w-full mt-4" type="submit">
              Войти
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-blue-500 hover:underline">
              Зарегистрироваться
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
