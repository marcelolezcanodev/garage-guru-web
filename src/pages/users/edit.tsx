import { Edit, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select, notification } from "antd";
import { updateUser } from "../../providers/userProvider";
import { useNavigate } from "react-router-dom";

export const UserEdit = () => {
  const { formProps, saveButtonProps, form } = useForm({
    // Evitar la advertencia de salida con cambios no guardados
    warnWhenUnsavedChanges: false,
  });
  const navigate = useNavigate();

  const handleSave = async (values: any) => {
    try {
      // Llamada a la función de crear usuario desde el provider
      const response = await updateUser({
        nombres: values.nombres,
        apellidos: values.apellidos,
        usuario: values.usuario,
        correo: values.correo,
        rol: values.rol,
        nroDocumento: values.nroDocumento,
        tipoDocumento: values.tipoDocumento,
      });

      // Mostrar notificación de éxito
      notification.success({
        message: "Usuario actualizado con éxito",
        description: `El usuario ${response.response.data.usuario.nombreUsuario} fue creado correctamente.`,
      });

      // Redirigir a la lista de usuarios después de un pequeño retraso para permitir que el usuario vea la notificación
      setTimeout(() => {
        navigate("/users");
      }, 1500); // Redirige después de 1.5 segundos
    } catch (error: any) {
      // Mostrar notificación de error
      notification.error({
        message: "Error al actualizar el usuario",
        description: error.message || "Ocurrió un error desconocido",
      });
    }
  };

  return (
    <Edit
      saveButtonProps={{
        ...saveButtonProps,
        onClick: () => {
          form
            .validateFields()
            .then((values) => {
              handleSave(values); // Llama a la función de guardado cuando los campos son válidos
            })
            .catch(() => {
              notification.error({
                message: "Error en el formulario",
                description:
                  "Por favor, completa correctamente todos los campos.",
              });
            });
        },
      }}
      title="Editar Usuario"
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Nombres"}
          name="nombres"
          rules={[{ required: true, message: "Por favor ingresa los nombres" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Apellidos"}
          name="apellidos"
          rules={[
            { required: true, message: "Por favor ingresa los apellidos" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Rol"}
          name="rol"
          rules={[{ required: true, message: "Por favor selecciona un rol" }]}
        >
          <Select
            options={[
              { value: "Administrador", label: "Administrador" },
              { value: "Tecnico", label: "Técnico" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={"Número de Documento"}
          name="nroDocumento"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el número de documento",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Tipo de Documento"}
          name="tipoDocumento"
          rules={[
            {
              required: true,
              message: "Por favor selecciona el tipo de documento",
            },
          ]}
        >
          <Select options={[{ value: "CI", label: "Cédula de Identidad" }]} />
        </Form.Item>

        <Form.Item label={"Estado"} name="estado" rules={[{ required: false }]}>
          <Select
            options={[
              { value: "ACTIVO", label: "ACTIVO" },
              { value: "INACTIVO", label: "INACTIVO" },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
