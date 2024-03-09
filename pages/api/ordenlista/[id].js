
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {

    const prisma = new PrismaClient();
    console.log(req.body);
    if (req.method === "POST") {
        const { id } = req.query

        const ordenActualizada = await prisma.orden.update({
            where: {
                id: parseInt(id)
            },
            data: {
                pagado: true,
                clientepago: parseFloat(req.body.clientePago),
                clientecambio: parseFloat(req.body.clienteCambio),
            }
        })
        res.status(200).json(ordenActualizada)
    }
}