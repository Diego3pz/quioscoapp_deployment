import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    //Obtener ordenes
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: true,
            pagado: true,
        }
    })
    res.status(200).json(ordenes);
    //Crear ordenes
    if (req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha,
                clientecambio: req.body.clientecambio,
                clientePago: req.body.clientePago,
            },
        })
        res.status(200).json(orden);
    }
}