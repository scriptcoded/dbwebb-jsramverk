import { model, Schema } from 'mongoose'

import { User } from './User'

export interface Document {
  _id: string;
  name: string;
  content: string;
  collaborators: User[];
}

export const documentSchema = new Schema<Document>({
  name: { type: String, required: true },
  content: { type: String, required: true },
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

export const DocumentModel = model<Document>('Document', documentSchema)
