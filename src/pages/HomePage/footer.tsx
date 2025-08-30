import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import './footer.css';

const { Text, Paragraph } = Typography;

// 组织单位数据
const organizationData = [
    [
        {
            title: "主办单位",
            content: "北京市西城区人民政府"
        },
        {
            title: "承办单位",
            content: [
                "中共北京市西城区委宣传部",
                "北京市西城区文化产业发展促进中心"
            ]
        },
        {
            title: "特别支持单位",
            content: [
                "北京银行前门文创支行",
            ]
        }
    ],
    [
        {
            title: "执行单位",
            content: "北京天桥盛世投资集团有限责任公司"
        },

        {
            title: "赛道合作单位",
            content: [
                "超级玛特（北京）文化创意有限公司",
                "北京市在地设计咨询有限公司（四名汇智计划）",
                "理想都市（北京）文化科技发展有限公司",
                "中关村中恒文化科技创新服务联盟",
                "北京联合大学非遗学院",
            ]
        }
    ]
];

// 联系电话
const contactInfo = "咨询电话：15712909137 / 010-83160689";

// 大赛组织单位页面组件
const OrganizationPage = () => {
    return (
        <div className="organization-page bg-gray-900 text-white">
            <div className="content-container">
                {/* 左右两栏布局 */}
                <Row gutter={[0, 24]} className="organization-grid">
                    {/* 左侧栏 */}
                    <Col xs={24} lg={12} className="organization-column">
                        {organizationData[0].map((item, index) => (
                            <div key={index} className="organization-item">
                                <Text strong className="item-title">{item.title}:</Text>
                                <div className="item-content">
                                    {Array.isArray(item.content) ? (
                                        item.content.map((text, i) => (
                                            <Paragraph key={i} className="content-text">{text}</Paragraph>
                                        ))
                                    ) : (
                                        <Paragraph className="content-text">{item.content}</Paragraph>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Col>

                    {/* 分隔线 */}
                    <Col xs={0} lg={0}>

                        <Divider type="vertical" className="vertical-divider" />

                    </Col> {/* 右侧栏 */} <Col xs={24} lg={12} className="organization-column"> {organizationData[1].map((item, index) => (<div key={index} className="organization-item"> <Text strong className="item-title">{item.title}:</Text> <div className="item-content"> {Array.isArray(item.content) ? (item.content.map((text, i) => (<Paragraph key={i} className="content-text">{text}</Paragraph>))) : (<Paragraph className="content-text">{item.content}</Paragraph>)} </div> </div>))} </Col> </Row> </div> {/* 联系电话 */}
            <div className="contact-info">
                <Text className="contact-text">{contactInfo}</Text> </div> </div>);
}; export default OrganizationPage;