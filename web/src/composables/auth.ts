import { ref } from 'vue'

import * as auth from '../api/auth'

interface User {
  _id: string
  username: string
}

const user = ref<User | null>(null)

export const useAuth = () => {
  const getUser = async () => {
    user.value = await auth.getUser()
  }

  const login = async (username : string, password:string) => {
    await auth.login({ username, password })
    await getUser()
  }

  const register = async (username : string, password:string) => {
    await auth.register({ username, password })
    await getUser()
  }

  return {
    getUser,
    login,
    register,
    user
  }
}
