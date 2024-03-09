export const formatearDinero = cantidad => {
    return cantidad.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}

export const formatearFecha = fecha => {
    const valorEnMilisegundos = parseFloat(fecha)
    const date = new Date(valorEnMilisegundos);
    return date.toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

