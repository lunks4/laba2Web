'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Service } from '@/server/db/schema'
import { toast } from '@/hooks/use-toast'
import { useState } from 'react'
import { createFeedback } from '@/actions'

export default function FeedbackForm({
  user,
  services,
}: {
  user: {
    name: string
    email: string
  }
  services: Service[]
}) {
  const [serviceId, setServiceId] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [serviceIdError, setServiceIdError] = useState('')
  const [subjectError, setSubjectError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessageError('')
    setServiceIdError('')
    setSubjectError('')
    setErrorMessage('')
    const res = await createFeedback({
      serviceId: serviceId as unknown as number,
      subject,
      message,
    })
    if (res.error) {
      if ('errorMessage' in res) setErrorMessage(res.errorMessage?.toString() ?? '')
      if ('serviceId' in res) setServiceIdError(res.serviceId?.toString() ?? '')
      if ('subject' in res) setSubjectError(res.subject?.toString() ?? '')
      if ('message' in res) setMessageError(res.message?.toString() ?? '')
    } else {
      toast({
        title: 'Форма отправлена',
        description: 'Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время.',
      })

      setServiceId('')
      setSubject('')
      setMessage('')
    }
  }

  return (
    <div className="">
      <Card className="w-full max-w-2xl mx-auto mt-3 mb-3">
        <CardHeader>
          <CardTitle>Обратная связь</CardTitle>
          <CardDescription>
            Оставьте ваше сообщение, и мы свяжемся с вами в ближайшее время.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Иван Петров" value={user.name} disabled required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@mail.ru"
                  value={user.email}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurance-type">Тип страхования</Label>
              <Select value={serviceId} onValueChange={setServiceId} required>
                <SelectTrigger id="insurance-type">
                  <SelectValue placeholder="Выберите тип страхования" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {serviceIdError && <p className="text-sm text-red-500">{serviceIdError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Тема обращения</Label>
              <Input
                id="subject"
                placeholder="Тема вашего обращения"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
              />
              {subjectError && <p className="text-sm text-red-500">{subjectError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Сообщение</Label>
              <Textarea
                id="message"
                placeholder="Введите ваше сообщение здесь"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
              {messageError && <p className="text-sm text-red-500">{messageError}</p>}
            </div>
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
            <Button type="submit" className="w-full">
              Отправить
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
