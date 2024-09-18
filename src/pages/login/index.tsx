import { AuthPage } from "@refinedev/antd";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "chelolezcano97@gmail.com", password: "123" },
      }}
      renderContent={(content) => (
        <>
          {content}
          <Space direction="vertical" style={{ width: "100%", marginTop: 16 }}>
            {/* Botón para activar cuenta */}
            <Link to="/activate">
              <Button type="link">Activar cuenta</Button>
            </Link>
          </Space>
        </>
      )}
    />
  );
};
