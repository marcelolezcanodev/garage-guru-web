import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { notification, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getUsers } from "../../providers/userProvider"; // Importa el método getUsers

export const UserList = () => {
  const { tableProps, setCurrent, setPageSize } = useTable({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    syncWithLocation: true,
  });

  // Estado local para almacenar los usuarios
  const [usuarios, setUsuarios] = useState([]);
  // Estado local para almacenar el total de páginas
  const [totalPaginas, setTotalPaginas] = useState(0);

  const fetchUsers = async (pagination: any) => {
    try {
      // Usar la función `getUsers` desde el provider
      const { usuarios, paginacion } = await getUsers({
        page: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
      });

      // Verifica si se obtuvieron los datos correctamente
      if (usuarios && paginacion) {
        setUsuarios(usuarios);
        setCurrent(paginacion.pagina);
        setPageSize(paginacion.cantidad);
        setTotalPaginas(paginacion.totalPaginas);
      } else {
        console.error("No se encontraron datos de usuarios o paginación.");
        // Mostrar notificación de error
        notification.error({
          message: "Error al listar los usuarios",
          description: "No se encontraron datos de usuarios o paginación.",
        });
      }
    } catch (error: any) {
      // Mostrar notificación de error
      notification.error({
        message: "Error al listar los usuarios",
        description: error.message || "Error desconocido al listar los usuarios.",
      });
    }
  };

  useEffect(() => {
    if (tableProps.pagination && tableProps.pagination.current && tableProps.pagination.pageSize) {
      // Llama a la API solo cuando la paginación esté completamente lista
      fetchUsers({
        current: tableProps.pagination.current,
        pageSize: tableProps.pagination.pageSize,
      });
    }
  }, [tableProps.pagination?.current, tableProps.pagination?.pageSize]);

  return (
    <List>
      <Table
      {...tableProps}
      dataSource={usuarios}
      pagination={
        tableProps.pagination
          ? {
              current: tableProps.pagination.current,
              pageSize: tableProps.pagination.pageSize,
              total: totalPaginas * tableProps.pagination.pageSize, // Calcula el total de elementos
            }
          : false
      }
      rowKey="nombreUsuario"
    >
        <Table.Column dataIndex="nombreUsuario" title={"Nombre de Usuario"} />
        <Table.Column dataIndex="nombre" title={"Nombre"} />
        <Table.Column dataIndex="apellido" title={"Apellido"} />
        <Table.Column dataIndex={["documento", "numero"]} title={"Número de Documento"} />
        <Table.Column dataIndex="correo" title={"Correo"} />
        <Table.Column dataIndex="estado" title={"Estado"} />
        <Table.Column dataIndex="rol" title={"Rol"} />
        <Table.Column
          title={"Acciones"}
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.nombreUsuario} />
              <ShowButton hideText size="small" recordItemId={record.nombreUsuario} />
              <DeleteButton hideText size="small" recordItemId={record.nombreUsuario} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
