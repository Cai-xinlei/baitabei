import { Expert, TimelineEvent } from '../types';
import trackImages from './imagesCover'

// 专家评委团队
export const EXPERTS = [
  {
    id: 'expert-1',
    name: '宋慰祖',
    // title: '教授、博士生导师',
    // organization: '中央美术学院',
    bio: '专家委员会主任',
    avatar: trackImages.teamImg,
    expertise: ['视觉设计', '品牌策划', '文化创意'],
    achievements: [
      '国家级教学成果奖获得者',
      '中国设计业十大杰出青年',
      '多项国际设计大奖评委'
    ]
  },
  {
    id: 'expert-2',
    name: '千  哲',
    // title: '首席技术官',
    // organization: '腾讯科技',
    bio: '文创产品开发赛道',
    avatar: trackImages.teamImg,
    expertise: ['人工智能', '数据科学', '技术创新'],
    achievements: [
      '国家科技进步奖二等奖',
      '中国AI产业领军人物',
      '发表SCI论文30余篇'
    ]
  },
  {
    id: 'expert-3',
    name: '奚大龙',
    // title: '文化产业研究中心主任',
    // organization: '北京大学',
    bio: '城市消费场景设计赛道',
    avatar: trackImages.teamImg,
    expertise: ['文化产业', '商业模式', '政策研究'],
    achievements: [
      '文化部特聘专家',
      '国家社科基金重大项目主持人',
      '文化产业发展规划制定者'
    ]
  },
  {
    id: 'expert-4',
    name: '王  彊',
    // title: '创始人兼CEO',
    // organization: '文创投资基金',
    bio: '文化消费内容创新赛道',
    avatar: trackImages.teamImg,
    expertise: ['投资评估', '商业孵化', '市场分析'],
    achievements: [
      '投资项目总估值超100亿',
      '中国天使投资人50强',
      '文创产业投资领军人物'
    ]
  },
  {
    id: 'expert-5',
    name: '刘  兵',
    // title: '社会创新实验室主任',
    // organization: '中国社科院',
    bio: '文商旅体科技创新应用赛道',
    avatar: trackImages.teamImg,
    expertise: ['社会创新', '公益评估', '影响力投资'],
    achievements: [
      '联合国可持续发展目标顾问',
      '中国公益慈善领域影响力人物',
      '社会创新项目评估标准制定者'
    ]
  },
  {
    id: 'expert-6',
    name: '张  旗',
    // title: '社会创新实验室主任',
    // organization: '中国社科院',
    bio: '非遗创新转化应用赛道',
    avatar: trackImages.teamImg,
    expertise: ['社会创新', '公益评估', '影响力投资'],
    achievements: [
      '联合国可持续发展目标顾问',
      '中国公益慈善领域影响力人物',
      '社会创新项目评估标准制定者'
    ]
  }
];

// 时间轴事件
export const TIMELINE: TimelineEvent[] = [
  {
    id: 'launch',
    title: '大赛启动',
    // description: '2025年第四届白塔杯文化创意大赛正式启动，开始接受报名',
    date: '2025-8月',
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
  { key: 'about', label: '关于大赛', path: '/baitabei/about' },
  { key: 'register', label: '立即报名', path: '/baitabei/register' }
];

// 新闻资讯数据
export const NEWS_ARTICLES = [
  {
    id: '1',
    title: '2025年第四届"白塔杯"文化创意大赛正式启动',
    excerpt: '2025年第四届"白塔杯"文化创意大赛正式启动，以"文化引领·创意西城"为主题，设立六大赛道，总奖金池超过300万元。',
    coverImage: trackImages.newsCoverImg,
    author: '大赛组委会',
    publishDate: '2025-09-01',
    viewCount: 1520,
    category: '大赛动态',
    tags: ['大赛启动', '文化创意', '政策解读']
  },
  {
    id: '2',
    title: '专家解读：数字文化创新的发展趋势',
    excerpt: '业内专家深度解析数字文化创新的最新发展趋势，为参赛者提供专业指导和行业洞察。',
    coverImage: trackImages.trackCreative,
    author: '李明教授',
    publishDate: '2025-09-05',
    viewCount: 892,
    category: '专家观点',
    tags: ['数字文化', '创新趋势', '专家解读']
  },
  {
    id: '3',
    title: '往届获奖作品回顾：创意点亮生活',
    excerpt: '回顾历届白塔杯获奖作品，展示文化创意如何融入日常生活，启发更多创新思路。',
    coverImage: trackImages.trackBusiness,
    author: '文创编辑部',
    publishDate: '2025-09-03',
    viewCount: 756,
    category: '作品展示',
    tags: ['获奖作品', '创意展示', '作品回顾']
  },
  {
    id: '4',
    title: '报名攻略：如何选择适合的赛道',
    excerpt: '详细解析六大赛道的特色和要求，帮助参赛者根据自身项目特点选择最适合的赛道。',
    coverImage: trackImages.trackSocial,
    author: '大赛指导组',
    publishDate: '2025-09-02',
    viewCount: 1234,
    category: '参赛指南',
    tags: ['报名指南', '赛道选择', '参赛攻略']
  },
  {
    id: '5',
    title: '政策扶持：获奖项目将享受全方位支持',
    excerpt: '详解大赛获奖项目可享受的政策扶持和资源支持，包括资金、场地、孵化等多维度帮助。',
    coverImage: trackImages.trackComprehensive,
    author: '政策解读组',
    publishDate: '2025-08-30',
    viewCount: 945,
    category: '政策解读',
    tags: ['政策扶持', '项目孵化', '资源支持']
  }
];

export * from './tracks';