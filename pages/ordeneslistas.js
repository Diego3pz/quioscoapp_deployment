import OrdenesListasLayout from "@/layout/OrdenesListasLayout";
import useSWR from "swr";
import axios from "axios";
import OrdenLista from "@/components/OrdenLista";

export default function OrdenesListas() {

    const fetcher = () => axios.get('/api/ordeneslistas').then(datos => datos.data)

    const { data, error, isLoading } = useSWR('/api/ordeneslistas', fetcher, { refreshInterval: 100 });

    return (
        <div>
            <OrdenesListasLayout>
                <h1 className=" text-4xl font-black">
                    Panel de Ordenes Listas
                </h1>
                <p className="text-2xl my-10">
                    Gestiona las ordenes
                </p>

                {data && data.length ? data.map(orden =>
                    <OrdenLista key={orden.id}
                        orden={orden} />
                ) :
                    <p>No hay ordenes lista </p>
                }
            </OrdenesListasLayout>
        </div>
    )
}