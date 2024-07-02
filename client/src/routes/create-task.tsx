import { createFileRoute } from '@tanstack/react-router'
import CreateTaskPage from '../pages/CreateTask'

export const Route = createFileRoute('/create-task')({
  component: CreateTaskPage
})