import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";

const Categoria = ({ categoria }) => {
    const { categoriaActual, handleClickCategoria } = useQuiosco();
    const { nombre, icono, id } = categoria;

    return (
        <div
            className={`${
                categoriaActual?.id === id ? "bg-amber-400" : ""
            } flex items-center md:gap-4 gap-2 w-full border p-3 md:p-5 hover:bg-amber-400 hover:transition-all hover:cursor-pointer`}
            onClick={() => handleClickCategoria(id)}
        >
            {/* Ajustar el tamaño de la imagen según el tamaño de la pantalla */}
            <Image
                width={50}  // Tamaño más pequeño para móviles
                height={50} 
                className="md:w-16 md:h-16"  // Tamaño más grande para pantallas medianas
                src={`/assets/img/icono_${icono}.svg`}
                alt={`Icono ${nombre}`}
            />

            <button
                type="button"
                className="text-lg md:text-2xl font-bold hover:cursor-pointer text-center md:text-left"
                onClick={() => handleClickCategoria(id)}
            >
                {nombre}
            </button>
        </div>
    );
};

export default Categoria;
