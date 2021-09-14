import { ref } from 'vue'

import * as auth from '../api/auth'

interface User {
  _id: string
  username: string
}

const user = ref<User | null>(null)

export const useAuth = () => {
  const getUser = async () => {
    try {
      user.value = await auth.getUser()
    } catch (e) {
      if ((e as any).status !== 401) {
        throw e
      }
    }
  }

  const login = async (username : string, password:string) => {
    await auth.login({ username, password })
    await getUser()
  }

  const register = async (username: string, password: string) => {
    await auth.register({ username, password })
    await getUser()
  }

  const logout = async () => {
    await auth.logout()
    user.value = null
  }

  return {
    getUser,
    login,
    register,
    logout,
    user
  }
}
