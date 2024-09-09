import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import { formatearDinero } from "@/helpers";
import { useState } from "react";

const ModalActualizar = () => {
    const { producto, handleChangeModalActualizar, handleActualizarPedido, handleEliminarActualizado } = useQuiosco();
    const [primeraSalsa, setPrimeraSalsa] = useState(producto.primeraSalsa);
    const [segundaSalsa, setSegundaSalsa] = useState(producto.segundaSalsa);

    const resumenId = producto.resumenId;

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
            
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-1/3">
                        <Image
                            width={300}
                            height={300}
                            alt={`Imagen producto ${producto.nombre}`}
                            src={`/assets/img/${producto.imagen}.jpg`}
                            className="w-[150px] md:w-auto max-w-[250px]"
                        />
                    </div>

                    <div className="w-full md:w-2/3">
                       
                        <h1 className="text-xl md:text-3xl font-bold mt-5">{producto.nombre}</h1>

                        <div className="mt-2 gap-4">
                            <div className="flex flex-col md:flex-row items-start md:items-center py-2">
                                <p className="text-lg md:text-xl mr-6 mb-2 md:mb-0">Primera Salsa</p>
                                <select
                                    name="salsa1"
                                    id="salsa1"
                                    className="border-2 border-zinc-400 rounded-md p-2 w-full md:w-auto"
                                    onChange={handleSelectChange}
                                    value={primeraSalsa}
                                >
                                    <option value="Naturales">Naturales</option>
                                    <option value="BBQ">Salsa BBQ</option>
                                    <option value="Mango">Salsa Mango</option>
                                    <option value="Bufalo">Salsa Bufalo</option>
                                    <option value="Queso">Aderezo de Queso</option>
                                </select>
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center py-2">
                                <p className="text-lg md:text-xl mr-4 mb-2 md:mb-0">Segunda Salsa</p>
                                <select
                                    name="salsa2"
                                    id="salsa2"
                                    className="border-2 border-zinc-400 rounded-md p-2 w-full md:w-auto"
                                    onChange={handleSelectChange2}
                                    value={segundaSalsa}
                                >
                                    <option value="Naturales">Naturales</option>
                                    <option value="BBQ">Salsa BBQ</option>
                                    <option value="Mango">Salsa Mango</option>
                                    <option value="Bufalo">Salsa Bufalo</option>
                                    <option value="Queso">Aderezo de Queso</option>
                                </select>
                            </div>
                        </div>

                        <p className="mt-5 font-black text-3xl md:text-5xl text-amber-500">
                            {formatearDinero(producto.precio)}
                        </p>

                        <div className="flex h-8 md:h-10 mt-3 md:mt-5 gap-2 md:gap-4">
                            <button
                                type="button"
                                className="bg-indigo-600 hover:bg-indigo-800 px-3 md:px-5 py-1 md:py-2 text-xs md:text-base text-white font-bold rounded"
                                onClick={() => handleActualizarPedido({ ...producto, primeraSalsa, segundaSalsa, resumenId })}
                            >
                                Actualizar Pedido
                            </button>

                            <button type="button" className="bg-red-600 hover:bg-red-800 px-3 md:px-5 py-1 md:py-2 text-xs md:text-base text-white font-bold rounded"
                                onClick={handleChangeModalActualizar}
                            >
                                Cancelar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            : 
            
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-1/3">
                        <Image
                            width={300}
                            height={300}
                            alt={`Imagen producto ${producto.nombre}`}
                            src={`/assets/img/${producto.imagen}.jpg`}
                            className="mx-auto"
                        />
                    </div>

                    <div className="w-full md:w-2/3">
                        <div className="flex justify-end">
                            <button onClick={handleChangeModalActualizar}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <h1 className="text-xl md:text-3xl font-bold mt-5">{producto.nombre}</h1>

                        <p className="mt-5 font-black text-3xl md:text-5xl text-amber-500">
                            {formatearDinero(producto.precio)}
                        </p>

                        <div className="mt-5">
                            <button
                                type="button"
                                className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 w-full md:w-auto text-white font-bold rounded"
                                onClick={() => handleActualizarPedido({ ...producto, resumenId })}
                            >
                                Actualizar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ModalActualizar;
