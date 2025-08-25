import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Avatar, Row, Col, Tag, List, Tabs, Form, Input, Upload, message, Modal } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EditOutlined, PlusOutlined, FileTextOutlined, TrophyOutlined, UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone?: string;
  realName?: string;
  avatar?: string;
  organization?: string;
  bio?: string;
}

interface UserProject {
  id: string;
  title: string;
  trackName: string;
  status: 'submitted' | 'reviewing' | 'approved' | 'rejected';
  submitDate: string;
  lastModified: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // 检查用户登录状态
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/baitabei/login', { state: { from: location } });
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // TODO: 从后端获取用户详细信息和项目列表
    // 模拟数据
    const mockProjects: UserProject[] = [
      {
        id: 'proj_1',
        title: '数字文化传播创新平台',
        trackName: '技术创新赛道',
        status: 'reviewing',
        submitDate: '2025-10-15',
        lastModified: '2025-10-20'
      },
      {
        id: 'proj_2',
        title: '传统文化AR体验应用',
        trackName: '创意设计赛道',
        status: 'submitted',
        submitDate: '2025-10-10',
        lastModified: '2025-10-10'
      }
    ];
    setProjects(mockProjects);
  }, [navigate]);

  // 获取状态显示
  const getStatusDisplay = (status: string) => {
    const statusMap = {
      'submitted': { color: 'blue', text: '已提交' },
      'reviewing': { color: 'orange', text: '评审中' },
      'approved': { color: 'green', text: '已通过' },
      'rejected': { color: 'red', text: '未通过' }
    };
    return statusMap[status as keyof typeof statusMap] || { color: 'default', text: '未知' };
  };

  // 更新用户信息
  const handleUpdateProfile = async (values: any) => {
    try {
      // TODO: 连接后端API更新用户信息
      console.log('更新用户信息:', values);

      // 模拟更新
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...values };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      message.success('个人信息更新成功!');
      setEditModalVisible(false);
    } catch (error) {
      message.error('更新失败，请稍后重试');
    }
  };

  // 头像上传配置
  const avatarUploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload: (file: File) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 格式的图片!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
        return false;
      }

      // TODO: 上传到阿里云OSS
      // 这里临时使用本地URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatar = e.target?.result as string;
        setUser(prev => prev ? { ...prev, avatar } : null);
        message.success('头像上传成功!');
        setAvatarModalVisible(false);
      };
      reader.readAsDataURL(file);

      return false; // 防止自动上传
    },
  };

  if (!user) {
    return <div>加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 用户信息头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-8 shadow-lg border-0">
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={8} md={6} className="text-center">
                <div className="relative inline-block">
                  <Avatar
                    size={120}
                    src={user.avatar}
                    icon={<UserOutlined />}
                    className="border-4 border-white shadow-lg"
                  />
                  <Button
                    shape="circle"
                    icon={<EditOutlined />}
                    size="small"
                    className="absolute bottom-0 right-0 bg-red-600 border-red-600 text-white hover:bg-red-700"
                    onClick={() => setAvatarModalVisible(true)}
                  />
                </div>
              </Col>
              <Col xs={24} sm={16} md={18}>
                <div className="flex justify-between items-start">
                  <div>
                    <Title level={2} className="mb-2">
                      {user.realName || user.username}
                    </Title>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <UserOutlined className="text-gray-500" />
                        <Text>{user.username}</Text>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MailOutlined className="text-gray-500" />
                        <Text>{user.email}</Text>
                      </div>
                      {user.phone && (
                        <div className="flex items-center space-x-2">
                          <PhoneOutlined className="text-gray-500" />
                          <Text>{user.phone}</Text>
                        </div>
                      )}
                      {user.organization && (
                        <div className="flex items-center space-x-2">
                          <Text className="text-gray-500">机构:</Text>
                          <Text>{user.organization}</Text>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      form.setFieldsValue(user);
                      setEditModalVisible(true);
                    }}
                  >
                    编辑资料
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* 主要内容区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg border-0">
            <Tabs defaultActiveKey="projects">
              {/* 我的项目 */}
              <TabPane tab={<span><FileTextOutlined />我的项目</span>} key="projects">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <Title level={3}>参赛项目</Title>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => navigate('/baitabei/register')}
                    >
                      新建项目
                    </Button>
                  </div>

                  <List
                    itemLayout="horizontal"
                    dataSource={projects}
                    renderItem={(project) => {
                      const status = getStatusDisplay(project.status);
                      return (
                        <List.Item
                          actions={[
                            <Button type="link">查看详情</Button>,
                            project.status === 'submitted' && <Button type="link">修改</Button>
                          ].filter(Boolean)}
                        >
                          <List.Item.Meta
                            avatar={<TrophyOutlined className="text-2xl text-red-600" />}
                            title={
                              <div className="flex items-center space-x-2">
                                <span>{project.title}</span>
                                <Tag color={status.color}>{status.text}</Tag>
                              </div>
                            }
                            description={
                              <div>
                                <div className="text-gray-600 mb-1">赛道: {project.trackName}</div>
                                <div className="text-sm text-gray-500">
                                  提交时间: {new Date(project.submitDate).toLocaleDateString()}
                                  {project.lastModified !== project.submitDate && (
                                    <span> | 最后修改: {new Date(project.lastModified).toLocaleDateString()}</span>
                                  )}
                                </div>
                              </div>
                            }
                          />
                        </List.Item>
                      );
                    }}
                  />
                </div>
              </TabPane>

              {/* 获奖记录 */}
              <TabPane tab={<span><TrophyOutlined />获奖记录</span>} key="awards">
                <div className="text-center py-12">
                  <TrophyOutlined className="text-6xl text-gray-300 mb-4" />
                  <Text className="text-gray-500">暂无获奖记录</Text>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </motion.div>

        {/* 编辑资料模态框 */}
        <Modal
          title="编辑个人资料"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateProfile}
          >
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="realName"
                  label="真实姓名"
                >
                  <Input placeholder="请输入真实姓名" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phone"
                  label="手机号码"
                  rules={[
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
                  ]}
                >
                  <Input placeholder="请输入手机号码" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="organization"
                  label="所在机构"
                >
                  <Input placeholder="请输入所在机构或学校" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="bio"
                  label="个人简介"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="介绍一下自己..."
                    maxLength={200}
                    showCount
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end space-x-2 mt-6">
              <Button onClick={() => setEditModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </div>
          </Form>
        </Modal>

        {/* 头像上传模态框 */}
        <Modal
          title="更换头像"
          open={avatarModalVisible}
          onCancel={() => setAvatarModalVisible(false)}
          footer={null}
        >
          <div className="text-center py-8">
            <Avatar
              size={120}
              src={user.avatar}
              icon={<UserOutlined />}
              className="mb-6"
            />
            <div>
              <Upload {...avatarUploadProps}>
                <Button icon={<UploadOutlined />} size="large">
                  选择图片
                </Button>
              </Upload>
              <div className="text-sm text-gray-500 mt-2">
                支持 JPG、PNG 格式，文件大小不超过 2MB
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;