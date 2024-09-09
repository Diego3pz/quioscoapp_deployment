import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
    const { categorias } = useQuiosco();
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 w-full flex justify-between items-center p-5 bg-amber-500 z-50">
                <h2 className="text-xl font-bold text-white">Menú</h2>
                <button onClick={() => setMenuOpen(!isMenuOpen)} className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <nav
                className={`fixed md:static top-0 left-0 h-full bg-white shadow-md p-5 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:mt-10 overflow-y-auto`}
            >
                {categorias.map((categoria) => (
                    <Categoria key={categoria.id} categoria={categoria} />
                ))}
                <Link href={`/ordeneslistas`}>
                    <div className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:transition-all hover:cursor-pointer`}>
                        <Image
                            width={50}
                            height={50}
                            src={`/assets/img/icono_ordenes.svg`}
                            alt="Imagen icono"
                            className="w-12 h-12 md:w-16 md:h-16"
                        />
                        <button type="button" className="text-lg md:text-2xl font-bold hover:cursor-pointer">
                            Ordenes Listas
                        </button>
                    </div>
                </Link>
            </nav>
        </>
    );
};

export default Sidebar;
