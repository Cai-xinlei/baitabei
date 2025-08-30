import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Radio,
    Button,
    Card,
    Space,
    Row,
    Col,
    Typography,
    Divider,
    Upload,
    message,
    Result,
    Checkbox,
    DatePicker
} from 'antd';
import {
    PlusOutlined,
    UploadOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import FileUpload from '@/components/UI/FileUpload';

const { Title, Text } = Typography;
const { Option } = Select;

const educationOptions = [
    '高中/中专',
    '大专',
    '本科',
    '硕士',
    '博士',
    '其他'
];

const IndividualForm = ({ form }) => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [agreePolicy, setAgreePolicy] = useState(false);
    const useAI = Form.useWatch('useAI', form);

    const onFinishFailed = (errorInfo) => {
        console.log('校验失败:', errorInfo);
        message.error('请检查表单内容是否完整且符合要求');
    };

    const handleReset = () => {
        form.resetFields();
        setFileList([]);
        setAgreePolicy(false);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file) => {
        const isVideo = file.type === 'video/mp4' || file.type === 'video/quicktime';
        const isLt1G = file.size / 1024 / 1024 < 1024;

        if (!isVideo) {
            message.error('请上传MP4或MOV格式的视频文件!');
        }
        if (!isLt1G) {
            message.error('视频文件大小不能超过1GB!');
        }

        return isVideo && isLt1G;
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    if (submitted) {
        return (
            <div className="result-container">
                <Result
                    status="success"
                    title="作品提交成功!"
                    subTitle="您的作品已成功提交，我们将尽快审核并与您联系。"
                    extra={[
                        <Button type="primary" key="again" onClick={() => setSubmitted(false)}>
                            继续提交新作品
                        </Button>
                    ]}
                />
            </div>
        );
    }

    return (
        <div className="form-container">
            <Card className="form-card">
                <Title level={2} className="form-title">文创产品开发赛道征集报名表（个人）</Title>
                {/* 作品名称 */}
                <Divider orientation="left">作品信息</Divider>
                <Form.Item
                    label="作品名称"
                    name="projectTitle"
                    rules={[{ required: true, message: '请输入作品名称!' }]}
                >
                    <Input placeholder="请输入作品名称" />
                </Form.Item>

                {/* 参赛者概况 */}
                <Divider orientation="left">参赛者概况</Divider>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="姓名"
                            name="realName"
                            rules={[{ required: true, message: '请输入姓名!' }]}
                        >
                            <Input placeholder="请输入姓名" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="性别"
                            name="gender"
                            rules={[{ required: true, message: '请选择性别!' }]}
                        >
                            <Select placeholder="请选择性别">
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="出生年月"
                            name="birthDate"
                            rules={[{ required: true, message: '请选择出生年月!' }]}
                        >
                            <DatePicker
                                placeholder="请选择出生年月"
                                picker="month"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="联系电话"
                            name="phone"
                            rules={[
                                { required: true, message: '请输入联系电话!' },
                                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码!' }
                            ]}
                        >
                            <Input placeholder="请输入联系电话" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="工作单位（学生填在读学校）"
                    name="workUnit"
                    rules={[{ required: true, message: '请输入工作单位或在读学校!' }]}
                >
                    <Input placeholder="请输入工作单位或在读学校" />
                </Form.Item>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="所学专业"
                            name="major"
                            rules={[{ message: '请输入所学专业!' }]}
                        >
                            <Input placeholder="学生请输入所学专业" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="学历"
                            name="education"
                            rules={[{ message: '请选择学历!' }]}
                        >
                            <Select placeholder="请选择学历">
                                {educationOptions.map((education) => (
                                    <Option key={education} value={education}>
                                        {education}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="身份证号码"
                    name="idCard"
                    rules={[
                        { required: true, message: '请输入身份证号码!' },
                        {
                            pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                            message: '请输入有效的身份证号码'
                        }
                    ]}
                >
                    <Input placeholder="请输入身份证号码" />
                </Form.Item>

                {/* AI工具使用情况 */}
                <Divider orientation="left">AI工具使用情况</Divider>

                <Form.Item
                    label="是否使用AI工具参与创作"
                    name="useAI"
                    rules={[{ required: true, message: '请选择是否使用AI工具!' }]}
                >
                    <Radio.Group>
                        <Radio value="是">是</Radio>
                        <Radio value="否">否</Radio>
                    </Radio.Group>
                </Form.Item>

                {useAI === '是' && (
                    <Form.Item
                        label="备注（请注明所使用AI模型具体名称和使用程度）"
                        name="aiRemark"
                        rules={[{ required: true, message: '请填写AI工具使用说明!' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="请详细说明使用的AI模型名称和在创作中的具体应用程度"
                        />
                    </Form.Item>
                )}
                {/* 作品简介 */}
                <Divider orientation="left">作品介绍</Divider>

                <Form.Item
                    label="作品简介"
                    name="workDescription"
                    rules={[
                        { required: true, message: '请输入作品简介!' },
                        { max: 500, message: '作品简介不能超过500字' }
                    ]}
                >
                    <Input.TextArea
                        rows={6}
                        placeholder="填写创作思路，不超过200字。"
                        showCount
                        maxLength={200}
                    />
                </Form.Item>

                {/* 视频上传 */}
                <Divider orientation="left">项目资料上传</Divider>
                <Form.Item
                    name="attachments"
                    label=""
                >
                    <FileUpload
                        maxCount={1}
                        maxSize={50}
                        accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png,.mp4"
                        // onFileChange={handleFileChange}
                        title="上传项目相关文件"
                        description="支持 PDF、Word、压缩包、图片、Mp4等格式，展示您的项目成果"
                    />
                </Form.Item>
            </Card>
        </div>
    );
};

export default IndividualForm;
