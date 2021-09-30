import Container, { Token } from 'typedi'
import { Server } from 'socket.io'

import { DocumentService } from '@/services/DocumentService'
import { sessionMiddleware } from '@/middleware/session'

import { HTTP_TOKEN } from './express'
import { CONFIG_TOKEN } from './config'

const wrap = (middleware: any) => (socket: any, next: any) => middleware(socket.request, {}, next)

export const SOCKET_TOKEN = new Token<Server>('SOCKET')

interface UpdateDocData {
  _id: string;
  content?: string;
  name?: string;
}

export async function setupSocket (): Promise<void> {
  const config = Container.get(CONFIG_TOKEN)
  const httpServer = Container.get(HTTP_TOKEN)

  const documentService = Container.get(DocumentService)

  const io = new Server(httpServer, {
    serveClient: false,
    cors: {
      // Bad practice, but OK for development
      origin: (origin, callback) => callback(null, origin),
      credentials: true
    },
    cookie: {
      sameSite: config.isProduction ? 'none' : undefined,
      secure: config.isProduction
    }
  })

  Container.set(SOCKET_TOKEN, io)

  io.use(wrap(sessionMiddleware))
  // io.use(wrap(passport.initialize()))
  // io.use(wrap(passport.session()))

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('joinDoc', (room) => {
      socket.join(room)
    })

    socket.on('updateDoc', (doc: UpdateDocData) => {
      socket.broadcast.emit('updatedDoc', doc)

      const userID = (socket.request as any).session?.passport?.user

      if (!userID) {
        return
      }

      documentService.updateDocument({
        documentID: doc._id,
        userID,
        content: doc.content,
        name: doc.name
      })
    })
  })
}
