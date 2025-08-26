import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Row, Col, Card, List, Typography, Space, Skeleton } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import './CompetitionNews.css';

// 类型定义 - 资讯项
export interface NewsItem {
    id: number;
    title: string;
    date: string;
    highlight: boolean;
}

// 类型定义 - 海报配置
export interface PosterConfig {
    title: string;
    subtitle: string;
    slogan: string;
    awards: string;
    footer: string;
}

// 类型定义 - 组件属性
export interface CompetitionNewsModuleProps {
    /** 自定义资讯数据 */
    newsData?: NewsItem[];
    /** 自定义海报配置 */
    posterConfig?: Partial<PosterConfig>;
    /** 是否显示加载状态 */
    loading?: boolean;
    /** 资讯列表最大高度（像素） */
    listMaxHeight?: number;
}

// 默认资讯数据
const DEFAULT_NEWS_DATA: NewsItem[] = [
    { id: 1, title: "2024第三届‘白塔杯’文化创意大赛 获奖名单公示", date: "2025-08-20", highlight: true },
    { id: 2, title: "2024第三届‘白塔杯’文化创意大赛圆满落幕", date: "2025-08-15", highlight: false },
    { id: 3, title: "‘白塔杯’文化创意大赛赋能西城文化产业发展", date: "2025-08-10", highlight: false },
    { id: 4, title: "2024‘白塔杯’大赛吸引千余件作品参赛", date: "2025-08-05", highlight: false },
    { id: 5, title: "2024第三届‘白塔杯’文化创意大赛 AIGC应用创新赛道举办主题沙龙", date: "2025-07-30", highlight: true },
    { id: 6, title: "2024第三届‘白塔杯’文化创意大赛正式启动", date: "2025-07-01", highlight: false }
];

// 默认海报配置
const DEFAULT_POSTER_CONFIG: PosterConfig = {
    title: "2024第三届白塔杯",
    subtitle: "文化创意大赛",
    slogan: "文化引领 创意西城",
    awards: "获奖名单",
    footer: "2024第三届'白塔杯'文化创意大赛 获奖名单公示"
};

// 大赛资讯模块 - 生产级TypeScript实现
const CompetitionNewsModule: React.FC<CompetitionNewsModuleProps> = ({
    newsData = DEFAULT_NEWS_DATA,
    posterConfig = DEFAULT_POSTER_CONFIG,
    loading = false,
    listMaxHeight = 380 // 默认列表高度
}) => {
    // 合并默认配置和用户自定义配置
    const mergedPosterConfig: PosterConfig = { ...DEFAULT_POSTER_CONFIG, ...posterConfig };

    // 状态管理
    const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
    const newsListRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // 处理滚动动画的回调函数
    const handleIntersection: IntersectionObserverCallback = useCallback((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id) {
                setVisibleItems(prev => new Set(prev).add(entry.target.id));
            }
        });
    }, []);

    // 初始化IntersectionObserver
    useEffect(() => {
        // 创建观察者实例
        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察所有资讯项
        const observer = observerRef.current;
        const items = newsListRef.current?.querySelectorAll<HTMLElement>('.news-item');

        items?.forEach(item => observer.observe(item));

        // 清理函数
        return () => {
            const observer = observerRef.current;
            if (observer) {
                items?.forEach(item => observer.unobserve(item));
                observer.disconnect();
                observerRef.current = null;
            }
        };
    }, [handleIntersection]);

    // 渲染资讯项
    const renderNewsItem = useCallback((item: NewsItem) => (
        <List.Item
            key={item.id}
            className={`news-item ${visibleItems.has(`news-${item.id}`) ? 'visible' : ''}`}
            id={`news-${item.id}`}
        // loading={loading}
        >
            <div className="news-item-content">
                <Typography.Paragraph
                    className={`news-title ${item.highlight ? 'highlight' : ''}`}
                    ellipsis={{ rows: 1, expandable: false }}
                >
                    {item.title}
                </Typography.Paragraph>
                <Space className="news-date">
                    <CalendarOutlined className="date-icon" />
                    <Typography.Text>{item.date}</Typography.Text>
                </Space>
            </div>
        </List.Item>
    ), [loading, visibleItems]);

    return (
        <div className="competition-news-module" data-testid="competition-news-module">
            {/* 标题区域 */}
            <div className="module-title">
                <Typography.Title level={2}>
                    <span className="title-dash">—</span>
                    <span className="title-text">大赛资讯</span>
                    <span className="title-dash">—</span>
                </Typography.Title>
            </div>

            {/* 主内容区 */}
            <Row gutter={[32, 0]} className="content-container">
                {/* 左侧海报区域 */}
                <Col xs={24} lg={10} className="poster-column">
                    {loading ? (
                        <Skeleton.Avatar style={{ width: '100%', height: 480 }} active />
                    ) : (
                        <div className="poster-container">
                            <div className="poster-gradient">
                                <div className="poster-content">
                                    <div className="poster-title">{mergedPosterConfig.title}</div>
                                    <div className="poster-subtitle">{mergedPosterConfig.subtitle}</div>
                                    <div className="poster-slogan">{mergedPosterConfig.slogan}</div>
                                    <div className="poster-awards">{mergedPosterConfig.awards}</div>
                                    <div className="poster-footer">{mergedPosterConfig.footer}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Col>

                {/* 右侧资讯列表区域 */}
                <Col xs={24} lg={14} className="news-column">
                    <Card className="news-card" bordered={false}>
                        <div className="news-header">
                            <Typography.Title level={3}>最新资讯</Typography.Title>
                        </div>

                        {/* 新增：滚动容器 */}
                        <div className="news-list-container" style={{ maxHeight: `${listMaxHeight}px`, overflow: 'scroll' }} ref={newsListRef}>
                            <List
                                dataSource={newsData}
                                renderItem={renderNewsItem}
                                bordered
                                className="news-list"
                                locale={{ emptyText: '暂无资讯数据' }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

// 使用React.memo优化性能，避免不必要的重渲染
export default React.memo(CompetitionNewsModule);