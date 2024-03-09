import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import { useRouter } from "next/router";


const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [modalActualizar, setModalActualizar] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    const [clienteCambio, setClienteCambio] = useState(0);
    const [clientePago, setClientePago] = useState(0)


    const router = useRouter()


    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }
    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0]);
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleChangeModalActualizar = () => {
        setModalActualizar(!modalActualizar);
    }

    const handleAgregarPedido = (producto) => {
        setPedido([...pedido, producto]);
        setModal(false);
        toast.success('Producto Agregado')
    }

    const handleEditarSalsas = (idResumen) => {

        const actualizarProducto = pedido.filter(producto => producto.resumenId === idResumen)
        setProducto(actualizarProducto[0])
        setModalActualizar(!modalActualizar);
    }

    const handleActualizarPedido = (producto) => {

        const productoActualizado = pedido.map(productoState => productoState.resumenId === producto.resumenId ? producto : productoState)
        setPedido(productoActualizado);
        setModalActualizar(false);
        toast.success('Producto Agregado')
    }

    const handleEliminarActualizado = id => {
        const identificarProductoAnterior = pedido.filter(p => p.resumenId !== id)
        setPedido(identificarProductoAnterior)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.resumenId !== id)
        setPedido(pedidoActualizado)
        toast.success('Producto Eliminado')
    }

    const handleInsertarHistorial = (ordenlista) => {

    }

    const colocarOrden = async (e) => {

        e.preventDefault()
        try {
            await axios.post('/api/ordenes', { clienteCambio, clientePago, pedido, nombre, total, fecha: Date.now().toString() })
            //Resetear app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Enviado')
            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const colocarOrdenHistorial = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/ordenes', { clienteCambio, clientePago, pedido, nombre, total, fecha: Date.now().toString(), clientePago, clienteCambio })
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Listo')
        } catch (error) {
            console.log(error);
        }
    }

    console.log(clientePago);

    return (
        <QuioscoContext.Provider value={{ categorias, categoriaActual, handleClickCategoria, producto, handleSetProducto, modal, handleChangeModal, handleAgregarPedido, pedido, handleEditarSalsas, handleChangeModalActualizar, modalActualizar, handleActualizarPedido, handleEliminarProducto, handleEliminarActualizado, setNombre, nombre, colocarOrden, total, colocarOrdenHistorial, clienteCambio, setClienteCambio, clientePago, setClientePago }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext