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

import { register } from '@/actions'
import { useToast } from '@/hooks/use-toast'
import { redirect } from 'next/navigation'

export default function RegisterPage() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')
    const res = await register({ name, email, password, confirmPassword })
    if (res?.error) {
      if (res.message) setError(res.message)
      if ('name' in res) setNameError(res.name?.toString() ?? '')
      if ('email' in res) setEmailError(res.email?.toString() ?? '')
      if ('password' in res) setPasswordError(res.password?.toString() ?? '')
      if ('confirmPassword' in res) setConfirmPasswordError(res.confirmPassword?.toString() ?? '')
    } else {
      toast({
        title: 'Регистрация выполнена',
        description: 'Вы успешно зарегистрировались',
      })
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
          <CardTitle className="text-2xl font-bold text-center">Регистрация</CardTitle>
          <CardDescription className="text-center">
            Создайте аккаунт для доступа к личному кабинету
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Пупкин Василий"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                {nameError && <p className="text-sm text-red-500">{nameError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPasswordError && (
                  <p className="text-sm text-red-500">{confirmPasswordError}</p>
                )}
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button className="w-full mt-4" type="submit">
              Зарегистрироваться
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
              Войти
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
