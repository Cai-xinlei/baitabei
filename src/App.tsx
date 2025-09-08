import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import zhCN from 'antd/locale/zh_CN';
import { baitabeiTheme } from './theme';
import AppLayout from './components/Layout/AppLayout';
import HomePage from './pages/HomePage/index';
import TracksPage from './pages/TracksPage';
import TrackDetailPage from './pages/TrackDetailPage';
import RegisterPage from './pages/RegisterPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage/index';
import NewsDetailPage from './pages/NewsDetailPage';
import 'dayjs/locale/zh-cn';

// 创建查询客户端
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 10 * 60 * 1000, // 10分钟
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={baitabeiTheme}
        locale={zhCN}
      >
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/tracks" element={<TracksPage />} />
              <Route path="/tracks/:trackId" element={<TrackDetailPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:newsId" element={<NewsDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />

            </Routes>
          </AppLayout>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;