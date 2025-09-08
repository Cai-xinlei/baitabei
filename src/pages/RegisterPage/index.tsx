import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form, Select, Button, Card, Steps, Typography, Alert, Radio, message } from 'antd';
import { CheckCircleOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import type { RadioChangeEvent } from 'antd';
import { projectSubmit, projectDetail, updateProject } from '@/services/authService'
import { useNavigate } from 'react-router-dom';
import { TRACKS } from '@/constants';
import RegisterModal from './registerModal';
const { Title, Paragraph } = Typography;
const { Option } = Select;
import OrganizationForm from './organizationForm'
import IndividualForm from './individualForm'
import dayjs from 'dayjs';

const RegisterPage: React.FC<any> = (props: any) => {
  const { projectId, onClose } = props
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [agreementVisible, setAgreementVisible] = useState(projectId ? false : true);
  const [agreeCheck, setAgreeCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const trackId = form.getFieldValue("trackId")
  const [selectedTrackId, setSelectedTrackId] = useState(trackId || searchParams.get('track'))
  const selectedTrack = TRACKS.find(t => t.id === (trackId || selectedTrackId));
  const userInfo = JSON.parse(localStorage.getItem("user") ?? '{}');

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

  const taskIdMap = {
    'cultural_innovation': 1,
    "creative_design": 2,
    "business_model": 3,
    "social_innovation": 4,
    'communication_promotion': 5
  }

  // 提交表单
  const handleSubmit = async (values: any) => {
    const formValues = form.getFieldsValue(true);
    setIsSubmitting(true);
    try {
      let params: any = {
        projectName: formValues.projectTitle,
        trackId: taskIdMap[formValues?.trackId],
        trackJson: JSON.stringify(formValues),
      }
      let projectApi = null
      if (projectId) {
        projectApi = updateProject
        params.id = projectId
      } else {
        projectApi = projectSubmit

      }
      projectApi(params).then(res => {
        if (res.code === 200) {
          message.success(projectId ? `报名编辑成功` : "`报名提交成功`");
          if (projectId) {
            onClose(true)

          }
          setTimeout(() => {
            setCurrentStep(2);
            navigate('/profile');
          }, 2000);
        } else {
          message.error(res.message)
        }
      })
    } catch (error) {
      message.error('提交失败，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 下一步
  const handleNext = () => {
    if (!agreeCheck && !projectId) {

      setTimeout(() => {
        setAgreementVisible(true)
      }, 2000);
      return message.info('请阅读并同意《参赛承诺书》');
    }
    if (!userInfo?.id) {
      message.info('系统检测未登陆，即将跳转登陆页面')
      setTimeout(() => {
        navigate('/login')
      }, 1000);
      return
    } else {
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
    }
    window.scrollTo(0, 0);
  };

  // 上一步
  const handlePrev = () => {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    if (!projectId) return
    form.setFieldsValue({})
    projectDetail(projectId).then(res => {
      if (res.code === 200) {
        const trackJson = JSON.parse(JSON.stringify(res?.data?.trackJson || '{}'))
        form.setFieldsValue({
          ...trackJson,
          birthDate: dayjs(trackJson?.birthDate)

        })
      }
    })
  }, [projectId])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <Title level={2} className="mb-4">
            {projectId ? "编辑报名信息" : "参赛报名"}
          </Title>
          <Paragraph className="text-lg text-gray-600">
            2025第四届“白塔杯”文化创意大赛
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
                  initialValue={selectedTrackId}
                >
                  <Select
                    placeholder="请选择您要参加的赛道"
                    size="large"
                    onChange={(value) => {
                      form.resetFields();
                      setSelectedTrackId(value);
                      form.setFieldsValue(
                        {
                          'trackId': value
                        }
                      )
                    }}
                  >
                    {TRACKS.filter(track => track.status === 'open').map(track => (
                      <Option key={track.id} value={track.id}>
                        {track.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="reportType"
                  label=''
                  required
                  initialValue={'individual'}
                >
                  <Radio.Group buttonStyle="solid"
                    onChange={(e: RadioChangeEvent) => {
                      const trackId = form.getFieldValue('trackId');
                      // 重置所有表单字段
                      form.resetFields();
                      // 恢复需要保留的字段
                      form.setFieldsValue({
                        reportType: e.target.value,
                        trackId
                      });
                    }}
                  >
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
                  description="确认无误后点击提交，我们将在工作日内对您的报名进行审核。"
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
                    <>
                      <Button type="primary" size="large" onClick={handleNext}>
                        下一步
                      </Button>
                      {/* <Button type="primary" size="large" onClick={handleSubmit}>
                        测试用的按钮
                      </Button> */}
                    </>
                  ) : (
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      loading={isSubmitting}
                      className="px-8"
                    >
                      {projectId ? "更新报名信息" : "提交报名"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            {/* 协议弹窗 */}
            <RegisterModal
              agreementVisible={agreementVisible}
              setAgreementVisible={setAgreementVisible}
              setAgreeCheck={setAgreeCheck}
              form={form}
            />
          </Form>
        </motion.div>


      </div>
    </div>
  );
};

export default RegisterPage;