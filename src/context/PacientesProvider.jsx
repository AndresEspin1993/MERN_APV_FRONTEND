import { createContext, useState, useEffect } from "react";
import clienteAxios from  '../config/axios';
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext();



const PacientesProvider = ({children}) =>{
    const { auth } = useAuth()

  

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() =>{
        const obtenerPacientes= async () =>{
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config)
                // console.log(data)
                setPacientes(data)
                
            } catch (error) {
                console.log(error)
                
            }
        }

        obtenerPacientes();
    },[auth])

    // TOME LOS DATOS INGRESADOS EN EL FORMULARIO E INGRESARLOS EN EL STATE
    const guardarPaciente = async (paciente) =>{

        const token = localStorage.getItem('token')
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
              const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config)
            //   sincronizar los datos guardados del form con los de state que se muestran
              const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
                
            }


        }else{
                // Guardando nuevos pacientes
            try {
               
    
                const {data} = await clienteAxios.post('/pacientes', paciente,config);
                // crear un nuevo objeto con lo que no tengo y que saque en la sig linea solo me de datos queridos
    
                const {createdAt, updateAt, __v, ...pacienteAlmacenado} = data;
                // tomamos el paciente almacenado para el stsate y luego una copia de pacientes
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg);
    
                // 
                
            }
            
        }

        
    }


    // EDIATR PACIENTES
    const setEdicion = (paciente) =>{
        setPaciente(paciente);
    }


    // Eliminar el paciente
    const eliminarPaciente =async id =>{
        const confirmar = confirm('Desea eliminar este registro?')
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                // sincronizar el state para que se quite el registro eliminado sin recargar
                // me traera todos los que son diferentes al id eliminado
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizado)
                
            } catch (error) {
                console.log(error)
                
            }
        }
    }
    return(

        <PacientesContext.Provider
        
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente

        }}>
            {children}

        </PacientesContext.Provider>
    )

}

export{
    PacientesProvider
}

export default PacientesContext;
