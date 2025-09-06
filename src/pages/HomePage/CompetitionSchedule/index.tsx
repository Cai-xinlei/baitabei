import React from 'react';
import { Flex, Typography } from 'antd';
import './index.css';
import TitleWithLines from '@/components/TitleWithLines'
import trackImages from '@/constants/imagesCover'

const scheduleData = [
    // {
    //     phase: '大赛启动',
    //     time: '2025年9月'
    // },
    {
        phase: '项目征集',
        time: '2025年9月-10月'
    },
    {
        phase: '初赛评审',
        time: '2025年10月下旬'
    },
    {
        phase: '复赛评审',
        time: '2025年11月中旬'
    },
    {
        phase: '总决赛',
        time: '2025年11月底'
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
            <TitleWithLines text={'赛事赛程'} />
            {/* <Flex wrap gap="middle" justify="center" style={{ marginTop: 20 }}>
                {scheduleData.map((item, index) => (
                    <ScheduleCard
                        key={index}
                        phase={item.phase}
                        time={item.time}
                    />
                ))}
            </Flex> */}
            <img style={{ maxHeight: '100px', margin: '10px auto' }} src={trackImages.saicheng} />
        </div>
    );
};

export default CompetitionSchedule;
