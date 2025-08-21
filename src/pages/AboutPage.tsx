import React from 'react';
import { Typography, Card, Row, Col, Timeline, Statistic, Divider, Avatar } from 'antd';
import { TrophyOutlined, TeamOutlined, BankOutlined, StarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { TIMELINE, EXPERTS } from '../constants';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title level={1} className="text-white text-4xl font-bold mb-4">
              关于白塔杯
            </Title>
            <Paragraph className="text-white text-lg opacity-90 max-w-3xl mx-auto">
              了解大赛的历史、使命与愿景，感受文化创意的力量与魅力
            </Paragraph>
          </motion.div>
        </div>
      </section>

      {/* 大赛介绍 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[48, 32]}>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Title level={2} className="mb-6">
                  大赛由来
                </Title>
                <Paragraph className="text-gray-700 leading-relaxed text-base mb-4">
                  “白塔杯”文化创意大赛由北京市西城区人民政府主办，自2022年起已成功举办三届，
                  成为北京地区最具影响力的文化创意赛事之一。
                </Paragraph>
                <Paragraph className="text-gray-700 leading-relaxed text-base mb-4">
                  大赛以“文化引领·创意西城”为核心理念，致力于挖掘和展示优秀的文化创意作品，
                  促进文化产业的发展和创新。
                </Paragraph>
                <Paragraph className="text-gray-700 leading-relaxed text-base">
                  2025年第四届大赛将重点聚焦“数字文化创新”与“消费新场景重构”两大方向，
                  推动传统文化与现代科技的深度融合。
                </Paragraph>
              </motion.div>
            </Col>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/images/white-tower.jpg"
                  alt="北京白塔"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 大赛数据 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2} className="mb-4">
              大赛数据
            </Title>
            <Paragraph className="text-lg text-gray-600">
              三届以来的辉煌成果
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            <Col xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="text-center border-0 shadow-lg">
                  <Statistic
                    title="累计参赛人数"
                    value={15000}
                    suffix="+"
                    valueStyle={{ color: '#C41E3A', fontSize: '2rem' }}
                    prefix={<TeamOutlined />}
                  />
                </Card>
              </motion.div>
            </Col>
            <Col xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="text-center border-0 shadow-lg">
                  <Statistic
                    title="获奖项目"
                    value={500}
                    suffix="+"
                    valueStyle={{ color: '#2F5233', fontSize: '2rem' }}
                    prefix={<TrophyOutlined />}
                  />
                </Card>
              </motion.div>
            </Col>
            <Col xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="text-center border-0 shadow-lg">
                  <Statistic
                    title="合作机构"
                    value={100}
                    suffix="+"
                    valueStyle={{ color: '#FFD700', fontSize: '2rem' }}
                    prefix={<BankOutlined />}
                  />
                </Card>
              </motion.div>
            </Col>
            <Col xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="text-center border-0 shadow-lg">
                  <Statistic
                    title="媒体关注"
                    value={1000}
                    suffix="+篇"
                    valueStyle={{ color: '#1890ff', fontSize: '2rem' }}
                    prefix={<StarOutlined />}
                  />
                </Card>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 组织架构 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2} className="mb-4">
              组织架构
            </Title>
            <Paragraph className="text-lg text-gray-600">
              权威机构主办，专业团队执行
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full shadow-lg border-0">
                  <Title level={4} className="text-center mb-4 text-red-600">
                    主办单位
                  </Title>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 北京市西城区人民政府</li>
                  </ul>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full shadow-lg border-0">
                  <Title level={4} className="text-center mb-4 text-green-600">
                    承办单位
                  </Title>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 中共北京市西城区委宣传部</li>
                    <li>• 北京市西城区文化产业发展促进中心</li>
                  </ul>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full shadow-lg border-0">
                  <Title level={4} className="text-center mb-4 text-blue-600">
                    执行单位
                  </Title>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>北京天桥盛世投资集团有限责任公司</li>
                  </ul>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 专家团队 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2} className="mb-4">
              专家评委团
            </Title>
            <Paragraph className="text-lg text-gray-600">
              汇聚行业顶尖专家，确保评审的专业性和权威性
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} justify="center">
            {EXPERTS.map((expert, index) => (
              <Col xs={24} sm={12} md={8} key={expert.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                    <Avatar
                      size={100}
                      src={expert.avatar}
                      className="mx-auto mb-4"
                    />
                    <Title level={4} className="mb-2">{expert.name}</Title>
                    <p className="text-gray-600 mb-2">{expert.title}</p>
                    <p className="text-sm text-gray-500 mb-4">{expert.organization}</p>
                    <div className="mb-4">
                      {expert.expertise.map((skill, idx) => (
                        <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{expert.bio}</p>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 赛事进程 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[48, 32]}>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Title level={2} className="mb-6">
                  2025年赛事进程
                </Title>
                <Timeline
                  mode="left"
                  items={TIMELINE.map(event => ({
                    dot: event.status === 'current' ?
                      <div className="w-4 h-4 bg-red-500 rounded-full border-4 border-red-200 animate-pulse" /> :
                      <div className={`w-3 h-3 rounded-full ${event.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                        }`} />,
                    children: (
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                        <p className="text-gray-600 mb-2">{event.description}</p>
                        <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    )
                  }))}
                />
              </motion.div>
            </Col>

            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full shadow-lg border-0">
                  <Title level={3} className="mb-4">
                    联系我们
                  </Title>

                  <div className="space-y-4">
                    <div>
                      <Title level={5} className="mb-2 text-gray-700">咨询电话</Title>
                      <p className="text-gray-600">15712909137</p>
                      <p className="text-gray-600">010-83160689</p>
                    </div>

                    <Divider />

                    <div>
                      <Title level={5} className="mb-2 text-gray-700">工作时间</Title>
                      <p className="text-gray-600">工作日 9:00-18:00</p>
                    </div>

                    <Divider />

                    <div>
                      <Title level={5} className="mb-2 text-gray-700">地址</Title>
                      <p className="text-gray-600">北京市西城区</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;