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
      const res = await auth.getUser()
      user.value = res.data
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

  const register = async (username: string, password: string, invitationToken?: string) => {
    await auth.register({ username, password, invitationToken })
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
