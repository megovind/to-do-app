import { createFileRoute } from '@tanstack/react-router'
import Tasks from '../pages/Taskss'

export const Route = createFileRoute('/tasks')({
  component: Tasks,
})