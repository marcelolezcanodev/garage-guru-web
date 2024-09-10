import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "chelolezcano97@gmail.com", password: "123" },
      }}
    />
  );
};
