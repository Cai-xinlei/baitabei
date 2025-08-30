import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Input, Select, Button, Card, Steps, Row, Col, Typography, Alert, Radio, Checkbox, message } from 'antd';
import { CheckCircleOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import type { RadioChangeEvent } from 'antd';

import { TRACKS, PromiseBook } from '@/constants';
import FileUpload from '@/components/UI/FileUpload';
import RegisterModal from './registerModal';
import StepTwo from './stepTwo'
const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
import OrganizationForm from './organizationForm'
import IndividualForm from './individualForm'
const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [agreementVisible, setAgreementVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportType, setreportType] = useState<string>('individual')
  const [selectedTrackId, setSelectedTrackId] = useState(searchParams.get('track'))
  const selectedTrack = TRACKS.find(t => t.id === selectedTrackId);
  const [forminfo, setForminfo] = useState({})
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



  // 提交表单
  const handleSubmit = async (values: any) => {
    console.log(form.getFieldsValue(true), '打印信息')
    return
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
  console.log(form.getFieldValue('reportType'), '222');

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
                    onChange={(value) => setSelectedTrackId(value)}
                  >
                    {TRACKS.filter(track => track.status === 'open').map(track => (
                      <Option key={track.id} value={track.id}>
                        {/* <div className="py-2">
                          <div className="font-semibold">{track.name}</div>
                          <div className="text-sm text-gray-500">{track.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            已报名: {track.participantCount}人 | 截止: {new Date(track.deadline).toLocaleDateString()}
                          </div>
                        </div> */}
                        {track.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {/* 
                {selectedTrack && (
                  <Alert
                    message={`已选择: ${selectedTrack.name}`}
                    description={selectedTrack.detailDescription}
                    type="info"
                    showIcon
                    className="mt-4"
                    style={{ marginBottom: 16 }}
                  />
                )} */}
                <Form.Item
                  name="reportType"
                  label="文创产品开发赛道征集报名表"
                  required
                  initialValue={reportType}
                >
                  <Radio.Group buttonStyle="solid" onChange={(e: RadioChangeEvent) => setreportType(e.target.value)} >
                    <Radio.Button value="individual">个人</Radio.Button>
                    <Radio.Button value="organization">单位/团体</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Alert message={
                  <div>
                    <p style={{ fontWeight: 700 }}>注意事项</p>
                    <p>单位 【政府机构、企事业单位（含学校）、社会团体】</p>
                    <p>团队（2人以上个人）</p>
                  </div>
                }
                  type="warning"
                  style={{ marginBottom: 16 }}

                />
              </Card>
            )}

            {/* 步骤2: 填写信息 */}
            {currentStep === 1 && <>
              {
                form.getFieldValue('reportType') === 'individual' ? <IndividualForm form={form} /> :
                  <OrganizationForm form={form} />
              }
            </>}

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
                  <p>作品名称：{form.getFieldValue('projectTitle')}</p>
                  <p>联系人：{form.getFieldValue('realName')}</p>
                  <p>联系电话：{form.getFieldValue('phone')}</p>
                </div>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[{ required: true, message: '请阅读并同意选手报名承诺书' }]}
                >
                  <Checkbox>
                    我已阅读并同意
                    <Button type="link" className="p-0" onClick={() => setAgreementVisible(true)}>
                      《选手报名承诺书》
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
        <RegisterModal
          agreementVisible={agreementVisible}
          setAgreementVisible={setAgreementVisible}
        />
      </div>
    </div>
  );
};

export default RegisterPage;