import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    //Obtener ordenes
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: true,
            pagado: false,
        }
    })
    res.status(200).json(ordenes);
}