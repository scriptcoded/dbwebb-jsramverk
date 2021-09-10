import { model, Schema } from 'mongoose'

export interface Document {
  name: string;
  content: string;
}

export const documentSchema = new Schema<Document>({
  name: { type: String, required: true },
  content: { type: String, required: true }
})

export const DocumentModel = model<Document>('Document', documentSchema)
