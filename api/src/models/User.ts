import { model, Schema } from 'mongoose'

import { Document, documentSchema } from './Document'

export interface User {
  _id: string;
  username: string;
  documents: Document[];
  password: string;
}

export const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  documents: [documentSchema]
}, {
  toJSON: {
    transform (doc, ret) {
      delete ret.password
      delete ret.__v
    }
  }
})

export const UserModel = model<User>('User', userSchema)
