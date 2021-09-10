import { Service } from 'typedi'
import { Request, Response } from 'express'
import { IsString } from 'class-validator'

import { UserService } from '@/services/UserService'
import { validateRequest } from '@/helpers/validate'

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
  ) { }

  public async register (req: Request, res: Response): Promise<void> {
    const body = await validateRequest(CreateUserDTO, req)

    console.log(body)

    res.send({
      data: 'oke'
    })
  }
}
