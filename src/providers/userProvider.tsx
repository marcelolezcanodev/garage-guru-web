import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL; // Ajusta esto según tu configuración

// Obtiene el token de autorización almacenado en localStorage
const getToken = () => {
  return localStorage.getItem("auth_token");
};

// Configuración común para los headers de autorización
const getHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Función para crear un usuario
export const createUser = async (userData: {
    nombres: string;
    apellidos: string;
    usuario: string;
    correo: string;
    rol: string;
    nroDocumento: string;
    tipoDocumento: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_URL}/usuarios/crear`,
        userData,
        getHeaders()
      );
  
      if (response.data.codigo !== 200) {
        throw new Error(response.data.mensaje || "Error desconocido");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error creando el usuario:", error);
      throw error;
    }
  };

// Función para obtener una lista de usuarios (con paginación opcional)
export const getUsers = async (pagination: {
    page: number;
    pageSize: number;
  }) => {
    try {
      const response = await axios.post(
        `${API_URL}/usuarios`,
        {
          paginacion: { pagina: pagination.page, cantidad: pagination.pageSize },
        },
        getHeaders()
      );
      
      if (response.data.codigo !== 200) {
        throw new Error(response.data.mensaje || "Error desconocido");
      }
      // Devolver tanto los usuarios como los datos de paginación
      return {
        usuarios: response.data.response.data.usuarios,
        paginacion: response.data.response.data.paginacion,
      };
    } catch (error) {
      console.error("Error obteniendo los usuarios:", error);
      throw error;
    }
  };
  

// Función para obtener un usuario por ID
export const getUserById  = async (pagination: {
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/usuarios`,
      {
        paginacion: { pagina: pagination.page, cantidad: pagination.pageSize },
      },
      getHeaders()
    );
    
    if (response.data.codigo !== 200) {
      throw new Error(response.data.mensaje || "Error desconocido");
    }
    // Devolver tanto los usuarios como los datos de paginación
    return {
      usuarios: response.data.response.data.usuarios,
      paginacion: response.data.response.data.paginacion,
    };
  } catch (error) {
    console.error("Error obteniendo los usuarios:", error);
    throw error;
  }
};

// Función para actualizar un usuario
export const updateUser = async (userData: {
  nombres: string;
  apellidos: string;
  usuario: string;
  correo: string;
  rol: string;
  nroDocumento: string;
  tipoDocumento: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/usuarios/actualizar`,
      userData,
      getHeaders()
    );

    if (response.data.codigo !== 200) {
      throw new Error(response.data.mensaje || "Error desconocido");
    }

    return response.data;
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/usuarios/${userId}`,
      getHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error eliminando el usuario:", error);
    throw error;
  }

  
};

// Función para activar un usuario
export const activateUser = async (activationData: { userKey: string, password: string }) => {
  try {
    const response = await axios.post(
      `${API_URL}/activar/usuario`,
      activationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.codigo !== 200) {
      throw new Error(response.data.mensaje || "Error desconocido en la activación");
    }

    return response.data;
  } catch (error) {
    console.error("Error activando el usuario:", error);
    throw error;
  }
};
