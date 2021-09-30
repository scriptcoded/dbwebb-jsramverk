import { ref } from 'vue'
import { fetchUsers } from '../api/users'

export interface User {
  _id: string;
  username: string;
}

const users = ref<User[]>([])

export function useUsers () {
  const getUsers = async () => {
    const response = await fetchUsers()
    users.value = response.data
  }

  return {
    users,
    getUsers
  }
}
