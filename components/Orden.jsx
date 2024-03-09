import Image from "next/image"
import { formatearDinero } from "@/helpers";
import axios from "axios";
import { toast } from 'react-toastify'


const Orden = ({ orden }) => {
    const { id, nombre, total, pedido } = orden

    const completarOrden = async () => {
        try {
            const { data } = await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden Lista')
            console.log(data);
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

    return (
        <div className=" border p-10 space-y-5">
            <h3 className=" text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre} </p>
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
                <p className="mt-5 font-black text-4xl text-amber-500">
                    <span className=" text-amber-800">Total a pagar:{' '}</span>{formatearDinero(total)}
                </p>

                <button className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-1 px-10 uppercase font-bold rounded-lg"
                    type="button"
                    onClick={completarOrden}
                >
                    Completar Orden
                </button>
            </div>

        </div>
    )
}

export default Orden