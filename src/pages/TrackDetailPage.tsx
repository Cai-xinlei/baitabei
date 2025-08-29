import React, { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Card, Row, Col, Tag, Timeline, Divider, Alert } from 'antd';
import { ArrowLeftOutlined, TrophyOutlined, UserOutlined, CalendarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { TRACKS } from '../constants';

const { Title, Paragraph } = Typography;

const TrackDetailPage: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  console.log(trackId, 'trackId');
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

  const renderOrganization = (organize) => {
    if (organize?.length) {
      return organize?.map((v, index) => (
        <Paragraph key={index} className="text-gray-700 leading-relaxed text-base">
          {v}
        </Paragraph>
      ))
    }

  }

  const renderContent = (list) => {
    if (list.length) {
      return list?.map((item, index) => (
        <Fragment key={item.id}>
          <Title level={5} className="mb-5" >
            {item.title}
          </Title>
          {renderOrganization(item.content)}
        </Fragment>
      ))
    }

  }

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
            <Title level={1} style={{ color: '#fff' }} className="text-white text-4xl font-bold mb-4">
              {track.name}
            </Title>
            {/* <Paragraph className="text-white text-lg mb-6 opacity-90">
              {track.description}
            </Paragraph> */}
            {/* <div className="flex flex-wrap justify-center gap-4 mb-8">
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
            </div> */}
            {/* {track.status === 'open' && (
              <Link to={`/baitabei/register?track=${track.id}`}>
                <Button type="primary" size="large" className="bg-yellow-500 border-yellow-500 hover:bg-yellow-600 px-8">
                  立即报名此赛道
                </Button>
              </Link>
            )} */}
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
                  <Title level={3} className="mb-4" >
                    赛道介绍
                  </Title>
                  <Paragraph className="text-gray-700 leading-relaxed text-base">
                    {track.detailDescription}
                  </Paragraph>
                  <Title level={3} className="mb-4" >
                    组织架构
                  </Title>
                  {renderOrganization(track.organization)}
                  <Title level={3} className="mb-4" >
                    征集内容
                  </Title>
                  {renderContent(track.collectionContent)}
                  <Title level={3} className="mb-4" >
                    参赛要求
                  </Title>
                  {renderContent(track.requirements)}
                  {/* <Title level={3} className="mb-4" >
                    赛道咨询
                  </Title>
                  <Paragraph className="text-gray-700 leading-relaxed text-base">
                    {track.zixun}
                  </Paragraph> */}
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
                </Card>
                {/* 重要提醒 */}
                <Card className="mb-6 shadow-lg border-0">
                  <Title level={4} className="mb-4">
                    赛道咨询
                  </Title>
                  <Alert
                    message="赛道咨询"
                    description={track.zixun}
                    type='info'
                    showIcon
                    className="mb-4"
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
                      <Button type="primary" size="large" block>
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