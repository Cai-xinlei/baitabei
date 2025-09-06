import React from 'react';
import { Card, Tag, Button, Typography } from 'antd';
import { motion } from 'framer-motion';
import { Track } from '../../types';
import { Link } from 'react-router-dom';
const { Paragraph } = Typography;

import './index.css';
interface TrackCardProps {
  track: Track;
  featured?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, featured = false }) => {
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={featured ? 'col-span-2' : ''}
    >
      <Card
        hoverable
        className="h-full border-0 overflow-hidden"
        // bodyStyle={{ padding: 0 }}
        cover={
          <div className="relative h-48 overflow-hidden">
            <img
              src={track.image}
              alt={track.name}
              className="w-full h-full"
            />
            {/* <div className="absolute top-4 right-4" >
              <Tag color={getStatusColor(track.status)} className="font-medium">
                {getStatusText(track.status)}
              </Tag>
            </div> */}
          </div>
        }
      >
        <div>
          <Paragraph className='detailDescription'>
            {track.detailDescription}
          </Paragraph>
          <div className="flex space-x-2">
            <Link to={`/baitabei/tracks/${track.id}`} className="flex-1">
              <Button type="default" block>
                了解详情
              </Button>
            </Link>
            {track.status === 'open' && (
              <Link to={`/baitabei/register?track=${track.id}`} className="flex-1">
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