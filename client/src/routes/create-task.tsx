import { createFileRoute } from '@tanstack/react-router'
import CreateTaskPage from '../pages/CreateTaskPage'

export const Route = createFileRoute('/create-task')({
  component: CreateTaskPage
})