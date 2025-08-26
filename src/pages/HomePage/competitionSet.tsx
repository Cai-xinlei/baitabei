import React from 'react';
import { Typography } from 'antd';
import './competitionIntroduction.css';
import trackImages from '../../constants/imagesCover'

const { Title, Paragraph } = Typography;

// 大赛综合介绍页面组件 - 高还原度版本
const CompetitionIntroductionPage = () => {
    return (
        <div className="competition-container">
            <div className="competition-intro-page">
                {/* 大赛介绍部分 */}
                {/* <div className="intro-section">
                    <div className="competition-title-container">
                        <div className="title-line"></div>
                        <div className="title-text">大赛介绍</div>
                        <div className="title-line"></div>
                    </div>
                    <Paragraph className="intro-content">
                        2025年白塔杯文化创意大赛，以历届赛事“融合创新、平台赋能”的经验为基础，以“赋能+”为核心引擎，构建“赛事搭台+资源链接+产业联动+生态培育”的全链条发展模式，持续打造“集聚新人才、挖掘新资源、激发新动能、展示新成果、培育新业态、拉动新消费、实现新传播”的协同发展体系，致力于推动赛事成果向可运营文化产品和服务有效转化，丰富人民群众高品质文化消费供给，激活西城区历史文化资源价值，助力西城区文化产业生态圈实现场景创新、业态升级与可持续发展。
                    </Paragraph>
                </div> */}
                <div className="section-container">
                    <div className="competition-title-container">
                        <img className="section-img" src={trackImages.inxtbgImg} />
                        <div className="competition-title">奖项设置</div>
                        <img className="section-img" src={trackImages.inxtbgImg} />
                    </div>

                    <Paragraph className="section-content">
                        综合评选出一、二、三等奖和单项奖，各赛道设置优秀奖。共设置100个奖项，一等奖2名（奖金50000元），二等奖3名（奖金20000元），三等奖5名（奖金5000元）、单项奖20名（奖金3000元），赛道优秀奖70名。
                    </Paragraph>
                </div>
                {/* 大赛服务包部分 */}
                <div className="section-container">
                    <div className="competition-title-container">
                        <img className="section-img" src={trackImages.inxtbgImg} />
                        <div className="competition-title">奖励服务包</div>
                        <img className="section-img" src={trackImages.inxtbgImg} />
                    </div>

                    <Paragraph className="section-content">
                        设置大赛奖励服务包，对于赛中涌现出的具有典型性、示范性的优秀项目给予落地转化赋能。服务包主要包括政策支持、空间赋能、展览展示、融资对接、传播推广、上市辅导、渠道合作等内容。
                    </Paragraph>
                </div>
            </div>
        </div>
    );
};

export default CompetitionIntroductionPage;