import { Checkout } from '@/components/pages/Checkout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout')({
  component: Checkout
})