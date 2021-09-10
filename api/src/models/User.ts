import { Document, model, Schema } from 'mongoose'

import { documentSchema } from './Document'

export interface User {
  username: string;
  documents: Document[];
  password?: string;
}

export const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  documents: [documentSchema]
})

export const UserModel = model<User>('User', userSchema)
