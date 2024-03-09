import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"
import { formatearDinero } from "@/helpers"
import { useState } from "react"

const ModalProducto = () => {

    const { producto, handleChangeModal, handleAgregarPedido } = useQuiosco()
    const [primeraSalsa, setPrimeraSalsa] = useState("Naturales");
    const [segundaSalsa, setSegundaSalsa] = useState("Naturales");

    const resumenId = Date.now()


    const handleSelectChange = (e) => {
        setPrimeraSalsa(String(e.target.value));
    };

    const handleSelectChange2 = (e) => {
        setSegundaSalsa(String(e.target.value));
    };

    return (
        <>
            {producto.categoriaId === 1

                ?
                <div className="md:flex gap-10">
                    <div className="md:w-1/3">
                        <Image
                            width={300}
                            height={300}
                            alt={`Imagen producto ${producto.nombre}`}
                            src={`/assets/img/${producto.imagen}.jpg`}
                        />
                    </div>

                    <div className="md:w-2/3">
                        <div className="flex justify-end">
                            <button onClick={handleChangeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </div>
                        <h1 className="text-3xl font-bold mt-5">
                            {producto.nombre}
                        </h1>
                        <div className="mt-2 gap-4">
                            <div className=" flex items-center py-2">
                                <p className=" text-xl mr-6">Primera Salsa</p>
                                <select name="salsa1" id="salsa1" className="border-2 border-zinc-400 rounded-md p-2"
                                    onChange={handleSelectChange} value={primeraSalsa}>
                                    <option value="Naturales">Naturales</option>
                                    <option value="BBQ">Salsa BBQ</option>
                                    <option value="Mango">Salsa Mango</option>
                                    <option value="Bufalo">Salsa Bufalo</option>
                                    <option value="Queso">Aderezo de Queso</option>
                                </select>
                            </div>
                            <div className=" flex items-center py-2">
                                <p className="text-xl mr-4">Segunda Salsa</p>
                                <select name="salsa2" id="salsa1" className="border-2 border-zinc-400 rounded-md p-2"
                                    onChange={handleSelectChange2} value={segundaSalsa}>
                                    <option value="Naturales">Naturales</option>
                                    <option value="BBQ">Salsa BBQ</option>
                                    <option value="Mango">Salsa Mango</option>
                                    <option value="Bufalo">Salsa Bufalo</option>
                                    <option value="Queso">Aderezo de Queso</option>
                                </select>
                            </div>

                        </div>
                        <p className="mt-5 font-black text-5xl text-amber-500">
                            {formatearDinero(producto.precio)}
                        </p>

                        <div className="">
                            <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold rounded"
                                onClick={() => handleAgregarPedido({ ...producto, primeraSalsa, segundaSalsa, resumenId })}
                            >
                                Añadir al Pedido
                            </button>
                        </div>

                    </div>
                </div>

                :

                <div className="md:flex gap-10">
                    <div className="md:w-1/3">
                        <Image
                            width={300}
                            height={300}
                            alt={`Imagen producto ${producto.nombre}`}
                            src={`/assets/img/${producto.imagen}.jpg`}
                        />
                    </div>

                    <div className="md:w-2/3">
                        <div className="flex justify-end">
                            <button onClick={handleChangeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </div>
                        <h1 className="text-3xl font-bold mt-5">{producto.nombre}

                        </h1>
                        <p className="mt-5 font-black text-5xl text-amber-500">
                            {formatearDinero(producto.precio)}
                        </p>

                        <div className="">
                            <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold rounded"
                                onClick={() => handleAgregarPedido({ ...producto, primeraSalsa, segundaSalsa, resumenId })}
                            >
                                Añadir al Pedido
                            </button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default ModalProducto