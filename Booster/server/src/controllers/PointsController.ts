import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query

    const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()))
  
    const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()  // Retornando somente items distintos
        .select('points.*')

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.1.71:3333/uploads/${point.image}`
      }
    })

    return res.json(serializedPoints)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({ error: 'This point is not exist' })
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.titulo')

    const serializedPoints = {
      ...point,
      image_url: `http://192.168.1.71:3333/uploads/${point.image}`
    }

    return res.json({ point: serializedPoints, items })
  }

  async create(req: Request, res: Response) {
    const { 
      name,
      email,
      whatsapp,
      longitude,
      latitude,
      city,
      uf,
      items
     } = req.body;

    const trx = await knex.transaction();
    
    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      longitude,
      latitude,
      city,
      uf,
     }

    const insertIds = await trx('points').insert(point);
  
     const point_id = insertIds[0];
  
     const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
      return {
        item_id,
        point_id,
      }
     })
  
     await trx('point_items').insert(pointItems)
     
     // Esperando as transações terminarem
     await trx.commit()

     return res.json({
      id: point_id, 
      ...point, 
    })
  }
}

export default new PointsController()