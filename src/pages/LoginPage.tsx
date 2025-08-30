import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Tabs, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login, register, logout, getUserInfo } from '@/services/authService';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface LoginFormData {
  username: string;
  password: string;
  remember?: boolean;
}

interface RegisterFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

const LoginPage: React.FC = () => {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const navigate = useNavigate();
  const location = useLocation();

  // 获取重定向路径
  const from = (location.state as any)?.from?.pathname || '/baitabei/home';

  // 处理登录
  const handleLogin = async (values: LoginFormData) => {
    setLoginLoading(true);
    const { username, password } = values
    login({
      username,
      password
    }).then(res => {
      if (res.code === 200) {

        message.success('登录成功！');
        setLoginLoading(false);
        window.location.href = '/baitabei/home'
        // 重定向到原页面或首页
        navigate(from, { replace: true });
      }
    }).finally(() => {
      setLoginLoading(false)
    })
    // try {
    //   // TODO: 连接后端登录API
    //   console.log('登录数据:', values);

    //   // 模拟登录请求
    //   await new Promise(resolve => setTimeout(resolve, 1000));

    //   message.success('登录成功！');

    //   // 保存用户信息到localStorage (临时方案)
    //   localStorage.setItem('user', JSON.stringify({
    //     id: 'user_' + Date.now(),
    //     username: values.account,
    //     email: values.account.includes('@') ? values.account : `${values.account}@example.com`,
    //     loginTime: new Date().toISOString()
    //   }));
    //   window.location.href = '/baitabei/home'
    //   // 重定向到原页面或首页
    //   navigate(from, { replace: true });
    // } catch (error) {
    //   message.error('登录失败，请检查账号密码');
    // } finally {
    //   setLoginLoading(false);
    // }
  };

  // 处理注册
  const handleRegister = async (values: RegisterFormData) => {
    setRegisterLoading(true);
    try {
      // TODO: 连接后端注册API
      console.log('注册数据:', values);

      // 模拟注册请求
      await new Promise(resolve => setTimeout(resolve, 1500));

      message.success('注册成功！请登录您的账户。');

      // 切换到登录标签
      setActiveTab('login');
      registerForm.resetFields();
    } catch (error) {
      message.error('注册失败，请稍后重试');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 品牌标识 */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                白
              </div>
            </Link>
            <Title level={2} className="mb-2">
              欢迎回来
            </Title>
            <Text className="text-gray-600">
              登录参与2025年白塔杯文化创意大赛
            </Text>
          </div>

          <Card className="shadow-2xl border-0">
            <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
              {/* 登录标签 */}
              <TabPane tab="登录" key="login">
                <Form
                  form={loginForm}
                  name="login"
                  onFinish={handleLogin}
                  layout="vertical"
                  className="mt-4"
                >
                  <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                      { required: true, message: '请输入用户名!' },
                      { min: 3, message: '用户名至少3个字符!' },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="用户名"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                      { required: true, message: '请输入密码!' },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="密码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <div className="flex justify-between items-center">
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                      </Form.Item>
                      <a className="text-red-600 hover:text-red-700" href="#">
                        忘记密码？
                      </a>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loginLoading}
                      size="large"
                      block

                    >
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              {/* 注册标签 */}
              <TabPane tab="注册" key="register">
                <Form
                  form={registerForm}
                  name="register"
                  onFinish={handleRegister}
                  layout="vertical"
                  className="mt-4"
                >
                  <Form.Item
                    name="username"
                    label="邮箱/手机号"
                    rules={[
                      { required: true, message: '请输入邮箱或手机号!' },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="邮箱或手机号"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                      { required: true, message: '请输入邮箱!' },
                      { type: 'email', message: '请输入正确的邮箱格式!' },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="邮箱地址"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[
                      { required: true, message: '请输入手机号!' },
                      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号!' },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="手机号码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                      { required: true, message: '请输入密码!' },
                      { min: 6, message: '密码至少6个字符!' },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="密码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: '请确认密码!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不一致!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="确认密码"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error('请阅读并同意服务条款')),
                      },
                    ]}
                  >
                    <Checkbox>
                      我已阅读并同意
                      <a href="#" className="text-red-600 hover:text-red-700">
                        《用户服务协议》
                      </a>
                      和
                      <a href="#" className="text-red-600 hover:text-red-700">
                        《隐私政策》
                      </a>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={registerLoading}
                      size="large"
                      block

                    >
                      注册
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>

          <div className="text-center mt-6">
            <Text className="text-gray-600">
              没有账户？
              <Button
                type="link"
                onClick={() => setActiveTab('register')}
                className="text-red-600 hover:text-red-700 p-0 ml-1"
              >
                立即注册
              </Button>
            </Text>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;