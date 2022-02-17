import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";

let items: Items = {
    1: {
        id: 1,
        name: "Dosa",
        price: 30,
        description: "Tasty dosa",
        image:"https://static.toiimg.com/thumb/63841432.cms?width=1200&height=900"
    },
    2: {
        id: 2,
        name: "Pizza",
        description: "funny pizza",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
        price: 200
    },
    3: {
        id: 3,
        name: "Tea",
        price: 10,
        description: "Hot Tea",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
    }
}

export const findAll = async (): Promise<Item[]> => Object.values(items)

export const find = async (id: number): Promise<Item> => items[id]

export const create = async (newItem: BaseItem): Promise<Item> => {
    const id = new Date().valueOf();
    items[id] = {id, ...newItem}

    return items[id]
}

export const update = async (
    id: number,
    itemUpdate: BaseItem,
) : Promise<Item | null> => {
    const item = await find(id)

    if (!item) {
        return null
    }

    items[id] = {id, ...itemUpdate}

    return items[id]
}

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    delete items[id]
}
