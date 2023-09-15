import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayaout from "./layout/AuthLayaout";
import RutaProtegida from "./layout/RutaProtegida";
import Login from "./paginas/Login";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Olvidepassword from "./paginas/Olvidepassword";
import Registrar from "./paginas/Registrar";
import NuevoPassword from "./paginas/nuevoPassword";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayaout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<Olvidepassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil/>} />
              <Route path="cambiar-Password" element={<CambiarPassword/>} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
