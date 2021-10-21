import { computed, nextTick, Ref, ref, watch } from 'vue'
import { fetchDocuments, fetchDocument, createDocument, updateDocument, deleteDocument, inviteEmail } from '../api/documents'
import { User } from './users'

export interface Document {
  _id: string;
  name: string;
  content: string;
  collaborators: User[];
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
    const docs = await fetchDocuments()
    documents.value = docs
  }

  const createUserDocument = async (data: CreateDocumentInput = {}): Promise<Document> => {
    const doc = await createDocument(data)
    documents.value.push(doc)

    return doc
  }

  const updateUserDocument = async (documentID: string, data: UpdateDocumentInput): Promise<Document> => {
    const doc = await updateDocument(documentID, data)
    documents.value.push(doc)

    return doc
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

    const doc = await fetchDocument(id.value)
    setDocument(doc)
  }

  const save = async () => {
    if (id.value == null) {
      return
    }

    const doc = await updateDocument(id.value, {
      name: document.value?.name,
      content: document.value?.content
    })
    setDocument(doc)
  }

  const destroy = async () => {
    if (id.value == null) {
      return
    }

    await deleteDocument(id.value)
    setDocument(null)
  }

  const addDocumentCollaborator = async (userID: string): Promise<void> => {
    if (id.value == null || !document.value) {
      return
    }

    const doc = await updateDocument(id.value, {
      collaboratorIDs: [
        ...document.value.collaborators.map(c => c._id),
        userID
      ]
    })
    setDocument(doc)

    return doc
  }

  const removeDocumentCollaborator = async (userID: string): Promise<void> => {
    if (id.value == null || !document.value) {
      return
    }

    const doc = await updateDocument(id.value, {
      collaboratorIDs: document.value.collaborators
        .filter(c => c._id !== userID)
        .map(c => c._id)
    })
    setDocument(doc)

    return doc
  }

  const inviteUser = async (email: string) => {
    if (id.value == null) {
      return
    }

    await inviteEmail(id.value, email)
  }

  loadDocument()
  watch(id, loadDocument)

  return {
    document,
    dirty,
    loadDocument,
    save,
    destroy,
    addDocumentCollaborator,
    removeDocumentCollaborator,
    inviteUser
  }
}
