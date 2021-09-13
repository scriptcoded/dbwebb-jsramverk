import { ref } from 'vue'
import { fetchDocuments } from '../api/documents'

export interface Document {
  _id: string;
  name: string;
  content: string;
}

export function useDocuments () {
  let documents = ref<Document[]>([])

  const getUserDocuments = async () => {
    const response = await fetchDocuments()
    documents = response.data
  }

  return {
    documents,
    getUserDocuments
  }
}
