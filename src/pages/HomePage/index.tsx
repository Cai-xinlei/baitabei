import React from 'react';
import { Button, Card, Typography, Row, Col, Statistic, Timeline, Avatar } from 'antd';
import { TrophyOutlined, UserOutlined, CalendarOutlined, StarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TRACKS, TIMELINE, EXPERTS } from '../../constants';
import TrackCard from '../../components/UI/TrackCard';
import trackImages from '../../constants/imagesCover';
import CompetitionNewsModule from './CompetitionNews';
import ComperationPartners from './ComperationPartners';
import CompetitionIntroductionPage from './competitionIntroduction';
import CompetitionSetPage from './competitionSet';
import { customNewsData } from '../../constants/home';
import ExpertList from './ExpertList/index';
import CompetitionSchedule from './CompetitionSchedule/index';
import SetAward from './SetAward/index';
import TitleWithLines from '@/components/TitleWithLines'

const { Title, Paragraph } = Typography;
const HomePage: React.FC = () => {
  // 统计数据
  const totalParticipants = TRACKS.reduce((sum, track) => sum + track.participantCount, 0);
  const openTracks = TRACKS.filter(track => track.status === 'open').length;

  return (
    <>
      <div className="min-h-screen">
        {/* 主横幅区域 */}
        <section
        // className="relative flex items-center justify-center overflow-hidden"
        // style={{
        //   backgroundImage: `url(${trackImages.homebg})`,
        //   backgroundSize: 'cover',
        //   width: '100%',
        //   height: '600px'
        // }}
        >
          <img src={trackImages.homebg} />
        </section>
        {/* 一、大赛介绍 */}
        <CompetitionIntroductionPage />
        {/* 二、大赛进程 */}

        <CompetitionSchedule />
        {/* 三、大赛专家 */}
        <ExpertList />
        {/* 四、奖项设置｜｜五、大赛服务包 */}
        <SetAward />
        {/* <CompetitionSetPage /> */}
        {/* 统计数据区域 */}
        {/* <section className="py-16 bg-white">
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
        </section> */}

        {/* 六、赛道设置 */}
        <section className="py-16 bg-gray-50" style={{ background: "#fff" }}>
          <div className="max-w-7xl mx-auto px-4">
            <TitleWithLines text={'五大赛道'} />

            <Row gutter={[24, 24]} style={{ marginTop: 50, justifyContent: 'center', display: 'flex' }}>
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
        {/* 七、大赛资讯 */}
        <CompetitionNewsModule
          newsData={customNewsData}
          posterConfig={{ title: "2025白塔杯创新大赛" }}
        // loading={isLoading}
        />
        {/* 八、大赛支持单位 */}
        <ComperationPartners />
        {/* CTA区域 */}

        <section className="py-12 bg-gradient-to-r" style={{ background: "#fff" }}>
          <div className="max-w-4xl mx-auto text-center px-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* <Title level={2} className="text-white text-3xl font-bold mb-4">
                准备好展示你的创意了吗？
              </Title>
              <Paragraph className="text-white text-lg mb-8 opacity-90">
                加入2025年第四届白塔杯文化创意大赛，与全国优秀创意人才同台竞技，
                赢取丰厚奖金和发展机会！
              </Paragraph> */}
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