import express, { Request, Response, ErrorRequestHandler } from 'express'
import * as ItemService from './items.service'
import { BaseItem, Item } from './item.interface'
import e from 'express';


export const itemsRouter = express.Router();

itemsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll()
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error)
    }
})

itemsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        const item: Item = await ItemService.find(id)

        if (item) {
            return res.status(200).send(item)
        }

        res.status(404).send("item not found")
    } catch (error)  {
        res.status(500).send(error)
    }
})

itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseItem = req.body
        const newItem = await ItemService.create(item)
        res.status(201).json(newItem)
    } catch (error) {
        res.status(500).send(e)
    }
})

itemsRouter.put("/:id", async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const itemUpdate: Item = req.body
        const existingItem: Item = await ItemService.find(id)

        if (existingItem) {
            const updatedItem = await ItemService.update(id, itemUpdate)
            return res.status(200).json(updatedItem)
        }

        const newItem = await ItemService.create(itemUpdate)
        res.status(201).json(newItem)
    } catch (error) {
        res.status(500).send(error)
    }
})


itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id)
        await ItemService.remove(id)

        res.sendStatus(204)
    } catch (error) {
        res.status(500).send(e)
    }
})
