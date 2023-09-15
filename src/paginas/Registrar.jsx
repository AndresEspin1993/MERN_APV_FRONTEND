import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";


const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  // const {alerta, setAlerta} = useState({})
  const [alerta, setAlerta] = useState({ msg: '', error: false });


  const handleSubmit = async e => {
    e.preventDefault();
    // console.log('Enviando formulario')

    if([nombre, email, password, repetirPassword].includes('')){

      setAlerta({msg: 'Hay campos vacios', error: true});
      return;

    }

    if(password !== repetirPassword){
     
      setAlerta({msg: 'passwords diferentes no coinciden', error: true});
      return;
    }

    if(password.length < 6){
      setAlerta({msg: 'El password es muy corto, Minimo 6 caracteres', error: true});
      
      return;
    }

    setAlerta({});

    // Crear usuario en la api -------------- aqui conectamos front y backend
    try {
      
      await clienteAxios.post(`/veterinarios`, {nombre, email, password});
      // console.log(respuesta);

      setAlerta({ msg: 'Creado correctamente, Rivisa tu correo', error: false})
    } catch (error) {
      // console.log(error.response)

      setAlerta({
          msg: error.response.data.msg,
          error:true
      })
      
    }




  }

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y administra tus{" "}
          <span className="text-black">Pacientes</span>{" "}
        </h1>
      </div>

      <div className="mt.20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {msg && <Alerta 
          alerta={alerta}
        
        />}
        
        <form action="" onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={e => setNombre (e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="email"
              placeholder="Email de Registro"
              value={email}
              onChange={e => setEmail (e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Tu password"
              value={password}
              onChange={e => setPassword (e.target.value)}
            />
          </div>

          <div className="my-5">
            <label
              htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repetir Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Repite tu password"
              value={repetirPassword}
              onChange={e => setRepetirPassword (e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear cuenta"
            className="bg-indigo-700 w-full p-3  rounded-xl text-xl uppercase font-bold mt-5 hover:cursor-pointer text-white hover:bg-indigo-800 hover:text-white md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between ">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia sesion
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
