import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Tabs, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '@/services/authService';
import trackImages from '@/constants/imagesCover';
import RegisterModal from '../pages/RegisterPage/registerModal';
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
  agreeToTerms: boolean;
  realName: string;
}

const LoginPage: React.FC = () => {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [agreementVisible, setAgreementVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 获取重定向路径
  const from = (location.state as any)?.from?.pathname || '/home';

  // 处理登录
  const handleLogin = async (values: LoginFormData) => {
    setLoginLoading(true);
    const { username, password } = values
    login({
      username,
      password
    }).then(res => {
      if (res?.code === 200) {
        // 可以从登陆信息中获取
        // getUserInfo()
        message.success('登录成功！');
        setLoginLoading(false);
        // 重定向到原页面或首页
        navigate('/home');
        // window.location.href = '/home'
      }
    }).finally(() => {
      setLoginLoading(false)
    })
  };

  // 处理注册
  const handleRegister = async (values: RegisterFormData) => {
    setRegisterLoading(true);
    const params = {
      ...values,
      agreeToTerms: true,
      realName: values?.username,
      // 表示注册的都是参赛者
      roleId: 5
    }
    try {
      register(params).then(res => {
        if (res.code === 200) {
          message.success('注册成功！');
          setRegisterLoading(false);
          setActiveTab('login');
          registerForm.resetFields();
          // 重定向到原页面或首页
          // navigate('/home');
          // window.location.href = '/home'
        }
      }).finally(() => {
        setRegisterLoading(false)
      })
      // 切换到登录标签
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
            <Link to="/login" className="inline-block">
              <img style={{ height: "60px" }} src={trackImages.LogoImg} />
            </Link>
            <Title level={2} className="mb-2">
              欢迎回来
            </Title>
            <Text className="text-gray-600">
              登录参与2025第四届“白塔杯”文化创意大赛
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
                      { required: true, message: '用户名至少3个字符的字母数字组合!', pattern: /^[a-zA-Z0-9]{3,}$/ },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="用户名至少3个字符"
                      size="large"
                      minLength={3}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                      { required: true, message: '请输入最少6位数密码!' },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="请输入最少6位数密码"
                      minLength={6}
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
                    label="用户名"
                    rules={[
                      { required: true, message: '用户名至少3个字符的字母数字组合!', pattern: /^[a-zA-Z0-9]{3,}$/ },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="用户名至少3个字符"
                      minLength={3}
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
                      placeholder="请输入邮箱地址"
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
                      minLength={6}
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
                      placeholder="请输入确认密码"
                      size="large"
                      minLength={6}
                    />
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
          {/* 协议弹窗 */}
          <RegisterModal
            agreementVisible={agreementVisible}
            setAgreementVisible={setAgreementVisible}
          />

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