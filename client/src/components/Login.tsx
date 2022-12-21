import { Form, Input, Button, Checkbox } from "antd";
import { gql, useMutation } from "@apollo/client";

const MUTATION_LOGIN = gql`
  mutation Login($username: String!, $password: String!, $input: LoginInput) {
    login(username: $username, password: $password, input: $input)
      @rest(
        type: "Post"
        path: ".cgi/logon?userid={args.username}&password={args.password}"
        method: "POST"
        endpoint: "v1"
      ) {
      NoResponse
    }
  }
`;

interface LoginProps {
  onLogin: (isLoggedIn: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const onFinish = async (values: any) => {
    await login({
      variables: {
        username: values.username,
        password: values.password,
        input: {},
      },
    });
    onLogin(true);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const [login, { loading, error, data }] = useMutation(MUTATION_LOGIN);
  console.log("Get activities: ", data);

  if (loading || error) return <p>Loading ...</p>;

  return (
    <>
      <Form
        name="basic"
        style={{ width: 360, margin: "0 auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
