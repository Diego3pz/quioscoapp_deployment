import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"
import Categoria from "./Categoria"
import Link from "next/link"

const Sidebar = () => {
    const { categorias } = useQuiosco()
    return (
        <>
            <nav className="mt-10">
                {categorias.map(categoria => (
                    <Categoria key={categoria.id} categoria={categoria} />
                ))}
                <Link href={`/ordeneslistas`}>
                    <div className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:transition-all hover:cursor-pointer`}>
                        <Image width={100} height={100} src={`/assets/img/icono_ordenes.svg`} alt="Imagen icono" />
                        <button type="button" className=" text-2xl font-bold hover:cursor-pointer">
                            Ordenes Listas
                        </button>
                    </div>
                </Link>
            </nav>
        </>
    )
}

export default Sidebar