
import React from 'react';
import { Flex, Typography } from 'antd';
import './index.css';
const { Title, Text } = Typography;
import { ExpertList } from '@/constants/tracks'
import TitleWithLines from '@/components/TitleWithLines'


const HoverImageZoomPage = () => {
    return (
        <div className="page-container">
            <div className="content-wrapper">
                <TitleWithLines text={'专家评委'} />
                <div className="image-grid" >
                    {ExpertList.map((item) => (
                        <div key={item.id} className="person-card">
                            <div className="image-container">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="person-image"
                                />
                                <div className="text-overlay">
                                    <Title level={4} className="person-name">{item.name}</Title>
                                    <Text className="person-track">{item.track}</Text>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HoverImageZoomPage;
