import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
// import axios from 'axios';
import qs from 'qs'
import { Navigate } from 'react-router-dom'
import request from '../../utils/request'
import './index.css';
// import { request } from 'https';

interface FormValue {
  password: string;
}

function Login(props: any) {

  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    
  }, [isLogin])
  

  const onFinish = (values: FormValue) => {
    if (!values.password) return message.info('请输入密码')
    request.post('/api/login', qs.stringify({
      password: values.password
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    )
    .then(res => {
      const data: boolean = res.data
      if (data) {
        setIsLogin(true)
      } else {
        message.error('fail')
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return isLogin ? (
    <Navigate to="/" replace />
  )
  : (
    <div className="login-page">
      <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      <Form.Item
        // label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 9,
          span: 10,
        }}
      >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default Login;
