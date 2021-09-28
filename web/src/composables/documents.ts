import { computed, nextTick, Ref, ref, watch } from 'vue'
import { fetchDocuments, fetchDocument, createDocument, updateDocument, deleteDocument } from '../api/documents'

export interface Document {
  _id: string;
  name: string;
  content: string;
}

export interface CreateDocumentInput {
  name?: string
  content?: string
}

export interface UpdateDocumentInput {
  name?: string
  content?: string
}

const documents = ref<Document[]>([])

export function useDocuments () {
  const getUserDocuments = async () => {
    const response = await fetchDocuments()
    documents.value = response.data
  }

  const createUserDocument = async (data: CreateDocumentInput = {}): Promise<Document> => {
    const response = await createDocument(data)
    documents.value.push(response.data)

    return response.data
  }

  const updateUserDocument = async (documentID: string, data: UpdateDocumentInput): Promise<Document> => {
    const response = await updateDocument(documentID, data)
    documents.value.push(response.data)

    return response.data
  }

  const updateUserDocumentLocal = async (documentID: string, data: UpdateDocumentInput): Promise<Document> => {
    const document = documents.value.find(d => d._id === documentID)

    if (!document) {
      throw new Error('Document not found')
    }

    document.content = data.content ?? document.content
    document.name = data.name ?? document.name

    return document
  }

  return {
    documents,
    getUserDocuments,
    createUserDocument,
    updateUserDocument,
    updateUserDocumentLocal
  }
}

export function useDocument (documentID: Ref<string | null> | string | null) {
  const id = ref(documentID)

  const storedDocument = computed(() => documents.value.find(d => d._id === id.value) ?? null)
  const document = ref<Document | null>(storedDocument.value)

  const dirty = ref(false)

  watch(storedDocument, () => {
    console.log('B')
    document.value = storedDocument.value
      ? { ...storedDocument.value }
      : null
  }, {
    deep: true
  })

  watch(document, () => {
    dirty.value = true
  }, {
    deep: true
  })

  const setDocument = (newDocument: Document | null) => {
    document.value = newDocument

    if (document.value) {
      const doc = documents.value.find(d => d._id === id.value)

      if (doc) {
        doc.name = document.value.name
        doc.content = document.value.content
      }
    } else {
      documents.value = documents.value.filter(d => d._id !== id.value)
    }

    nextTick(() => {
      dirty.value = false
    })
  }

  const loadDocument = async () => {
    if (id.value == null) {
      document.value = null
      return
    }

    const response = await fetchDocument(id.value)
    setDocument(response.data)
  }

  const save = async () => {
    if (id.value == null) {
      return
    }

    const response = await updateDocument(id.value, {
      name: document.value?.name,
      content: document.value?.content
    })
    setDocument(response.data)
  }

  const destroy = async () => {
    if (id.value == null) {
      return
    }

    await deleteDocument(id.value)
    setDocument(null)
  }

  loadDocument()
  watch(id, loadDocument)

  return {
    document,
    dirty,
    loadDocument,
    save,
    destroy
  }
}
