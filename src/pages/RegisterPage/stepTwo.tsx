import { Form, Input, Select, Button, Card, Steps, Row, Col, Typography, Alert, Radio, Checkbox, message } from 'antd';
import FileUpload from '@/components/UI/FileUpload';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;



export default ({ form }) => {

    // 文件上传变化处理
    const handleFileChange = (files: any[]) => {
        form.setFieldsValue({ attachments: files });
    };
    return (
        <Card className="shadow-lg border-0">
            <Title level={3} className="mb-6">
                填写参赛信息
            </Title>

            <Row gutter={[24, 0]}>
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
    )
}