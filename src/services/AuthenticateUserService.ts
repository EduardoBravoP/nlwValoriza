import { compare } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { sign } from 'jsonwebtoken'

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error("Email/Password incorrect")
    }

    const passwordCorrect = await compare(password, user.password)

    if (!passwordCorrect) {
      throw new Error("Email/Password incorrect")
    }

    const token = sign({
      email: user.email
    }, process.env.PRIVATE_KEY, {
      subject: user.id,
      expiresIn: "1d"
    })

    return token
  }
}

export { AuthenticateUserService }