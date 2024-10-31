"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Shield } from "lucide-react"

export default function FeedbackForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [insuranceType, setInsuranceType] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const { showToast, toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    console.log({ name, email, insuranceType, subject, message })
    showToast({
        title: "Форма отправлена",
        description: "Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время.",
    })
    // Сброс формы
    setName("")
    setEmail("")
    setInsuranceType("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="px-4 lg:px-6 h-16 flex items-center bg-white">
        <Link className="flex items-center justify-center" href="/">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">Гелиос</span>
        </Link>
        <Link className="flex items-center justify-center ml-5" href="/login">
          <span className="text-base font-medium hover:underline underline-offset-4">Войти</span>
        </Link>
        <Link className="flex items-center justify-center ml-5" href="/register">
          <span className="text-base font-medium hover:underline underline-offset-4">Зарегистрироваться</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/catalog">
            Услуги
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            О нас
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Контакты
          </Link>
        </nav>
      </header>
    <div className="">
    <Card className="w-full max-w-2xl mx-auto mt-3 mb-3">
      <CardHeader>
        <CardTitle>Обратная связь</CardTitle>
        <CardDescription>Оставьте ваше сообщение, и мы свяжемся с вами в ближайшее время.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" placeholder="Иван Петров" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="ivan@mail.ru" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance-type">Тип страхования</Label>
            <Select value={insuranceType} onValueChange={setInsuranceType} required>
              <SelectTrigger id="insurance-type">
                <SelectValue placeholder="Выберите тип страхования" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Авто</SelectItem>
                <SelectItem value="property">Страхование имущества</SelectItem>
                <SelectItem value="health">Здоровье</SelectItem>
                <SelectItem value="other">Комплексные</SelectItem>
                <SelectItem value="travel">Путешествия</SelectItem>
                <SelectItem value="osago">ОСАГО</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Тема обращения</Label>
            <Input id="subject" placeholder="Тема вашего обращения" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Сообщение</Label>
            <Textarea id="message" placeholder="Введите ваше сообщение здесь" value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">Отправить</Button>
      </CardFooter>
    </Card>
    </div>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
        <p className="text-xs text-muted-foreground">© 2024 Гелиос Страхование. Все права защищены.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/feedback">
            Обратная связь
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Политика конфиденциальности
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Условия использования
          </Link>
        </nav>
      </footer>
    </div>
  )
}