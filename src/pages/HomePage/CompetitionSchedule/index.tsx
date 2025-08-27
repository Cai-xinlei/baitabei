import React from 'react';
import { Flex, Typography } from 'antd';
import './index.css';
import TitleWithLines from '@/components/TitleWithLines'

const { Title } = Typography;

const scheduleData = [
    {
        phase: '大赛启动',
        time: '2025年8月底'
    },
    {
        phase: '项目征集',
        time: '2025年9月1日-10月12日'
    },
    {
        phase: '初赛评审',
        time: '2025年10月12日-31日'
    },
    {
        phase: '复赛评审',
        time: '2025年11月10日-23日'
    },
    {
        phase: '总决赛',
        time: '2025年11月27日'
    },
    {
        phase: '颁奖典礼',
        time: '2025年12月'
    }
];

const ScheduleCard = ({ phase, time }) => {
    return (
        <div className="schedule-card">
            <div className="phase-name">{phase}</div>
            <div className="time-info">{time}</div>
        </div>
    );
};

const CompetitionSchedule = () => {
    return (
        <div className="competition-schedule">
            <TitleWithLines text={'赛事进程'} />
            <Flex wrap gap="middle" justify="center" style={{ marginTop: 40 }}>
                {scheduleData.map((item, index) => (
                    <ScheduleCard
                        key={index}
                        phase={item.phase}
                        time={item.time}
                    />
                ))}
            </Flex>
        </div>
    );
};

export default CompetitionSchedule;
