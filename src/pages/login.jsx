import {
  Button, Form, Input, message,
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import background from '../images/background.jpeg';
import logo from '../images/logo.png';
import { memory } from '../service';

const LoginPage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size:cover;
`;

const Header = styled.header`
  align-items: center;
  display:flex;
  font-size: 20px;
`;

const LogoImage = styled.img`
  src: ${(props) => props.src};
  height: 50px;
  border-radius: 50%;
  margin: 0 15px 15px 50px;
`;

const Content = styled.section`
  width: 400px;
  height: 300px;
  background-color: #fff;
  margin: 50px auto;
  padding: 20px 40px;
`;

const ContentTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

/**
 * 登入頁
 *
 * @returns {React.ReactElement}
 */
export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async () => {
    const user = 'user';

    memory.user = user;

    message.success('登入成功');
    navigate('/');
  };

  return (
    <LoginPage>
      <Header>
        <LogoImage src={logo} />
        <h1>留言板</h1>
      </Header>
      <Content>
        <ContentTitle>使用者登入</ContentTitle>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'not a email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { max: 8, message: 'max lengh 8 ' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              login in
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </LoginPage>
  );
}
