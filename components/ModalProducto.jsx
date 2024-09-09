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
                    <div className="md:w-1/3 flex place-content-center">
                        <Image
                            width={300}
                            height={300}
                            alt={`Imagen producto ${producto.nombre}`}
                            src={`/assets/img/${producto.imagen}.jpg`}
                            className="w-[150px] md:w-auto max-w-[250px]"
                        />
                    </div>

                    <div className="md:w-2/3">
                        
                        <h1 className="text-lg md:text-3xl font-bold mt-3 md:mt-5">
                            {producto.nombre}
                        </h1>
                        <div className="mt-2 gap-4">
                            <div className="flex items-center py-1 md:py-2">
                                <p className="text-sm md:text-xl mr-4 md:mr-6">Primera Salsa</p>
                                <select name="salsa1" id="salsa1" className="border-2 border-zinc-400 rounded-md p-1 md:p-2"
                                    onChange={handleSelectChange} value={primeraSalsa}>
                                    <option value="Naturales">Naturales</option>
                                    <option value="BBQ">Salsa BBQ</option>
                                    <option value="Mango">Salsa Mango</option>
                                    <option value="Bufalo">Salsa Bufalo</option>
                                    <option value="Queso">Aderezo de Queso</option>
                                </select>
                            </div>
                            <div className="flex items-center py-1 md:py-2">
                                <p className="text-sm md:text-xl mr-4">Segunda Salsa</p>
                                <select name="salsa2" id="salsa1" className="border-2 border-zinc-400 rounded-md p-1 md:p-2"
                                    onChange={handleSelectChange2} value={segundaSalsa}>
                                    <option value="Naturales">Naturales</option>
                                    <option value="BBQ">Salsa BBQ</option>
                                    <option value="Mango">Salsa Mango</option>
                                    <option value="Bufalo">Salsa Bufalo</option>
                                    <option value="Queso">Aderezo de Queso</option>
                                </select>
                            </div>
                        </div>
                        <p className="mt-2 md:mt-5 font-black text-2xl md:text-5xl text-amber-500">
                            {formatearDinero(producto.precio)}
                        </p>

                        <div className="flex h-8 md:h-10 mt-3 md:mt-5 gap-2 md:gap-4">
                            <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-3 md:px-5 py-1 md:py-2 text-xs md:text-base text-white font-bold rounded"
                                onClick={() => handleAgregarPedido({ ...producto, primeraSalsa, segundaSalsa, resumenId })}
                            >
                                Añadir al Pedido
                            </button>
                            <button type="button" className="bg-red-600 hover:bg-red-800 px-3 md:px-5 py-1 md:py-2 text-xs md:text-base text-white font-bold rounded"
                                onClick={handleChangeModal}
                            >
                                Cancelar Pedido
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
                        
                        <h1 className="text-lg md:text-3xl font-bold mt-3 md:mt-5">
                            {producto.nombre}
                        </h1>
                        <p className="mt-2 md:mt-5 font-black text-2xl md:text-5xl text-amber-500">
                            {formatearDinero(producto.precio)}
                        </p>

                        <div className="flex h-8 md:h-10 mt-3 md:mt-5 gap-2 md:gap-4">
                            <button type="button" className="bg-indigo-600 hover:bg-indigo-800 px-3 md:px-5 py-1 md:py-2 text-xs md:text-base text-white font-bold rounded"
                                onClick={() => handleAgregarPedido({ ...producto, primeraSalsa, segundaSalsa, resumenId })}
                            >
                                Añadir al Pedido
                            </button>

                            <button type="button" className="bg-red-600 hover:bg-red-800 px-3 md:px-5 py-1 md:py-2 text-xs md:text-base text-white font-bold rounded"
                                onClick={handleChangeModal}
                            >
                                Cancelar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalProducto