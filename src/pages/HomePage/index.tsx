import React from 'react';
import { Button, Card, Typography, Row, Col, Statistic, Timeline, Avatar } from 'antd';
import { TrophyOutlined, UserOutlined, CalendarOutlined, StarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TRACKS, TIMELINE, EXPERTS } from '../../constants';
import TrackCard from '../../components/UI/TrackCard';
import trackImages from '../../constants/imagesCover'
import CompetitionNewsModule from './competitionNews'
import CooperationPartners from './cooperationPartners'
import CompetitionIntroductionPage from './competitionIntroduction'
const { Title, Paragraph } = Typography;
import { customNewsData } from '../../constants/home'
const HomePage: React.FC = () => {
  // 统计数据
  const totalParticipants = TRACKS.reduce((sum, track) => sum + track.participantCount, 0);
  const openTracks = TRACKS.filter(track => track.status === 'open').length;

  return (
    <>
      <div className="min-h-screen">
        {/* 主横幅区域 */}
        <section
          className="relative h-[600px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(196, 30, 58, 0.8), rgba(47, 82, 51, 0.6)), url(${trackImages.trackBusiness})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/50 to-green-900/30" />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Title level={1} className="text-white text-4xl md:text-6xl font-bold mb-4">
                2025年第四届"白塔杯"
              </Title>
              <Title level={2} className="text-white text-2xl md:text-3xl font-medium mb-6">
                文化创意大赛
              </Title>
              <Paragraph className="text-white text-lg md:text-xl mb-8 opacity-90">
                文化引领·创意西城 | 聚焦"数字文化创新"与"消费新场景重构"
              </Paragraph>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/baitabei/register">
                  <Button type="primary" size="large" className="bg-yellow-500 border-yellow-500 hover:bg-yellow-600 text-lg px-8 py-3 h-auto">
                    立即报名
                  </Button>
                </Link>
                <Link to="/baitabei/tracks">
                  <Button size="large" className="border-white hover:bg-white hover:text-red-600 text-lg px-8 py-3 h-auto">
                    了解赛道
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <CompetitionIntroductionPage />
        {/* 统计数据区域 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <Row gutter={[32, 32]} className="text-center">
              <Col xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Statistic
                    title="总报名人数"
                    value={totalParticipants}
                    suffix="人"
                    valueStyle={{ color: '#C41E3A', fontSize: '2rem', fontWeight: 'bold' }}
                    prefix={<UserOutlined />}
                  />
                </motion.div>
              </Col>
              <Col xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Statistic
                    title="开放赛道"
                    value={openTracks}
                    suffix="个"
                    valueStyle={{ color: '#2F5233', fontSize: '2rem', fontWeight: 'bold' }}
                    prefix={<TrophyOutlined />}
                  />
                </motion.div>
              </Col>
              <Col xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Statistic
                    title="最高奖金"
                    value={50000}
                    suffix="元"
                    valueStyle={{ color: '#FFD700', fontSize: '2rem', fontWeight: 'bold' }}
                    prefix={<StarOutlined />}
                  />
                </motion.div>
              </Col>
              <Col xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Statistic
                    title="报名截止"
                    value="10月31日"
                    valueStyle={{ color: '#1890ff', fontSize: '1.5rem', fontWeight: 'bold' }}
                    prefix={<CalendarOutlined />}
                  />
                </motion.div>
              </Col>
            </Row>
          </div>
        </section>

        {/* 六大赛道展示 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2} className="text-3xl font-bold mb-4">
                六大赛道 · 精彩纷呈
              </Title>
              <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
                涵盖创意设计、技术创新、文化传播、商业模式、社会公益、综合创新六大领域，
                为不同专业背景的参赛者提供展示平台
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
              {TRACKS.map((track, index) => (
                <Col xs={24} md={12} lg={8} key={track.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TrackCard track={track} />
                  </motion.div>
                </Col>
              ))}
            </Row>

            <div className="text-center mt-12">
              <Link to="/baitabei/tracks">
                <Button type="primary" size="large" className="px-8">
                  查看全部赛道
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <CompetitionNewsModule
          newsData={customNewsData}
          posterConfig={{ title: "2025白塔杯创新大赛" }}
        // loading={isLoading}
        />

        {/* 赛事进程时间轴 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2} className="text-3xl font-bold mb-4">
                赛事进程
              </Title>
              <Paragraph className="text-lg text-gray-600">
                2025年9月至12月，四个月精彩赛程
              </Paragraph>
            </div>

            <Row gutter={[32, 32]}>
              <Col xs={24} lg={12}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
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
                          {/* <p className="text-gray-600 mb-2">{event.description}</p> */}
                          {/* <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p> */}
                          <p className="text-sm text-gray-500">{event.date}</p>
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
                  <img
                    src={trackImages.trackBusiness}
                    alt="白塔"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </motion.div>
              </Col>
            </Row>
          </div>
        </section>

        {/* 专家评委 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2} className="text-3xl font-bold mb-4">
                专家评委
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
                        size={120}
                        src={expert.avatar}
                        className="mx-auto mb-4"
                      />
                      <Title level={4} className="mb-2">{expert.name}</Title>
                      <p className="text-gray-600 mb-2">{expert.title}</p>
                      <p className="text-sm text-gray-500 mb-4">{expert.organization}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{expert.bio}</p>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </section>
        <CooperationPartners />
        {/* CTA区域 */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Title level={2} className="text-white text-3xl font-bold mb-4">
                准备好展示你的创意了吗？
              </Title>
              <Paragraph className="text-white text-lg mb-8 opacity-90">
                加入2025年第四届白塔杯文化创意大赛，与全国优秀创意人才同台竞技，
                赢取丰厚奖金和发展机会！
              </Paragraph>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/baitabei/register">
                  <Button type="primary" size="large" className="bg-yellow-500 border-yellow-500 hover:bg-yellow-600 text-lg px-8 py-3 h-auto">
                    立即报名参赛
                  </Button>
                </Link>
                <Link to="/baitabei/tracks">
                  <Button size="large" className="border-white hover:bg-white hover:text-red-600 text-lg px-8 py-3 h-auto">
                    了解赛道
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;