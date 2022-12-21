const {response} = require("express");
const {PrismaClient} = require("@prisma/client");
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../utils/jwt");

const prisma = new PrismaClient();
export const login = async (req: any, res = response) => {

    const {email, password} = req.body;

    if (email && password) {

        try {

            const dataDB = await prisma.tlb_clientes.findFirst({});

            const {id, data} = dataDB;

            const {clientes} = data;

            const client = clientes.find((value: any) => value.email === email);

            const validPassword = bcrypt.compareSync(password, client.password);

            if (!validPassword) {
                return res.status(404).json({
                    message: "Invalid credentials"
                })
            }

            const token = await generateJWT({
                uid: client.id,
                email: client.email,
                nombre: client.nombre,
                apellido: client.apellido,
                issuer: "test_client_server_cel"
            });

            res?.json({
                email: client.email,
                token
            })

        } catch (e) {
            return res?.status(404).json({
                message: "Invalid credentials - Not found"
            })
        }
    } else {
        return res?.status(400).json({
            message: "Email or password not found"
        })
    }


}
