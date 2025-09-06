import { Expert, TimelineEvent } from '../types';
import trackImages from './imagesCover'

// 时间轴事件
export const TIMELINE: TimelineEvent[] = [
  {
    id: 'launch',
    title: '大赛启动',
    // description: '2025第四届白塔杯文化创意大赛正式启动，开始接受报名',
    date: '2025-9月',
    status: 'completed',
    type: 'milestone'
  },
  {
    id: 'registration-open',
    title: '征集阶段',
    description: '所有赛道正式开放报名，参赛者可通过官网提交项目信息',
    date: '2025年8月-10月',
    status: 'current',
    type: 'event'
  },
  {
    id: 'workshop-1',
    title: '评审阶段',
    description: '举办"数字文化创新趋势"主题讲座，邀请行业专家分享经验',
    date: '2025年10月-11月',
    status: 'upcoming',
    type: 'event'
  },
  {
    id: 'mid-review',
    title: '配套活动',
    description: '为报名项目提供专家一对一辅导，帮助完善项目方案',
    date: '2025年8月-11月',
    status: 'upcoming',
    type: 'milestone'
  },
  {
    id: 'registration-deadline',
    title: '颁奖典礼',
    description: '所有参赛项目必须在此日期前完成报名和材料提交',
    date: '2025年12月',
    status: 'upcoming',
    type: 'deadline'
  },
  // {
  //   id: 'preliminary-review',
  //   title: '初审阶段',
  //   description: '专家评委团队对所有参赛项目进行初步评审和筛选',
  //   date: '2025-11-15',
  //   status: 'upcoming',
  //   type: 'milestone'
  // },
  // {
  //   id: 'final-presentation',
  //   title: '决赛答辩',
  //   description: '入围项目进行现场答辩展示，评委现场打分评选',
  //   date: '2025-12-10',
  //   status: 'upcoming',
  //   type: 'event'
  // },
  // {
  //   id: 'award-ceremony',
  //   title: '颁奖典礼',
  //   description: '举办盛大颁奖典礼，公布获奖名单并颁发奖项',
  //   date: '2025-12-20',
  //   status: 'upcoming',
  //   type: 'milestone'
  // }
];

// 导航菜单
export const NAVIGATION_MENU = [
  { key: 'home', label: '大赛首页', path: '/baitabei/home' },
  { key: 'tracks', label: '赛道设置', path: '/baitabei/tracks' },
  { key: 'news', label: '大赛资讯', path: '/baitabei/news' },
  // { key: 'about', label: '关于大赛', path: '/baitabei/about' },
  { key: 'register', label: '立即报名', path: '/baitabei/register' }
];

// 新闻资讯数据
export const NEWS_ARTICLES = [
  {
    id: '1',
    title: '2025第四届"白塔杯"文化创意大赛正式启动',
    excerpt: '2025第四届“白塔杯”文化创意大赛正式启动，以“文融西城 创绘未来”为主题，设置5大赛道。',
    coverImage: trackImages.newsCoverImg,
    author: '大赛组委会',
    publishDate: '2025年09月',
    linkUrl: "https://mp.weixin.qq.com/s/3AAiJHR6IBzSLHIxqhEg1A",
    viewCount: 1520,
    category: '大赛动态',
    tags: ['大赛启动', '文化创意', '政策解读']
  },
];

export * from './tracks';