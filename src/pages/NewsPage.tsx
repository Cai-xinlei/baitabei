import React, { useState } from 'react';
import { Card, Row, Col, Typography, Tag, Input, Pagination, Empty, Avatar } from 'antd';
import { CalendarOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NEWS_ARTICLES } from '../constants';
import trackImages from '../constants/imagesCover';

const { Title, Paragraph } = Typography;
const { Search } = Input;

// 新闻分类映射
const categoryMap: { [key: string]: string } = {
  '大赛动态': 'announcement',
  '专家观点': 'expert',
  '作品展示': 'showcase',
  '参赛指南': 'guide',
  '政策解读': 'policy'
};

// 转换新闻数据格式
const newsData = NEWS_ARTICLES.map(article => ({
  id: article.id,
  title: article.title,
  summary: article.excerpt,
  coverImage: article.coverImage,
  author: article.author,
  publishedAt: article.publishDate,
  category: categoryMap[article.category] || 'news',
  tags: article.tags,
  views: article.viewCount
}));

const NewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // 筛选新闻
  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.includes(searchTerm) || news.summary.includes(searchTerm);
    const matchesCategory = !selectedCategory || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 分页数据
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + pageSize);

  // 分类标签
  const categories = [
    { key: 'announcement', label: '大赛动态', color: 'red' },
    { key: 'expert', label: '专家观点', color: 'blue' },
    { key: 'showcase', label: '作品展示', color: 'green' },
    { key: 'guide', label: '参赛指南', color: 'orange' },
    { key: 'policy', label: '政策解读', color: 'purple' }
  ];

  const getCategoryInfo = (category: string) => {
    return categories.find(c => c.key === category) || { label: category, color: 'default' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-16"
        style={{
          backgroundImage: `url(${trackImages.toutu2})`,
          backgroundSize: 'cover',
          width: '100%',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title level={1} className="text-white text-4xl font-bold mb-4">
              大赛资讯
            </Title>
            <Paragraph className=" text-lg opacity-90 max-w-2xl mx-auto">
              关注最新大赛动态，获取第一手赛事信息和参赛指导
            </Paragraph>
          </motion.div>
        </div>
      </section>

      {/* 搜索和筛选 */}
      {/* <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[24, 16]} align="middle">
            <Col xs={24} md={16}>
              <Search
                placeholder="搜索新闻标题或内容"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={24} md={8}>
              <div className="flex flex-wrap gap-2">
                <Tag
                  className={`cursor-pointer px-3 py-1 text-sm ${!selectedCategory ? 'bg-red-500 text-white border-red-500' : 'hover:border-red-500'
                    }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  全部
                </Tag>
                {categories.map(category => (
                  <Tag
                    key={category.key}
                    className={`cursor-pointer px-3 py-1 text-sm ${selectedCategory === category.key ? 'bg-red-500 text-white border-red-500' : 'hover:border-red-500'
                      }`}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.key ? null : category.key
                    )}
                  >
                    {category.label}
                  </Tag>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </section> */}

      {/* 新闻列表 */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {paginatedNews.length > 0 ? (
            <>
              <Row gutter={[24, 24]}>
                {paginatedNews.map((news, index) => (
                  <Col xs={24} md={12} lg={8} key={news.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        hoverable
                        className="h-full shadow-lg border-0 overflow-hidden"
                        cover={
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={news.coverImage}
                              alt={news.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                              <Tag color={getCategoryInfo(news.category).color}>
                                {getCategoryInfo(news.category).label}
                              </Tag>
                            </div>
                          </div>
                        }
                      >
                        <div className="h-full flex flex-col">
                          <Title level={4} className="mb-3 line-clamp-2">
                            <Link to={`/baitabei/news/${news.id}`} className="text-gray-900 hover:text-red-600">
                              {news.title}
                            </Link>
                          </Title>

                          <Paragraph className="text-gray-600 mb-4 line-clamp-3 flex-1">
                            {news.summary}
                          </Paragraph>
                          {/* 
                          <div className="flex flex-wrap gap-1 mb-4">
                            {news.tags.map(tag => (
                              <Tag key={tag} className="text-xs">{tag}</Tag>
                            ))}
                          </div> */}

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              {/* <div className="flex items-center space-x-1">
                                <Avatar size="small">{news.author[0]}</Avatar>
                                <span>{news.author}</span>
                              </div> */}
                              <div className="flex items-center space-x-1">
                                <CalendarOutlined />
                                <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            {/* <div className="flex items-center space-x-1">
                              <EyeOutlined />
                              <span>{news.views}</span>
                            </div> */}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>

              {/* 分页 */}
              <div className="mt-12 text-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredNews.length}
                  onChange={setCurrentPage}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) =>
                    `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                  }
                />
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Empty
                description="暂无相关新闻"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;