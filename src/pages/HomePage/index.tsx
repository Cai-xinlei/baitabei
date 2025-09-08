import React from 'react';
import { Button, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TRACKS } from '../../constants';
import TrackCard from '../../components/UI/TrackCard';
import trackImages from '../../constants/imagesCover';
import CompetitionNewsModule from './CompetitionNews';
import CompetitionIntroductionPage from './CompetitionIntroduction';
import { customNewsData } from '../../constants/home';
import ExpertList from './ExpertList/index';
import CompetitionSchedule from './CompetitionSchedule/index';
import SetAward from './SetAward/index';
import TitleWithLines from '@/components/TitleWithLines'
import './index.css'
const HomePage: React.FC = () => {

  return (
    <>
      <div className="min-h-screen">
        {/* 主横幅区域 */}
        <section
          className='homeBackaground'
        >
          <img src={trackImages.homebg} className='imgContainer' />
        </section>
        <section
          style={{
            backgroundImage: `url(${trackImages.homeBackground})`,
            backgroundSize: 'cover',
            width: '100%',
          }}>
          {/* 一、大赛介绍 */}
          <CompetitionIntroductionPage />
          {/* 二、大赛进程 */}
          <CompetitionSchedule />
          {/* 三、大赛专家 */}
          <ExpertList />
          {/* 四、奖项设置｜｜五、大赛服务包 */}
          <SetAward />
          {/* 六、赛道设置 */}
          <section >
            <div className="max-w-7xl mx-auto px-6" >
              <TitleWithLines text={'五大赛道'} />
              <Row gutter={[24, 24]} style={{ justifyContent: 'center', display: 'flex', marginTop: '12px' }}>
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
              <div className="text-center mt-8">
                <Link to="/tracks">
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
          <section className="py-8 bg-gradient-to-r">
            <div className="max-w-4xl mx-auto text-center px-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button type="primary" size="large">
                      立即报名
                    </Button>
                  </Link>
                  <Link to="/tracks">
                    <Button size="large">
                      了解赛道
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </section>
      </div >
    </>
  );
};

export default HomePage;