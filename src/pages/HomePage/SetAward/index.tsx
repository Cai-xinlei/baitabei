import React from 'react';
import { Flex, Typography } from 'antd';
import './index.css';
import TitleWithLines from '@/components/TitleWithLines'

const { Title } = Typography;

const scheduleData = [
    {
        prize: '一等奖 2名',
        bonus: '奖金50000元',
    },
    {
        prize: '二等奖 3名',
        bonus: '奖金20000元',
    },
    {
        prize: '三等奖 5名',
        bonus: '奖金5000元',
    },
    {
        prize: '单项奖 20名',
        bonus: '奖金3000元',
    },
    {
        prize: '赛道优秀奖 70名',
        bonus: '颁发证书',
    },

];

const ScheduleCard = ({ bonus, prize }) => {
    return (
        <div className="schedule-card">
            <div className="time-info">{prize}</div>
            <div className="phase-name">{bonus}</div>
        </div>
    );
};

const CompetitionSchedule = () => {
    return (
        <div className="setAward-schedule">
            <TitleWithLines text={'奖项设置'} />
            <div className='setAward-introduce' style={{ margin: '10px auto' }}>
                综合评选出一、二、三等奖和单项奖，各赛道设置优秀奖
            </div>
            <Flex wrap gap="middle" justify="center" style={{ marginBottom: 24 }} >
                {scheduleData.map((item, index) => (
                    <ScheduleCard
                        key={index}
                        bonus={item.bonus}
                        prize={item.prize}
                    />
                ))}
            </Flex>
            <div style={{ color: '#333' }}>
                设置大赛奖励服务包，对于赛中涌现出的具有典型性、示范性的优秀项目提供全方位落地转化支持与赋能。服务包主要包括政策咨询与申报支持、优质空间资源对接与入驻支持、成果展览展示、投融资对接服务、全媒体传播推广、上市辅导及资本市场对接、产业链渠道合作等，助力优秀项目实现从创意到产业化的高效转化与可持续发展。
            </div>
            <div className='setAward-introduce'>
                主要包括政策支持、空间赋能、展览展示、融资对接、传播推广、上市辅导、渠道合作等内容
            </div>
        </div>
    );
};

export default CompetitionSchedule;
