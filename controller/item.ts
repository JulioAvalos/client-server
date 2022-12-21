import {IClientInfo, Item} from "../types";

const {response} = require("express");
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

export const createItemByClientId = async (req: any, res = response) => {

    const {idClient, precio, cantidad, descripcion} = req.body;
    const {data} = await prisma.tlb_clientes.findFirst();

    const client = data.clientes.find((value: IClientInfo) => value.id === idClient);

    client.items.push({
        id: Math.floor(Math.random() * 200) + 1,
        precio,
        cantidad,
        descripcion
    });

    const result = await prisma.tlb_clientes.update({
        where: {id: 1},
        data: {data}
    });

    res.json(result);

}

export const updateItemByClientId = async (req: any, res = response) => {

    const {idItem, idClient, precio, cantidad, descripcion} = req.body;
    const {data} = await prisma.tlb_clientes.findFirst();

    const client = data.clientes.find((value: IClientInfo) => value.id === idClient);

    const item = client.items.find((value: Item) => value.id === idItem);

    if (item) {
        item.precio = precio;
        item.cantidad = cantidad;
        item.descripcion = descripcion;

        const result = await prisma.tlb_clientes.update({
            where: {id: 1},
            data: {data}
        })

        res.json(result);
    } else {
        res.status(404).json({
            "message": "Item was not found"
        })
    }

}

export const deleteItemByClientId = async (req: any, res = response) => {

    const {idClient, idItem} = req.params;
    const {data} = await prisma.tlb_clientes.findFirst();

    const client = data.clientes.find((value: IClientInfo) => value.id === Number(idClient));

    const items = client.items.filter((value: Item) => value.id !== Number(idItem));

    client.items = items;

    const result = await prisma.tlb_clientes.update({
        where: {id: 1},
        data: {data}
    })

    res.json(items);
}


