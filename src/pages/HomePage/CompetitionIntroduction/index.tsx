import React from 'react';
import { Typography } from 'antd';
import './index.css';
import TitleWithLines from '@/components/TitleWithLines'
const { Paragraph } = Typography;

// 大赛综合介绍页面组件 - 高还原度版本
const CompetitionIntroductionPage = () => {
    return (
        <div className="competition-container" >
            <div className="competition-intro-page">
                {/* 大赛介绍部分 */}
                <div className="intro-section">
                    <TitleWithLines text={'大赛介绍'} />
                    <Paragraph className="intro-content">
                        2025第四届“白塔杯”文化创意大赛，以历届赛事“融合创新、平台赋能”的经验为基础，以“赋能+”为核心引擎，构建“赛事搭台+资源链接+产业联动+生态培育”的全链条发展模式，持续打造“集聚新人才、挖掘新资源、激发新动能、展示新成果、培育新业态、拉动新消费、实现新传播”的协同发展体系，致力于推动赛事成果向可运营文化产品和服务有效转化，丰富人民群众高品质文化消费供给，提升西城区历史文化资源价值，助力西城区文化产业生态圈实现场景创新、业态升级与可持续发展。
                    </Paragraph>
                </div>
            </div>
        </div>
    );
};

export default CompetitionIntroductionPage;