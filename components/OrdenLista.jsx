import Image from "next/image"
import { formatearDinero } from "@/helpers";
import axios from "axios";
import { toast } from 'react-toastify'
import useQuiosco from "@/hooks/useQuiosco";
import { useEffect, useCallback, useState } from "react"

const OrdenLista = ({ orden }) => {

    const [inputValues, setInputValues] = useState({});
    const { id, nombre, total, pedido, fecha } = orden
    const { clienteCambio, setClienteCambio, colocarOrdenHistorial, clientePago, setClientePago } = useQuiosco();

    const handleChange = (e, platilloId) => {
        const { value } = e.target;
        const restante = e.target.value;

        setClientePago(restante);

        setInputValues((prevState) => ({
            ...prevState,
            [platilloId]: parseFloat(value) || 0,
        }));

        // Calcular el total pagado utilizando la versión actualizada de inputValues
        const totalPagado = Object.values({ ...inputValues, [platilloId]: parseFloat(value) || 0 }).reduce(
            (acc, curr) => acc + curr,
            0
        );
        setClientePago(totalPagado);

        // Calcular el cambio localmente para la orden actual
        const cambioCalculado = totalPagado - total;
        setClienteCambio(cambioCalculado.toFixed(2));
    };

    const pagarOrden = async () => {
        try {
            const { data } = await axios.post(`/api/ordenlista/${id}`, { clienteCambio, clientePago })
            toast.success('Orden Pagada')
            console.log(data);
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

    console.log(clientePago);
    console.log(clienteCambio);

    // const calcularPago = (e) => {
    //     const monto = parseFloat(e.target.value);
    //     if (!isNaN(monto)) {
    //         setMontoPagado(monto);
    //         // Calcular el cambio
    //         const cambioCalculado = monto - total;
    //         setCambio(cambioCalculado.toFixed(2));// Redondear a dos decimales
    //     } else {
    //         setMontoPagado('');
    //     }
    // };

    const comprobarPedido = useCallback(() => {
        return clientePago < total || clientePago === '' || clienteCambio === '';
    }, [clientePago])

    useEffect(() => {
        comprobarPedido()
    }, [clientePago, comprobarPedido])


    return (
        <div className=" border p-10 space-y-5">
            <h3 className=" text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre} </p>
            <div>
                {pedido.map(platillo => (
                    <>
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

                    </>
                ))}
            </div>

            {/*MOSTRAR TOTAL, CAMBIO Y BOTON PARA PAGAR*/}
            <div className="md:flex md:items-center md:justify-between my-10">

                <p className="mt-5 font-black text-4xl text-amber-500">
                    <span className=" text-amber-800">Total a pagar:{' '}</span>{formatearDinero(total)}
                </p>

                <form onSubmit={colocarOrdenHistorial} className="mr-5 mt-5">
                    <label className="mt-5 font-black text-4xl">
                        <span className=" text-zinc-800"> Pago:{' '}</span>
                    </label>
                    <input
                        type="text"
                        className=" text-2xl shadow appearance-none border rounded w-full py-2 px-3 mt-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name={fecha}
                        value={inputValues[id] || ''}
                        onChange={(e) => handleChange(e, id)}
                    />
                    <p className="font-black text-2xl mt-3 ">
                        Cambio:{' '}
                        {clientePago >= total && (
                            <span className="text-blue-600">${clienteCambio}</span>
                        )}
                    </p>

                </form>

                <div className="mt-5">
                    <input
                        type="submit"
                        className={`${comprobarPedido() ? "bg-indigo-100" : "bg-indigo-600 hover:bg-indigo-800"} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        value="Pagar Orden" disabled={comprobarPedido()} onClick={pagarOrden} />
                </div>
            </div>

        </div>
    )
}

export default OrdenLista