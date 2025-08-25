import React, { useState, useEffect } from 'react';
import { Typography, Card, Tag, Button, Avatar, Row, Col, Divider, List, Space } from 'antd';
import { CalendarOutlined, UserOutlined, EyeOutlined, ShareAltOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import trackImages from '../constants/imagesCover'

const { Title, Paragraph, Text } = Typography;

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishDate: string;
  viewCount: number;
  tags: string[];
  category: string;
}

interface RelatedNews {
  id: string;
  title: string;
  coverImage: string;
  publishDate: string;
}

const NewsDetailPage: React.FC = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedNews, setRelatedNews] = useState<RelatedNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 从后端API获取新闻详情
    // 模拟新闻数据
    const mockArticle: NewsArticle = {
      id: newsId || '1',
      title: '2025年第四届"白塔杯"文化创意大赛正式启动',
      content: `
        <div>
          <p>2025年9月1日，备受瞩目的第四届"白塔杯"文化创意大赛在北京西城区正式启动。本届大赛以"文化引领·创意西城"为主题，聚焦"数字文化创新"与"消费新场景重构"两大核心方向。</p>
          
          <h3>大赛亮点</h3>
          <p>本届大赛设立六大赛道，包括创意设计、技术创新、文化传播、商业模式、社会公益、综合创新，为不同专业背景的参赛者提供了广阔的展示平台。</p>
          
          <h3>奖项设置</h3>
          <p>大赛总奖金池超过300万元，其中一等奖奖金高达50,000元。除丰厚奖金外，优秀项目还将获得投资对接、政策扶持、场地支持等全方位服务。</p>
          
          <h3>报名方式</h3>
          <p>即日起至2025年10月31日，参赛者可通过官方网站进行在线报名。大赛将于11月进行初评，12月举行决赛。</p>
          
          <p>我们期待更多富有创意和激情的团队和个人参与其中，共同推动文化创意产业的发展！</p>
        </div>
      `,
      excerpt: '2025年第四届"白塔杯"文化创意大赛正式启动，以"文化引领·创意西城"为主题，设立六大赛道，总奖金池超过300万元。',
      coverImage: trackImages.newsCoverImg,
      author: '大赛组委会',
      publishDate: '2025-09-01',
      viewCount: 1520,
      tags: ['大赛启动', '文化创意', '政策解读'],
      category: '大赛动态'
    };

    const mockRelatedNews: RelatedNews[] = [
      {
        id: '2',
        title: '专家解读：数字文化创新的发展趋势',
        coverImage: trackImages.trackCreative,
        publishDate: '2025-09-05'
      },
      {
        id: '3',
        title: '往届获奖作品回顾：创意点亮生活',
        coverImage: trackImages.trackBusiness,
        publishDate: '2025-09-03'
      },
      {
        id: '4',
        title: '报名攻略：如何选择适合的赛道',
        coverImage: trackImages.trackSocial,
        publishDate: '2025-09-02'
      }
    ];

    // 模拟加载延迟
    setTimeout(() => {
      setArticle(mockArticle);
      setRelatedNews(mockRelatedNews);
      setLoading(false);
    }, 500);
  }, [newsId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <Text>加载中...</Text>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Title level={3}>文章不存在</Title>
          <Link to="/baitabei/news">
            <Button type="primary">返回新闻列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 面包屑导航 */}
        <div className="mb-6">
          <Link to="/" className="text-gray-500 hover:text-red-600">首页</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/baitabei/news" className="text-gray-500 hover:text-red-600">大赛资讯</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">正文</span>
        </div>

        <Row gutter={[24, 24]}>
          {/* 主要内容 */}
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg border-0">
                {/* 文章头部 */}
                <div className="mb-6">
                  <div className="mb-4">
                    <Tag color="red" className="mb-2">{article.category}</Tag>
                    {article.tags.map(tag => (
                      <Tag key={tag} className="mb-2">{tag}</Tag>
                    ))}
                  </div>

                  <Title level={1} className="mb-4 text-2xl md:text-3xl">
                    {article.title}
                  </Title>

                  <div className="flex flex-wrap items-center justify-between text-gray-500 text-sm mb-6">
                    <Space size="large">
                      <div className="flex items-center">
                        <UserOutlined className="mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarOutlined className="mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <EyeOutlined className="mr-1" />
                        {article.viewCount} 次阅读
                      </div>
                    </Space>

                    <div className="flex space-x-2">
                      <Button size="small" icon={<HeartOutlined />}>点赞</Button>
                      <Button size="small" icon={<ShareAltOutlined />}>分享</Button>
                    </div>
                  </div>
                </div>

                {/* 封面图片 */}
                {article.coverImage && (
                  <div className="mb-6">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                  </div>
                )}

                <Divider />

                {/* 文章内容 */}
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#333'
                  }}
                />

                <Divider />

                {/* 文章底部 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button type="text" icon={<HeartOutlined />} className="text-red-600">
                      点赞 (42)
                    </Button>
                    <Button type="text" icon={<MessageOutlined />}>
                      评论 (8)
                    </Button>
                    <Button type="text" icon={<ShareAltOutlined />}>
                      分享
                    </Button>
                  </div>

                  <div className="text-gray-500 text-sm">
                    最后更新: {new Date(article.publishDate).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>

          {/* 侧边栏 */}
          <Col xs={24} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* 相关资讯 */}
              <Card title="相关资讯" className="shadow-lg border-0 mb-6">
                <List
                  dataSource={relatedNews}
                  renderItem={(item) => (
                    <List.Item className="px-0">
                      <Link to={`/baitabei/news/${item.id}`} className="block w-full hover:bg-gray-50 p-2 rounded">
                        <div className="flex space-x-3">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {new Date(item.publishDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </List.Item>
                  )}
                />
              </Card>

              {/* 快速报名 */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
                <div className="text-center">
                  <Title level={4} className="text-red-600 mb-3">
                    立即参与大赛
                  </Title>
                  <Paragraph className="text-gray-600 mb-4">
                    抓住机会，展示您的创意才华！
                  </Paragraph>
                  <Link to="/baitabei/register">
                    <Button type="primary" size="large" block className="bg-red-600 border-red-600 hover:bg-red-700">
                      立即报名
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NewsDetailPage;