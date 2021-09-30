import { Service } from 'typedi'
import { Request, Response } from 'express'

import { UserService } from '@/services/UserService'

@Service()
export class UserController {
  constructor (
    private userService: UserService
  ) {}

  public getUsers = [
    async (req: Request, res: Response): Promise<void> => {
      const users = await this.userService.getUsers()

      res.send({
        data: users
      })
    }
  ]
}
