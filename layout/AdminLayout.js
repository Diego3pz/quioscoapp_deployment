import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children, pagina }) {
    return (
        <>
            <Head>
                <title>Carma - {pagina}</title>
                <meta name="description" content="Quosco Cafetería" />
            </Head>

            <div className="md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5">
                    <Image
                        width={300}
                        height={100}
                        src="/assets/img/logo.png"
                        alt="imagen logotipo"
                    />
                    <nav className="mt-10">
                        <Link href={`/admin`}>
                            <div className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:transition-all hover:cursor-pointer`}>
                                <Image width={100} height={100} src={`/assets/img/icono_ordenes.svg`} alt="Imagen icono" />

                                <button type="button" className=" text-2xl font-bold hover:cursor-pointer">Ordenes pendientes</button>
                            </div>
                        </Link>

                        <Link href={`/historial`}>
                            <div className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:transition-all hover:cursor-pointer`}>
                                <Image width={100} height={100} src={`/assets/img/dinero.svg`} alt="Imagen icono" />

                                <button type="button" className=" text-2xl font-bold hover:cursor-pointer">Historial de Ordenes</button>
                            </div>
                        </Link>
                    </nav>
                </aside>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className="p-10">
                        {children}
                    </div>
                </main>
            </div>
            <ToastContainer />
        </>
    );
}