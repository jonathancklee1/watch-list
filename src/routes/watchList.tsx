import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/watchList')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/watch-list"!</div>
}
