import type { AuthProvider } from "@refinedev/core";
import axios from 'axios';

export const TOKEN_KEY = "auth_token";  // Asegúrate de usar el mismo TOKEN_KEY

export const authProvider: AuthProvider = {

  login: async ({ email, password }) => {
    try {
      console.log(`${import.meta.env.VITE_API_BASE_URL}/login`);
      
      // Usa axios para hacer la solicitud
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        { username: email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log('Response: ', response);
      const data = response.data;  // Aquí está el cuerpo de la respuesta
      const { token, name } = data.response.data;  // Extrae el token

      console.log('token: ', token);

      if (token) {
        // Almacena el token usando el mismo TOKEN_KEY
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        console.log('my_access_token stored: ', token);

        // Devuelve el éxito con la redirección
        return { success: true, redirectTo: "/" };
      }

      return { success: false };
    } catch (error) {
      console.log('Login error:', error);
      return { success: false };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);  // Usa el mismo TOKEN_KEY
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);  // Usa el mismo TOKEN_KEY
    const name = localStorage.getItem("username");
    if (token) {
      return {
        id: 1,
        name: name,
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },

  forgotPassword: async () => {
    const token = localStorage.getItem(TOKEN_KEY);  // Usa el mismo TOKEN_KEY
    const email = localStorage.getItem("email");
    if (token) {
      return {
        success: true,
      };
    }

    return {
      success: false,
      error: {
        name: "Register Error",
        message: "Invalid email",
      },
    };
  },
};
