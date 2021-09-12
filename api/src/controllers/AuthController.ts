import { Service } from 'typedi'
import { Request, Response } from 'express'
import { IsString } from 'class-validator'
import passport from 'passport'

import { UserService } from '@/services/UserService'
import { validateRequest } from '@/helpers/validate'
import { auth } from '@/middleware/auth'

class CreateUserDTO {
  @IsString()
  username: string

  @IsString()
  password: string
}

@Service()
export class AuthController {
  constructor (
    private userService: UserService
  ) {}

  public login = [
    passport.authenticate('local'),
    async (req: Request, res: Response): Promise<void> => {
      res.send({})
    }
  ]

  public register = [
    async (req: Request, res: Response): Promise<void> => {
      const body = await validateRequest(CreateUserDTO, req)

      const user = await this.userService.createUser(body)

      res.send({
        data: user
      })
    }
  ]

  public me = [
    auth(),
    async (req: Request, res: Response): Promise<void> => {
      res.send({
        ok: true
      })
    }
  ]
}
