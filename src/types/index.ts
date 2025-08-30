// 用户类型定义
export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  realName?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  lastLoginAt?: string;
}

// 赛道类型定义
export interface Track {
  id: string;
  name: string;
  description: string;
  detailDescription: string;
  collectionContent: any;
  organization: string[],
  zixun: string,
  tips: string,
  image: string;
  icon: string;
  requirements: any[];
  awards: string[];
  deadline: string;
  participantCount: number;
  maxParticipants?: number;
  status: 'open' | 'closed' | 'full';
}

// 大赛信息类型
export interface Competition {
  id: string;
  name: string;
  theme: string;
  year: number;
  description: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  status: 'upcoming' | 'registration' | 'ongoing' | 'review' | 'completed';
  tracks: Track[];
  timeline: TimelineEvent[];
}

// 时间轴事件
export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  type: 'milestone' | 'deadline' | 'event';
}

// 专家评委
export interface Expert {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  avatar: string;
  expertise: string[];
  achievements: string[];
}