import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Card, Row, Col, Tag, Timeline, Divider, Alert } from 'antd';
import { ArrowLeftOutlined, TrophyOutlined, UserOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { TRACKS } from '../constants';

const { Title, Paragraph } = Typography;

const TrackDetailPage: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const track = TRACKS.find(t => t.id === trackId);

  if (!track) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <Title level={3}>赛道不存在</Title>
          <Paragraph>请检查链接是否正确</Paragraph>
          <Link to="/baitabei/tracks">
            <Button type="primary">返回赛道列表</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const progressPercentage = track.maxParticipants ?
    Math.round((track.participantCount / track.maxParticipants) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回按钮 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/baitabei/tracks" className="inline-flex items-center text-gray-600 hover:text-red-600">
            <ArrowLeftOutlined className="mr-2" />
            返回赛道列表
          </Link>
        </div>
      </div>

      {/* 赛道头部 */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${track.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title level={1} className="text-white text-4xl font-bold mb-4">
              {track.name}
            </Title>
            <Paragraph className="text-white text-lg mb-6 opacity-90">
              {track.description}
            </Paragraph>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <UserOutlined className="mr-2" />
                已报名：{track.participantCount}人
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CalendarOutlined className="mr-2" />
                截止：{new Date(track.deadline).toLocaleDateString()}
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <TrophyOutlined className="mr-2" />
                奖项：{track.awards.length}个
              </div>
            </div>
            {track.status === 'open' && (
              <Link to={`/baitabei/register?track=${track.id}`}>
                <Button type="primary" size="large" className="bg-yellow-500 border-yellow-500 hover:bg-yellow-600 px-8">
                  立即报名此赛道
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* 详细信息 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            {/* 左侧主要内容 */}
            <Col xs={24} lg={16}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="mb-8 shadow-lg border-0">
                  <Title level={3} className="mb-4">
                    赛道介绍
                  </Title>
                  <Paragraph className="text-gray-700 leading-relaxed text-base">
                    {track.detailDescription}
                  </Paragraph>
                </Card>

                <Card className="mb-8 shadow-lg border-0">
                  <Title level={3} className="mb-4">
                    参赛要求
                  </Title>
                  <Timeline
                    items={track.requirements.map((requirement, index) => ({
                      dot: <CheckCircleOutlined className="text-green-500" />,
                      children: (
                        <div className="text-gray-700">
                          {requirement}
                        </div>
                      )
                    }))}
                  />
                </Card>

                <Card className="shadow-lg border-0">
                  <Title level={3} className="mb-4">
                    奖项设置
                  </Title>
                  <Row gutter={[16, 16]}>
                    {track.awards.map((award, index) => (
                      <Col xs={24} sm={12} md={8} key={index}>
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                          <TrophyOutlined className="text-yellow-600 text-xl mb-2" />
                          <div className="font-semibold text-gray-800">{award}</div>
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <Divider />

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <Title level={5} className="text-blue-800 mb-2">
                      获奖福利
                    </Title>
                    <ul className="text-blue-700 space-y-1 mb-0">
                      <li>办公场地租金折扣</li>
                      <li>媒体宣传机会</li>
                      <li>优先对接政府采购项目</li>
                      <li>参加企业特色交流活动优先权</li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </Col>

            {/* 右侧边栏 */}
            <Col xs={24} lg={8}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-24"
              >
                {/* 报名状态 */}
                <Card className="mb-6 shadow-lg border-0">
                  <Title level={4} className="mb-4">
                    报名状态
                  </Title>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">当前状态</span>
                      <Tag color={track.status === 'open' ? 'green' : track.status === 'full' ? 'orange' : 'red'}>
                        {track.status === 'open' ? '报名开放' :
                          track.status === 'full' ? '报名已满' : '报名关闭'}
                      </Tag>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">已报名人数</span>
                      <span className="font-semibold">{track.participantCount}人</span>
                    </div>

                    {track.maxParticipants && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">容量上限</span>
                        <span className="font-semibold">{track.maxParticipants}人</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">报名截止</span>
                      <span className="font-semibold">
                        {new Date(track.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {track.maxParticipants && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">报名进度</span>
                        <span className="text-sm font-medium">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${progressPercentage > 80 ? 'bg-red-500' :
                            progressPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </Card>

                {/* 重要提醒 */}
                <Card className="mb-6 shadow-lg border-0">
                  <Title level={4} className="mb-4">
                    重要提醒
                  </Title>

                  <Alert
                    message="报名截止时间"
                    description={`距离报名截止还有 ${Math.ceil((new Date(track.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} 天`}
                    type="warning"
                    showIcon
                    className="mb-4"
                  />

                  <Alert
                    message="竞争激烈度"
                    description={progressPercentage > 80 ? '竞争激烈，建议尽快报名' :
                      progressPercentage > 50 ? '竞争中等，还有机会' : '竞争相对宽松'}
                    type={progressPercentage > 80 ? 'error' : progressPercentage > 50 ? 'warning' : 'success'}
                    showIcon
                  />
                </Card>

                {/* 立即报名 */}
                {track.status === 'open' && (
                  <Card className="shadow-lg border-0 text-center">
                    <Title level={4} className="mb-4">
                      准备好了吗？
                    </Title>
                    <Paragraph className="text-gray-600 mb-4">
                      立即报名参加{track.name}，展示您的创意才华！
                    </Paragraph>
                    <Link to={`/baitabei/register?track=${track.id}`}>
                      <Button type="primary" size="large" block className="h-12 text-lg">
                        立即报名
                      </Button>
                    </Link>
                  </Card>
                )}
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default TrackDetailPage;