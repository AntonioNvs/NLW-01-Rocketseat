import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*')
  // SELECT * FROM items

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.titulo,
      image_url: `http://192.168.1.71:3333/uploads/${item.image}`
    }
  })

  return res.json(serializedItems)
  }
}

export default new ItemsController()