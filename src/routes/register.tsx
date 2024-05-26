import { Register } from '@/components/pages/Register'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: Register
})

