import { Icon } from '@/server/db/schema'
import { Shield, Home, Car, Heart } from 'lucide-react'

export default function IconFromDb({ icon }: { icon: Icon }) {
  switch (icon) {
    case 'Home':
      return <Home className="h-8 w-8 mb-2 text-primary" />
    case 'Car':
      return <Car className="h-8 w-8 mb-2 text-primary" />
    case 'Heart':
      return <Heart className="h-8 w-8 mb-2 text-primary" />
    case 'Shield':
      return <Shield className="h-8 w-8 mb-2 text-primary" />
  }
}
