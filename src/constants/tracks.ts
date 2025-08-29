import { Track } from '../types';
import trackImages from './imagesCover'
// 2025年白塔杯六大赛道
export const TRACKS: Track[] = [
  {
    id: 'creative-design',
    name: '文创产品开发赛道',
    description: '文创产品开发赛道',
    detailDescription: '面向设计师、艺术家、创意工作者，征集具有创新性和实用性的设计作品，包括但不限于品牌设计、产品设计、空间设计、数字艺术等。',
    image: trackImages.saidaoone,
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
    name: '城市消费场景设计赛道',
    description: '城市消费场景设计赛道',
    detailDescription: '面向技术开发者、科研人员、技术团队，征集运用前沿技术推动文化创意产业发展的创新项目，包括AI应用、数字文化产品、智能硬件等。',
    image: trackImages.saidaotwo,
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
    name: '文化消费内容创新赛道',
    description: '推动传统文化与现代传播方式的创新结合',
    detailDescription: '面向文化工作者、媒体从业者，征集运用现代传播手段弘扬传统文化的优秀项目，包括文化纪录片、新媒体内容、文化体验产品等。',
    image: trackImages.saidaothree,
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
    name: '文商旅体科技创新应用赛道',
    description: '探索文化创意产业的商业模式创新',
    detailDescription: '面向创业者、企业家、商业策划师，征集具有可持续发展潜力的文化创意商业模式，包括新型文化消费、文化金融、文化电商等创新模式。',
    image: trackImages.saidaofour,
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
    name: '非遗创新转化应用赛道',
    description: '运用创意力量服务社会公益事业',
    detailDescription: '面向公益组织、志愿者、社会工作者，征集运用文化创意手段解决社会问题、服务弱势群体、推动社会进步的公益项目。',
    image: trackImages.saidaofive,
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
];

//专家列表
export const ExpertList = [
  {
    id: 1,
    name: '宋慰祖',
    track: '专家委员会主任',
    image: trackImages.songweizu
  },
  {
    id: 2,
    name: '千哲',
    track: '文创产品开发赛道',
    image: trackImages.qianzhe
  },
  {
    id: 3,
    name: '奚大龙',
    track: '城市消费场景设计赛道',
    image: trackImages.xidalong
  },
  {
    id: 4,
    name: '王彊',
    track: '文化消费内容创新赛道',
    image: trackImages.wangjiang
  },
  {
    id: 5,
    name: '刘兵',
    track: '文商旅体科技创新应用赛道',
    image: trackImages.liubing
  },
  {
    id: 6,
    name: '张旗',
    track: '非遗创新转化应用赛道',
    image: trackImages.zhangqi
  }
];


export const PromiseBook = [
  '致：2025第四届“白塔杯”文化创意大赛主办方、组委会本参赛者或参赛单位在此郑重承诺并保证如下：',
  '1、认可《2025第四届“白塔杯”文化创意大赛征集公告》及大赛发布的参赛流程、赛事环节及相关活动安排。与赛事相关的通知送达以大赛官网公告之日起视为有效送达，重要事项可通过参赛者预留联系方式书面送达。',
  '2、严格遵守大赛发布的与赛事有关的规则和要求。',
  '3、具备完全民事行为能力，本参赛者或参赛单位同意向大赛主办方、组委会提供合法有效的身份证件或企业营业执照及其他主办方要求的资质证明文件，用于核实个人/单位身份是否符合参赛要求。',
  '4、提交用于参加《2025第四届“白塔杯”文化创意大赛》的参赛作品是由承诺人独立完成的原创作品，承诺人对参赛作品拥有充分、完全、排他的著作权，不存在侵犯他人知识产权和其他任何合作权益之情形。承诺人知悉，凡涉嫌侵犯他人任何合法权利（包括知识产权）的作品，将自动丧失参赛资格，主办方有权根据自身判断认定相关情形并作出最终决定,承诺人对此予以理解并同意。',
  '5、使用AI工具创作的作品，应注明所使用AI模型具体名称和使用程度。',
  '6、如参赛作品获奖，同意大赛主、承办单位及其合作单位为开展“白塔杯”文创大赛进行宣传、推广等公益目的，对个人/单位提交的参赛作品进行无偿使用，个人/单位对作品保留署名权；同时认可，该获奖作品后续涉及知识产权的商业转化，大赛组委会指定的主、承办单位具有著作权授权优先合作权，将由大赛主、承办单位与作品作者另行就著作权合作事宜进行协商。',
  '7、如由于承诺人违反承诺或违反任何大赛的规则、要求，导致主办方、承办方或组委会面临任何纠纷，或因此而遭受任何名誉、声誉及经济上的直接或间接的损失，组委会均有权要求承诺人采取充分而适当的措施，以确保主办方、承办方或组委会免受损失，消除影响，并要求承诺人承担该纠纷引起的全部责任。',
  '8、 参赛者/参赛单位应对在参赛过程中知悉的主办方、承办方、组委会及其他参赛者的非公开信息予以保密，未经主办方书面同意不得向任何第三方披露。主办方应依法对参赛者/参赛单位提交的个人信息、企业信息等资料进行保护，除为赛事组织、宣传、推广及法律法规要求外，不得擅自披露或用于其他用途。',
  '9、 主办方、组委会对赛事流程、活动安排、奖项设置及本承诺书的相关事项拥有最终解释权，参赛者对此予以认可并无条件接受。',
  '本承诺书自参赛者/参赛单位签字（或盖章）并提交至主办方、组委会之日起生效，具有法律效力。承诺书可采用纸质或电子方式签署，具有同等法律效力。',

]