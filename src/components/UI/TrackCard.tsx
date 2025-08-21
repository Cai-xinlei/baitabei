import React from 'react';
import { Card, Tag, Progress, Button } from 'antd';
import { TrophyOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Track } from '../../types';
import { Link } from 'react-router-dom';

interface TrackCardProps {
  track: Track;
  featured?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, featured = false }) => {
  const progressPercentage = track.maxParticipants ? 
    Math.round((track.participantCount / track.maxParticipants) * 100) : 0;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'green';
      case 'full': return 'orange';
      case 'closed': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return '报名开放';
      case 'full': return '报名已满';
      case 'closed': return '报名关闭';
      default: return '未知状态';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={featured ? 'col-span-2' : ''}
    >
      <Card
        hoverable
        className="h-full shadow-lg border-0 overflow-hidden"
        bodyStyle={{ padding: 0 }}
        cover={
          <div className="relative h-48 overflow-hidden">
            <img
              src={track.image}
              alt={track.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4">
              <Tag color={getStatusColor(track.status)} className="font-medium">
                {getStatusText(track.status)}
              </Tag>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-1 text-white">{track.name}</h3>
              <p className="text-sm text-gray-200 mb-0">{track.description}</p>
            </div>
          </div>
        }
      >
        <div className="p-6">
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {track.detailDescription}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <UserOutlined className="text-blue-500" />
              <span>已报名：{track.participantCount}人</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CalendarOutlined className="text-green-500" />
              <span>截止：{new Date(track.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          {track.maxParticipants && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">报名进度</span>
                <span className="text-sm font-medium">
                  {track.participantCount}/{track.maxParticipants}
                </span>
              </div>
              <Progress 
                percent={progressPercentage} 
                strokeColor={progressPercentage > 80 ? '#ff4d4f' : '#1890ff'}
                showInfo={false}
                size="small"
              />
            </div>
          )}

          <div className="mb-4">
            <div className="flex items-center space-x-1 mb-2">
              <TrophyOutlined className="text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">奖项设置</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {track.awards.slice(0, 3).map((award, index) => (
                <Tag key={index} color="gold" className="text-xs">
                  {award}
                </Tag>
              ))}
              {track.awards.length > 3 && (
                <Tag className="text-xs">+{track.awards.length - 3}项</Tag>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Link to={`/tracks/${track.id}`} className="flex-1">
              <Button type="default" block>
                了解详情
              </Button>
            </Link>
            {track.status === 'open' && (
              <Link to={`/register?track=${track.id}`} className="flex-1">
                <Button type="primary" block>
                  立即报名
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TrackCard;