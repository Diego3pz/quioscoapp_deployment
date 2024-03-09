import AdminLayout from "@/layout/AdminLayout"
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import OrdenHistorial from "@/components/OrdenHistorial";
import { Datepicker } from 'flowbite-react';


export default function historial() {

    const fetcher = () => axios.get('/api/historial').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/historial', fetcher, { refreshInterval: 100 });
    const [dateValueInicial, setDateValueInicial] = useState()
    const [dateValueFinal, setDateValueFinal] = useState()

    // Función para filtrar por rango de fechas
    const filtrarPorRangoDeFechas = (datos, fechaInicio, fechaFin) => {
        return datos.filter((item) => {
            const fechaPedido = parseInt(item.fecha);
            return fechaPedido >= fechaInicio && fechaPedido <= fechaFin;
        });
    };

    const fechaInicio = dateValueInicial;
    const fechaFin = dateValueFinal;

    // Filtrar los datos por rango de fechas
    const datosFiltrados = data ? filtrarPorRangoDeFechas(data, fechaInicio, fechaFin) : [];

    const handleDatePickerChangeInicial = (date) => {
        setDateValueInicial(date.getTime());
        console.log(date.getTime());
    };
    const handleDatePickerChangeFinal = (date) => {
        setDateValueFinal(date.getTime());
        console.log(date.getTime());
    };



    return (
        <div>
            <AdminLayout pagina={'Historial'}>
                <h1 className=" text-4xl font-black">
                    Historial de los Pedidos Pagados
                </h1>
                <p className="text-2xl my-10">
                    Gestional de Historial
                </p>
                <div>
                    <p>Filtrar fechas entre:</p>


                    <div class="flex items-center my-5 gap-4">
                        <div>
                            <Datepicker language="MX"
                                onSelectedDateChanged={handleDatePickerChangeInicial} value={dateValueInicial} />
                        </div>
                        <p>to</p>
                        <div>
                            <Datepicker language="MX"
                                onSelectedDateChanged={handleDatePickerChangeFinal} value={dateValueFinal} />
                        </div>


                    </div>
                </div>



                {data && data.length ? datosFiltrados.map(orden =>
                    <OrdenHistorial key={orden.id}
                        orden={orden} />
                ) :
                    <p>No hay ordenes con estas fechas </p>
                }


            </AdminLayout>

        </div>
    )
}