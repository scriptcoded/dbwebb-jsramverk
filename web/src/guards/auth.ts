import { NavigationGuard } from 'vue-router'
import { useAuth } from '../composables/auth'

export const authGuard: NavigationGuard = (to, from) => {
  const { user } = useAuth()

  if (!user.value) {
    return '/login'
  }

  return true
}

export const noAuthGuard: NavigationGuard = (to, from) => {
  const { user } = useAuth()

  if (user.value) {
    return '/'
  }

  return true
}
