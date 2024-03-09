import Image from "next/image"
import { formatearDinero, formatearFecha } from "@/helpers";


const Historial = ({ orden }) => {
    console.log(orden);
    const { id, nombre, total, pedido, clientepago, clientecambio, fecha } = orden

    return (
        <div className=" border p-10 space-y-5">
            <h3 className=" text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: <span className="text-blue-700">{nombre}</span>  </p>
            <div>
                {pedido.map(platillo => (
                    <div key={platillo.id} className=" py-3 flex border-b last-of-type:border-0 items-center">
                        <div className=" w-32">
                            <Image src={`/assets/img/${platillo.imagen}.jpg`} alt={`Imagen ${platillo.imagen}`}
                                width={400}
                                height={500}
                            />
                        </div>
                        <div className=" p-5 space-y-2">
                            <h4 className="text-xl font-bold text-amber-500">{platillo.nombre}</h4>
                            {platillo.categoriaId === 1
                                ? <>
                                    <div className=" mt-2">
                                        <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{platillo.primeraSalsa}

                                        </span><span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{platillo.segundaSalsa}
                                        </span>
                                    </div>

                                </>
                                : ''}
                            <p className="mt-5 font-black text-xl text-amber-500">
                                <span className=" text-amber-800">sub total: {' '}</span>{formatearDinero(platillo.precio)}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
            <div className="md:flex md:items-center md:justify-between my-10">

                <p className="flex flex-col mt-5 font-black text-4xl ">
                    <div className="text-amber-500">
                        <span className=" text-amber-800">Costo total:{' '}</span>{formatearDinero(total)}
                    </div>

                    <div className=" mt-3 text-green-600">
                        <span className=" text-zinc-800">Pago recibido:{' '}</span>{formatearDinero(clientepago)}
                    </div>

                    <div className=" mt-3 text-red-600">
                        <span className=" text-zinc-800">Cambio:{' '}</span>{formatearDinero(clientecambio)}
                    </div>

                </p>
            </div>

            <p className="text-lg font-black text-zinc-400">{fecha}</p>

        </div>
    )
}

export default Historial