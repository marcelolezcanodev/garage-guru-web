import React, { useContext } from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { activateUser } from "../../providers/userProvider"; // Importar el provider
import { ColorModeContext } from "../../contexts/color-mode"; // Importa el contexto

export const ActivateUser: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mode } = useContext(ColorModeContext); // Acceder al modo actual del contexto

  const onFinish = async (values: { userKey: string; password: string }) => {
    try {
      // Llamar a la función de activar usuario
      const response = await activateUser(values);

      if (response.codigo === 200) {
        notification.success({
          message: "Activación Exitosa",
          description: "Tu cuenta ha sido activada correctamente.",
        });
        // Redirigir a la pantalla principal después de la activación
        setTimeout(() => {
          navigate("/login"); // O al menú principal si lo deseas
        }, 1500);
      }
    } catch (error: any) {
      notification.error({
        message: "Error en la activación",
        description: error.message || "Ocurrió un error inesperado.",
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: "50px",
        backgroundColor: mode === "dark" ? "#1f1f1f" : "#fff", // Fondo depende del modo
        borderRadius: "8px",
      }}
    >
      <h2 style={{ color: mode === "dark" ? "#fff" : "#000" }}>Activar Cuenta</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          backgroundColor: mode === "dark" ? "#1f1f1f" : "#fff", // Fondo depende del modo
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Form.Item
          label="Correo Electrónico"
          name="userKey"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa tu correo electrónico",
              type: "email",
            },
          ]}
        >
          <Input
            placeholder="Correo electrónico"
            style={{
              backgroundColor: mode === "dark" ? "#333" : "#fff", // Fondo oscuro o claro
              color: mode === "dark" ? "#fff" : "#000", // Texto depende del modo
            }}
          />
        </Form.Item>

        <Form.Item
          label="Nueva Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa una contraseña",
            },
            {
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          ]}
        >
          <Input.Password
            placeholder="Nueva contraseña"
            style={{
              backgroundColor: mode === "dark" ? "#333" : "#fff", // Fondo oscuro o claro
              color: mode === "dark" ? "#fff" : "#000", // Texto depende del modo
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Activar Cuenta
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
