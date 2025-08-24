import { Expert, TimelineEvent } from '../types';
import trackImages from './imagesCover'

// 专家评委团队
export const EXPERTS: Expert[] = [
  {
    id: 'expert-1',
    name: '张文华',
    title: '教授、博士生导师',
    organization: '中央美术学院',
    bio: '国内知名设计教育专家，长期从事视觉传达设计研究，主持多项国家级设计项目。',
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
    name: '李明',
    title: '首席技术官',
    organization: '腾讯科技',
    bio: '人工智能与大数据领域专家，专注于数字文化技术创新，拥有20年行业经验。',
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
    name: '王雅琴',
    title: '文化产业研究中心主任',
    organization: '北京大学',
    bio: '文化产业与商业模式创新专家，致力于文化创意产业政策研究与实践指导。',
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
    name: '陈建国',
    title: '创始人兼CEO',
    organization: '文创投资基金',
    bio: '资深投资人，专注文化创意产业投资，成功投资孵化多个知名文创项目。',
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
    name: '刘倩',
    title: '社会创新实验室主任',
    organization: '中国社科院',
    bio: '社会创新与公益项目评估专家，长期关注文化公益与社会责任领域。',
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
    description: '2025年第四届白塔杯文化创意大赛正式启动，开始接受报名',
    date: '2025-09-01',
    status: 'completed',
    type: 'milestone'
  },
  {
    id: 'registration-open',
    title: '报名开放',
    description: '所有赛道正式开放报名，参赛者可通过官网提交项目信息',
    date: '2025-09-05',
    status: 'completed',
    type: 'event'
  },
  {
    id: 'workshop-1',
    title: '专家讲座',
    description: '举办"数字文化创新趋势"主题讲座，邀请行业专家分享经验',
    date: '2025-09-20',
    status: 'completed',
    type: 'event'
  },
  {
    id: 'mid-review',
    title: '中期辅导',
    description: '为报名项目提供专家一对一辅导，帮助完善项目方案',
    date: '2025-10-15',
    status: 'current',
    type: 'milestone'
  },
  {
    id: 'registration-deadline',
    title: '报名截止',
    description: '所有参赛项目必须在此日期前完成报名和材料提交',
    date: '2025-10-31',
    status: 'upcoming',
    type: 'deadline'
  },
  {
    id: 'preliminary-review',
    title: '初审阶段',
    description: '专家评委团队对所有参赛项目进行初步评审和筛选',
    date: '2025-11-15',
    status: 'upcoming',
    type: 'milestone'
  },
  {
    id: 'final-presentation',
    title: '决赛答辩',
    description: '入围项目进行现场答辩展示，评委现场打分评选',
    date: '2025-12-10',
    status: 'upcoming',
    type: 'event'
  },
  {
    id: 'award-ceremony',
    title: '颁奖典礼',
    description: '举办盛大颁奖典礼，公布获奖名单并颁发奖项',
    date: '2025-12-20',
    status: 'upcoming',
    type: 'milestone'
  }
];

// 导航菜单
export const NAVIGATION_MENU = [
  { key: 'home', label: '大赛首页', path: '/' },
  { key: 'tracks', label: '赛道设置', path: '/tracks' },
  { key: 'news', label: '大赛资讯', path: '/news' },
  { key: 'about', label: '关于大赛', path: '/about' },
  { key: 'register', label: '立即报名', path: '/register' }
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