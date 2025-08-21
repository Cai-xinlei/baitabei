import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Input, Select, Button, Card, Steps, Row, Col, Typography, Alert, Checkbox, Modal, message } from 'antd';
import { CheckCircleOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { TRACKS } from '../constants';
import FileUpload from '../components/UI/FileUpload';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [agreementVisible, setAgreementVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const selectedTrackId = searchParams.get('track');
  const selectedTrack = TRACKS.find(t => t.id === selectedTrackId);

  // 步骤配置
  const steps = [
    {
      title: '选择赛道',
      icon: <UserOutlined />,
      description: '选择参赛赛道'
    },
    {
      title: '填写信息',
      icon: <FileTextOutlined />,
      description: '填写参赛信息'
    },
    {
      title: '确认提交',
      icon: <CheckCircleOutlined />,
      description: '确认并提交报名'
    }
  ];

  // 文件上传变化处理
  const handleFileChange = (files: any[]) => {
    form.setFieldsValue({ attachments: files });
  };

  // 提交表单
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      // 这里将来会连接到后端 API
      console.log('提交的表单数据:', values);
      
      // 模拟提交延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      message.success('报名提交成功！请留意查收确认邮件。');
      setCurrentStep(2);
    } catch (error) {
      message.error('提交失败，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 下一步
  const handleNext = () => {
    if (currentStep === 0) {
      // 验证赛道选择
      const trackId = form.getFieldValue('trackId');
      if (!trackId) {
        message.warning('请选择参赛赛道');
        return;
      }
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // 验证表单
      form.validateFields().then(() => {
        setCurrentStep(2);
      }).catch(() => {
        message.warning('请填写必要信息');
      });
    }
  };

  // 上一步
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <Title level={2} className="mb-4">
            参赛报名
          </Title>
          <Paragraph className="text-lg text-gray-600">
            2025年第四届“白塔杯”文化创意大赛
          </Paragraph>
        </div>

        {/* 进度条 */}
        <Card className="mb-8 shadow-lg border-0">
          <Steps current={currentStep} items={steps} className="mb-0" />
        </Card>

        {/* 表单内容 */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              trackId: selectedTrackId
            }}
            onFinish={handleSubmit}
          >
            {/* 步骤1: 选择赛道 */}
            {currentStep === 0 && (
              <Card className="shadow-lg border-0">
                <Title level={3} className="mb-6">
                  选择参赛赛道
                </Title>
                
                <Form.Item
                  name="trackId"
                  label="赛道选择"
                  rules={[{ required: true, message: '请选择参赛赛道' }]}
                >
                  <Select
                    placeholder="请选择您要参加的赛道"
                    size="large"
                  >
                    {TRACKS.filter(track => track.status === 'open').map(track => (
                      <Option key={track.id} value={track.id}>
                        <div className="py-2">
                          <div className="font-semibold">{track.name}</div>
                          <div className="text-sm text-gray-500">{track.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            已报名: {track.participantCount}人 | 截止: {new Date(track.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {selectedTrack && (
                  <Alert
                    message={`已选择: ${selectedTrack.name}`}
                    description={selectedTrack.detailDescription}
                    type="info"
                    showIcon
                    className="mt-4"
                  />
                )}
              </Card>
            )}

            {/* 步骤2: 填写信息 */}
            {currentStep === 1 && (
              <Card className="shadow-lg border-0">
                <Title level={3} className="mb-6">
                  填写参赛信息
                </Title>
                
                <Row gutter={[24, 0]}>
                  {/* 个人信息 */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="realName"
                      label="真实姓名"
                      rules={[{ required: true, message: '请输入真实姓名' }]}
                    >
                      <Input placeholder="请输入真实姓名" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="phone"
                      label="手机号码"
                      rules={[
                        { required: true, message: '请输入手机号码' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
                      ]}
                    >
                      <Input placeholder="请输入手机号码" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label="邮箱地址"
                      rules={[
                        { required: true, message: '请输入邮箱地址' },
                        { type: 'email', message: '请输入正确的邮箱地址' }
                      ]}
                    >
                      <Input placeholder="请输入邮箱地址" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="organization"
                      label="所在单位/学校"
                    >
                      <Input placeholder="请输入所在单位或学校" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* 项目信息 */}
                <div className="mt-8">
                  <Title level={4} className="mb-4">
                    项目信息
                  </Title>
                  
                  <Form.Item
                    name="projectTitle"
                    label="项目名称"
                    rules={[{ required: true, message: '请输入项目名称' }]}
                  >
                    <Input placeholder="请输入您的项目名称" />
                  </Form.Item>
                  
                  <Form.Item
                    name="projectDescription"
                    label="项目描述"
                    rules={[{ required: true, message: '请输入项目描述' }]}
                  >
                    <TextArea 
                      rows={6} 
                      placeholder="请详细描述您的项目内容、创新点、实现方案等（建议500字以上）" 
                      showCount
                      maxLength={2000}
                    />
                  </Form.Item>
                </div>

                {/* 团队信息 */}
                <div className="mt-8">
                  <Title level={4} className="mb-4">
                    团队信息（可选）
                  </Title>
                  
                  <Form.Item
                    name="teamName"
                    label="团队名称"
                  >
                    <Input placeholder="如果是团队参赛，请输入团队名称" />
                  </Form.Item>
                  
                  <Form.Item
                    name="teamMembers"
                    label="团队成员"
                  >
                    <TextArea 
                      rows={4} 
                      placeholder="请列出团队成员姓名、职责分工等信息，每人一行" 
                    />
                  </Form.Item>
                </div>

                {/* 文件上传 */}
                <div className="mt-8">
                  <Title level={4} className="mb-4">
                    相关文件上传
                  </Title>
                  
                  <Form.Item
                    name="attachments"
                    label="项目材料"
                  >
                    <FileUpload
                      maxCount={5}
                      maxSize={10}
                      accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png"
                      onFileChange={handleFileChange}
                      title="上传项目相关文件"
                      description="支持 PDF、Word、压缩包、图片等格式，展示您的项目成果"
                    />
                  </Form.Item>
                </div>
              </Card>
            )}

            {/* 步骤3: 确认提交 */}
            {currentStep === 2 && (
              <Card className="shadow-lg border-0">
                <Title level={3} className="mb-6">
                  确认并提交报名
                </Title>
                
                <Alert
                  message="请仔细检查以下信息"
                  description="确认无误后点击提交，提交后将无法修改。我们将在工作日内对您的报名进行审核。"
                  type="warning"
                  showIcon
                  className="mb-6"
                />
                
                {/* 信息确认 */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <Title level={4} className="mb-4">报名信息确认</Title>
                  {/* 这里显示用户填写的信息概览 */}
                  <p>参赛赛道：{selectedTrack?.name}</p>
                  <p>项目名称：{form.getFieldValue('projectTitle')}</p>
                  <p>联系人：{form.getFieldValue('realName')}</p>
                  <p>联系电话：{form.getFieldValue('phone')}</p>
                  <p>邮箱地址：{form.getFieldValue('email')}</p>
                </div>
                
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[{ required: true, message: '请阅读并同意参赛协议' }]}
                >
                  <Checkbox>
                    我已阅读并同意
                    <Button type="link" className="p-0" onClick={() => setAgreementVisible(true)}>
                      《参赛协议》
                    </Button>
                  </Checkbox>
                </Form.Item>
              </Card>
            )}

            {/* 操作按钮 */}
            <Card className="shadow-lg border-0 mt-6">
              <div className="flex justify-between">
                <div>
                  {currentStep > 0 && (
                    <Button size="large" onClick={handlePrev}>
                      上一步
                    </Button>
                  )}
                </div>
                <div>
                  {currentStep < 2 ? (
                    <Button type="primary" size="large" onClick={handleNext}>
                      下一步
                    </Button>
                  ) : (
                    <Button 
                      type="primary" 
                      size="large" 
                      htmlType="submit"
                      loading={isSubmitting}
                      className="px-8"
                    >
                      提交报名
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </Form>
        </motion.div>

        {/* 协议弹窗 */}
        <Modal
          title="参赛协议"
          open={agreementVisible}
          onCancel={() => setAgreementVisible(false)}
          footer={[
            <Button key="close" onClick={() => setAgreementVisible(false)}>
              关闭
            </Button>
          ]}
          width={800}
        >
          <div className="max-h-96 overflow-y-auto text-sm leading-relaxed">
            <p className="font-semibold mb-4">参赛承诺书</p>
            <p>1. 我们承诺本次参赛作品均为原创作品，不存在任何形式的知识产权纠纷。</p>
            <p>2. 我们同意将参赛作品的相关信息提供给大赛组委会及相关机构进行评审。</p>
            <p>3. 如作品获奖，我们同意大赛主办方在相关宣传活动中使用作品信息。</p>
            <p>4. 我们保证所提供的个人信息真实有效，并愿意承担因信息不实导致的一切后果。</p>
            <p>5. 我们理解并遵守大赛的相关规定，服从评审结果。</p>
            <p>6. 本次参赛为公益性赛事，不收取任何报名费用。</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RegisterPage;