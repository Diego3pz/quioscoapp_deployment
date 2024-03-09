import Layout from "@/layout/Layout"
import { useEffect, useCallback } from "react"
import useQuiosco from "@/hooks/useQuiosco"
import { formatearDinero } from "@/helpers";

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '';
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])


    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className=" text-4xl font-black">
                Total y Confirmar Pedido
            </h1>
            <p className="text-2xl my-10">
                Confirma tu Pedido a Continuación
            </p>

            <form
                onSubmit={colocarOrden}
                className="text-xl">
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="nombre">
                        Nombre
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: {''}<span className="font-bold">{formatearDinero(total)}</span></p>
                </div>

                <div className="mt-5">
                    <input
                        type="submit"
                        className={`${comprobarPedido() ? "bg-indigo-100" : "bg-indigo-600 hover:bg-indigo-800"} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        value="Confirmar Pedido" disabled={comprobarPedido()} />
                </div>
            </form>
        </Layout>
    )
}