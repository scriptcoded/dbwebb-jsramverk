import { Service } from 'typedi'
import { Request, Response } from 'express'
import { IsOptional, IsString } from 'class-validator'
import passport from 'passport'

import { UserService } from '@/services/UserService'
import { validateRequest } from '@/helpers/validate'
import { auth } from '@/middleware/auth'
import { UserModel } from '@/models/User'
import { AuthenticatedRequest } from '@/interfaces'

class CreateUserDTO {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsString()
  @IsOptional()
  invitationToken: string
}

@Service()
export class AuthController {
  constructor (
    private userService: UserService
  ) {}

  public register = [
    async (req: Request, res: Response): Promise<void> => {
      const body = await validateRequest(CreateUserDTO, req)

      const user = await this.userService.createUser(body)

      res.send({
        data: user
      })
    }
  ]

  public login = [
    passport.authenticate('local'),
    async (origReq: Request, res: Response): Promise<void> => {
      const req = origReq as AuthenticatedRequest
      const user = await UserModel.findById(req.user._id)

      res.send({
        data: user
      })
    }
  ]

  public logout = [
    async (req: Request, res: Response): Promise<void> => {
      req.logout()
      res.send({})
    }
  ]

  public me = [
    auth(),
    async (origReq: Request, res: Response): Promise<void> => {
      const req = origReq as AuthenticatedRequest
      const user = await UserModel.findById(req.user._id)

      res.send({
        data: user
      })
    }
  ]
}
