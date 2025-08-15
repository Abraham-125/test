import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("https://TU_BACKEND.onrender.com/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
