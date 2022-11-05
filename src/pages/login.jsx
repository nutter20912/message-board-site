import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as api from '../api';
import background from '../images/background.jpeg';
import logo from '../images/logo.png';
import { storage } from '../lib';
import Register from './register';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async () => {
    const { email, password } = form.getFieldsValue(true);

    try {
      const { result: user } = await api.userLogin({ email, password });

      storage.set('user', user);
      message.success('登入成功');
      navigate('/');
    } catch ({ response: { data } }) {
      message.error(data.message);
    }
  };

  const showModal = () => {
    form.resetFields();
    setModalOpen(true);
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
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
              {
                pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'not a email',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                max: 8,
                message: 'max lengh 8 ',
              },
            ]}
          >
            <Input.Password prefix={<KeyOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round" block>
              login in
            </Button>
          </Form.Item>

        </Form>
        <Button
          type="primary"
          shape="round"
          style={{ backgroundColor: 'forestgreen' }}
          onClick={showModal}
          block
        >
          register
        </Button>
        <Register
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
      </Content>
    </LoginPage>
  );
}
