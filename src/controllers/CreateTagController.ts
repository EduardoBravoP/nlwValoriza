import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {
  async handle(request: Request, response: Response) {
    const { name } = request.body
    
    const createTag = new CreateTagService()

    const tag = await createTag.execute(name)

    return response.json(tag)
  }
}

export { CreateTagController }