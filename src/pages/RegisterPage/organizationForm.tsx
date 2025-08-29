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
    Result
} from 'antd';
import {
    PlusOutlined,
    MinusCircleOutlined,
    UploadOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import FileUpload from '@/components/UI/FileUpload';

const { Title, Text } = Typography;
const { Option } = Select;

const trackOptions = [
    '文创产品开发赛道',
    '城市消费场景设计赛道',
    '文化消费内容创新赛道',
    '文商旅体科技创新应用赛道',
    '非遗创新转化应用赛道'
];

const App = ({ form }) => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const subjectType = Form.useWatch('subjectType', form);
    const useAI = Form.useWatch('useAI', form);

    const onFinish = (values) => {
        setSubmitting(true);
        console.log('表单数据:', values);

        // 模拟提交过程
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            message.success('作品提交成功！');
        }, 1500);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('校验失败:', errorInfo);
        message.error('请检查表单内容是否完整且符合要求');
    };

    const handleReset = () => {
        form.resetFields();
        setFileList([]);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const beforeUpload = (file) => {
        const isMp4 = file.type === 'video/mp4';
        const isLt1G = file.size / 1024 / 1024 < 1024;

        if (!isMp4) {
            message.error('请上传MP4格式的视频文件!');
        }
        if (!isLt1G) {
            message.error('视频文件大小不能超过1GB!');
        }

        return isMp4 && isLt1G;
    };

    const handlePreview = async (file) => {
        setPreviewUrl(file.url || file.preview);
        setPreviewOpen(true);
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
                <Title level={2} className="form-title">文创产品开发赛道征集报名表（单位/团队）</Title>
                {/* 作品名称 */}
                <Form.Item
                    label="作品名称"
                    name="projectTitle"
                    rules={[{ required: true, message: '请输入作品名称!' }]}
                >
                    <Input placeholder="请输入作品名称" />
                </Form.Item>
                {/* 报名主体 */}
                <Form.Item
                    label="报名主体"
                    name="subjectType"
                    initialValue={'单位'}
                    rules={[{ required: true, message: '请选择报名主体类型!' }]}
                >
                    <Radio.Group>
                        <Radio value="单位">单位 【政府机构、企事业单位（含学校）、社会团体】</Radio>
                        <Radio value="团队">团队（2人以上个人）</Radio>
                    </Radio.Group>
                </Form.Item>

                {/* 单位信息 */}
                {subjectType === '单位' && (
                    <>
                        <Divider orientation="left">单位信息</Divider>

                        <Form.Item
                            label="单位名称"
                            name="realName"
                            rules={[{ required: true, message: '请输入单位名称!' }]}
                        >
                            <Input placeholder="请输入单位名称" />
                        </Form.Item>

                        <Form.Item
                            label="负责人联系电话"
                            name="phone"
                            rules={[
                                { required: true, message: '请输入联系电话!' },
                                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码!' }
                            ]}
                        >
                            <Input placeholder="请输入联系电话" />
                        </Form.Item>

                        <Form.Item
                            label="单位统一社会信用代码"
                            name="orgCreditCode"
                            rules={[
                                { required: true, message: '请输入统一社会信用代码!' },
                                { pattern: /^[0-9A-Z]{18}$/, message: '请输入18位统一社会信用代码!' }
                            ]}
                        >
                            <Input placeholder="请输入统一社会信用代码" />
                        </Form.Item>

                        <Form.Item
                            label="是否为西城区注册企业"
                            name="isXichengRegistered"
                            initialValue={'是'}
                            rules={[{ required: true, message: '请选择是否为西城区注册企业!' }]}
                        >
                            <Radio.Group>
                                <Radio value="是">是</Radio>
                                <Radio value="否">否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </>
                )}

                {/* 团队信息 */}
                {subjectType === '团队' && (
                    <>
                        <Divider orientation="left">团队信息</Divider>

                        <Form.Item
                            label="团队名称"
                            name="realName"
                            rules={[{ required: true, message: '请输入团队名称!' }]}
                        >
                            <Input placeholder="请输入团队名称" />
                        </Form.Item>

                        <Form.Item
                            label="团队负责人联系电话"
                            name="phone"
                            rules={[
                                { required: true, message: '请输入联系电话!' },
                                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码!' }
                            ]}
                        >
                            <Input placeholder="请输入联系电话" />
                        </Form.Item>
                    </>
                )}

                {/* 团队成员 */}
                <Divider orientation="left">参赛单位成员</Divider>
                <p className="section-description">请添加所有参赛成员信息</p>

                <Form.List name="members">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Card key={key} size="small" className="member-card" style={
                                    {
                                        marginBottom: 16
                                    }
                                }>
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12} md={8}>
                                            <Form.Item
                                                {...restField}
                                                label="姓名"
                                                name={[name, 'name']}
                                                rules={[{ required: true, message: '请输入姓名' }]}
                                            >
                                                <Input placeholder="请输入姓名" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12} md={8}>
                                            <Form.Item
                                                {...restField}
                                                label="性别"
                                                name={[name, 'gender']}
                                                rules={[{ required: true, message: '请选择性别' }]}
                                            >
                                                <Select placeholder="请选择性别">
                                                    <Option value="男">男</Option>
                                                    <Option value="女">女</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12} md={8}>
                                            <Form.Item
                                                {...restField}
                                                label="年龄"
                                                name={[name, 'age']}
                                                rules={[
                                                    { required: true, message: '请输入年龄' },
                                                    // { type: 'number', min: 18, max: 80, message: '年龄应在18-80岁之间' }
                                                    { type: 'number' }
                                                ]}
                                            >
                                                <Input type="number" placeholder="请输入年龄" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12} md={8}>
                                            <Form.Item
                                                {...restField}
                                                label="职务"
                                                name={[name, 'position']}
                                                rules={[{ message: '请输入职务' }]}
                                            >
                                                <Input placeholder="请输入职务" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12} md={8}>
                                            <Form.Item
                                                {...restField}
                                                label="联系电话"
                                                name={[name, 'phone']}
                                                rules={[
                                                    { required: true, message: '请输入联系电话' },
                                                    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码!' }
                                                ]}
                                            >
                                                <Input placeholder="请输入联系电话" />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={12} md={8}>
                                            <Form.Item
                                                {...restField}
                                                label="身份证号码"
                                                name={[name, 'idCard']}
                                                rules={[
                                                    { required: true, message: '请输入身份证号码' },
                                                    {
                                                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                                        message: '请输入有效的身份证号码'
                                                    }
                                                ]}
                                            >
                                                <Input placeholder="请输入身份证号码" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <div className="member-actions">
                                        {fields.length > 1 && (
                                            <Button
                                                type="text"
                                                danger
                                                icon={<MinusCircleOutlined />}
                                                onClick={() => remove(name)}
                                            >
                                                移除此成员
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    disabled={fields.length >= 8}
                                    icon={<PlusOutlined />}
                                >
                                    添加成员
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                {/* AI工具使用情况 */}
                <Divider orientation="left">AI工具使用情况</Divider>

                <Form.Item
                    label="是否使用AI工具参与创作"
                    name="useAI"
                    rules={[{ required: true, message: '请选择是否使用AI工具!' }]}
                    initialValue={'是'}
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
                <Divider orientation="left">附件上传</Divider>
                <p className="section-description">
                    作品上传，视频大小50M以内，一次报名仅支持一个作品，多个作品需单独报名上传
                </p>

                <Form.Item
                    name="attachments"
                    label="项目材料"
                >
                    <FileUpload
                        maxCount={1}
                        maxSize={50}
                        accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png,.mp4"
                        // onFileChange={handleFileChange}
                        title="上传项目相关文件"
                        description="支持 PDF、Word、压缩包、图片等格式，展示您的项目成果"
                    />
                </Form.Item>
            </Card>
        </div>
    );
};

export default App;
