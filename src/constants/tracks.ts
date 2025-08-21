import { Track } from '../types';

// 2025年白塔杯六大赛道
export const TRACKS: Track[] = [
  {
    id: 'creative-design',
    name: '创意设计赛道',
    description: '聚焦视觉设计、产品设计、空间设计等创意设计领域',
    detailDescription: '面向设计师、艺术家、创意工作者，征集具有创新性和实用性的设计作品，包括但不限于品牌设计、产品设计、空间设计、数字艺术等。',
    image: '/images/track-creative.jpg',
    icon: 'PaintBrushIcon',
    requirements: [
      '作品需具有原创性和创新性',
      '提供完整的设计方案和理念说明',
      '包含设计过程和应用场景展示',
      '符合文化创意主题要求'
    ],
    awards: ['一等奖1名', '二等奖2名', '三等奖3名', '优秀奖10名'],
    deadline: '2025-10-31',
    participantCount: 156,
    maxParticipants: 200,
    status: 'open'
  },
  {
    id: 'tech-innovation',
    name: '技术创新赛道',
    description: '关注人工智能、区块链、物联网等前沿技术应用',
    detailDescription: '面向技术开发者、科研人员、技术团队，征集运用前沿技术推动文化创意产业发展的创新项目，包括AI应用、数字文化产品、智能硬件等。',
    image: '/images/track-creative.jpg',
    icon: 'CpuChipIcon',
    requirements: [
      '项目需具有技术先进性',
      '提供技术方案和实现路径',
      '展示技术应用效果和商业价值',
      '符合数字文化创新方向'
    ],
    awards: ['一等奖1名', '二等奖2名', '三等奖3名', '优秀奖12名'],
    deadline: '2025-10-31',
    participantCount: 89,
    maxParticipants: 150,
    status: 'open'
  },
  {
    id: 'cultural-communication',
    name: '文化传播赛道',
    description: '推动传统文化与现代传播方式的创新结合',
    detailDescription: '面向文化工作者、媒体从业者、内容创作者，征集运用现代传播手段弘扬传统文化的优秀项目，包括文化纪录片、新媒体内容、文化体验产品等。',
    image: '/images/track-cultural.jpg',
    icon: 'SpeakerWaveIcon',
    requirements: [
      '内容需具有文化价值和教育意义',
      '采用创新的传播形式和技术手段',
      '提供传播策略和预期效果分析',
      '体现文化传承与创新结合'
    ],
    awards: ['一等奖1名', '二等奖2名', '三等奖3名', '优秀奖15名'],
    deadline: '2025-10-31',
    participantCount: 134,
    maxParticipants: 180,
    status: 'open'
  },
  {
    id: 'business-model',
    name: '商业模式赛道',
    description: '探索文化创意产业的商业模式创新',
    detailDescription: '面向创业者、企业家、商业策划师，征集具有可持续发展潜力的文化创意商业模式，包括新型文化消费、文化金融、文化电商等创新模式。',
    image: '/images/track-business.jpg',
    icon: 'BriefcaseIcon',
    requirements: [
      '商业模式需具有可行性和创新性',
      '提供详细的商业计划和财务预测',
      '展示市场调研和竞争分析',
      '体现社会价值和经济效益结合'
    ],
    awards: ['一等奖1名', '二等奖2名', '三等奖3名', '优秀奖8名'],
    deadline: '2025-10-31',
    participantCount: 67,
    maxParticipants: 120,
    status: 'open'
  },
  {
    id: 'social-welfare',
    name: '社会公益赛道',
    description: '运用创意力量服务社会公益事业',
    detailDescription: '面向公益组织、志愿者、社会工作者，征集运用文化创意手段解决社会问题、服务弱势群体、推动社会进步的公益项目。',
    image: '/images/track-social.jpg',
    icon: 'HeartIcon',
    requirements: [
      '项目需具有明确的社会公益价值',
      '提供项目实施方案和预期效果',
      '展示受益群体和社会影响力',
      '体现创意手段与公益目标结合'
    ],
    awards: ['一等奖1名', '二等奖2名', '三等奖3名', '优秀奖12名'],
    deadline: '2025-10-31',
    participantCount: 78,
    maxParticipants: 100,
    status: 'open'
  },
  {
    id: 'comprehensive-innovation',
    name: '综合创新赛道',
    description: '跨领域融合的综合性创新项目',
    detailDescription: '面向跨领域团队和复合型人才，征集融合多个专业领域、体现综合创新能力的项目，推动不同学科和行业的交叉融合。',
    image: '/images/track-comprehensive.png',
    icon: 'PuzzlePieceIcon',
    requirements: [
      '项目需体现跨领域融合特色',
      '提供多维度的创新解决方案',
      '展示团队的综合创新能力',
      '符合未来发展趋势'
    ],
    awards: ['一等奖1名', '二等奖2名', '三等奖3名', '优秀奖10名'],
    deadline: '2025-10-31',
    participantCount: 45,
    maxParticipants: 80,
    status: 'open'
  }
];