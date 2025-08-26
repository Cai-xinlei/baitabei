import React from 'react';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import { TrophyOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { TRACKS } from '../constants';
import TrackCard from '../components/UI/TrackCard';

const { Title, Paragraph } = Typography;

const TracksPage: React.FC = () => {
  // 统计数据
  const totalParticipants = TRACKS.reduce((sum, track) => sum + track.participantCount, 0);
  const openTracks = TRACKS.filter(track => track.status === 'open').length;
  const totalCapacity = TRACKS.reduce((sum, track) => sum + (track.maxParticipants || 0), 0);

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
              六大赛道设置
            </Title>
            <Paragraph className="text-white text-lg opacity-90 max-w-3xl mx-auto">
              遵循“文化创意解码-场景创新构建－内容生态升级－数字科技赋能”的立体化发展路径，共设置五大赛道
            </Paragraph>
          </motion.div>
        </div>
      </section>

      {/* 统计数据 */}
      {/* <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={8}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="text-center border-0 shadow-lg">
                  <Statistic
                    title="总报名人数"
                    value={totalParticipants}
                    suffix="人"
                    valueStyle={{ color: '#C41E3A', fontSize: '2rem' }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} sm={8}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="text-center border-0 shadow-lg">
                  <Statistic
                    title="开放赛道"
                    value={openTracks}
                    suffix="个"
                    valueStyle={{ color: '#2F5233', fontSize: '2rem' }}
                    prefix={<TrophyOutlined />}
                  />
                </Card>
              </motion.div>
            </Col>
            <Col xs={24} sm={8}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="text-center border-0 shadow-lg">
                  <Statistic
                    title="总容量"
                    value={totalCapacity}
                    suffix="人"
                    valueStyle={{ color: '#FFD700', fontSize: '2rem' }}
                    prefix={<CalendarOutlined />}
                  />
                </Card>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section> */}

      {/* 赛道列表 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2} className="text-3xl font-bold mb-4">
              选择您的赛道
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              请根据您的专业背景和项目特点选择最适合的赛道
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
        </div>
      </section>

      {/* 赛道对比 */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2} className="text-3xl font-bold mb-4">
              赛道特色对比
            </Title>
            <Paragraph className="text-lg text-gray-600">
              了解各赛道的特点，选择最适合您的参赛方向
            </Paragraph>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">赛道名称</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">报名人数</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">容量上限</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">竞争激烈度</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900">状态</th>
                </tr>
              </thead>
              <tbody>
                {TRACKS.map((track, index) => {
                  const fillRate = track.maxParticipants ?
                    (track.participantCount / track.maxParticipants) * 100 : 0;
                  const competition = fillRate > 80 ? '激烈' : fillRate > 50 ? '中等' : '相对宽松';
                  const competitionColor = fillRate > 80 ? 'text-red-600' :
                    fillRate > 50 ? 'text-yellow-600' : 'text-green-600';

                  return (
                    <motion.tr
                      key={track.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{track.name}</div>
                        <div className="text-sm text-gray-500">{track.description}</div>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">
                        {track.participantCount}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {track.maxParticipants || '不限'}
                      </td>
                      <td className={`px-6 py-4 text-center font-medium ${competitionColor}`}>
                        {competition}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${track.status === 'open' ? 'bg-green-100 text-green-800' :
                          track.status === 'full' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {track.status === 'open' ? '开放' :
                            track.status === 'full' ? '已满' : '关闭'}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default TracksPage;