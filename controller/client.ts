import {IClientInfo} from "../types";

const {response} = require("express");
const bcrypt = require('bcryptjs');
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

export const getClientList = async (req: any, res = response) => {
    const allClients = await prisma.tlb_clientes.findMany();
    return res.json(allClients);
}

export const createClient = async (req: any, res = response) => {

    const {nombre, apellido, email, direccion, edad, password} = req.body;

    const {data} = await prisma.tlb_clientes.findFirst();

    const info = data.clientes;

    const salt = bcrypt.genSaltSync();
    const encryptedPassword = bcrypt.hashSync(password, salt);

    info.push({
        id: Math.floor(Math.random() * 200) + 1,
        nombre,
        apellido,
        email,
        direccion,
        edad,
        items: [],
        password: encryptedPassword
    });

    const result = await prisma.tlb_clientes.update({
        where: {id: 1},
        data: {data}
    });

    res.json(result);

}

export const updateClient = async (req: any, res = response) => {

    const {idClient, nombre, apellido, email, direccion, edad, password} = req.body;

    const {data} = await prisma.tlb_clientes.findFirst();

    const client = data.clientes.find((value: IClientInfo) => value.id === idClient);

    if (client) {
        client.nombre = nombre;
        client.apellido = apellido;
        client.email = email;
        client.direccion = direccion;
        client.edad = edad;
        if (password) {
            const salt = bcrypt.genSaltSync();
            client.password = bcrypt.hashSync(password, salt);
        }

        const result = await prisma.tlb_clientes.update({
            where: {id: 1},
            data: {data}
        })

        res.json(result);
    } else {
        res.status(404).json({
            "message": "Customer was not found"
        })
    }

}

export const deleteClient = async (req: any, res = response) => {

    const {idClient} = req.params;
    const {data} = await prisma.tlb_clientes.findFirst();

    const client = data.clientes.filter((value: IClientInfo) => value.id !== Number(idClient));

    data.clientes = client;

    const result = await prisma.tlb_clientes.update({
        where: {id: 1},
        data: {data}
    })

    res.json(client);
}

