import React from 'react';
import './cooperationPartners.css';

interface PartnerData {
    columns: string[][];
}

const CooperationPartners: React.FC = () => {
    // 合作单位数据，按三列分组并添加类型定义
    const partners: PartnerData['columns'] = [
        [
            "中国传媒大学",
            "中国动画学会",
            "世界城市旅游联合会（待定）",
            "中国版权链版权创意服务平台",

        ],
        [
            "北京市西城区文化和旅游产业协会",
            "北京演出娱乐行业协会",
            "北京文兴格致文化科技基金",
            "腾讯SSV数字文化实验室",

        ],
        [

            "北京沸铜科技有限公司",
            "《北京青年报》",
            "《时尚芭莎》了不起的非遗",
        ]
    ];

    return (
        <div className="cooperation-page">
            <div className="cooperation-container">
                {/* 标题区域 */}
                <div className="title-section">
                    <div className="title-line"></div>
                    <h1 className="main-title">大赛支持单位</h1>
                    <div className="title-line"></div>
                </div>

                {/* 合作单位列表 */}
                <div className="partners-grid">
                    {partners.map((column, columnIndex) => (
                        <div key={columnIndex} className="partner-column">
                            {column.map((partner, index) => (
                                <div key={index} className="partner-item">
                                    {partner}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CooperationPartners;