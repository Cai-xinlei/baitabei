import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import zhCN from 'antd/locale/zh_CN';
import { baitabeiTheme } from './theme';
import AppLayout from './components/Layout/AppLayout';
import HomePage from './pages/HomePage';
import TracksPage from './pages/TracksPage';
import TrackDetailPage from './pages/TrackDetailPage';
import RegisterPage from './pages/RegisterPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
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
              <Route path="/baitabei/home" element={<HomePage />} />
              <Route path="/baitabei/tracks" element={<TracksPage />} />
              <Route path="/baitabei/tracks/:trackId" element={<TrackDetailPage />} />
              <Route path="/baitabei/register" element={<RegisterPage />} />
              <Route path="/baitabei/news" element={<NewsPage />} />
              <Route path="/baitabei/news/:newsId" element={<NewsDetailPage />} />
              <Route path="/baitabei/about" element={<AboutPage />} />
              <Route path="/baitabei/login" element={<LoginPage />} />
              <Route path="/baitabei/profile" element={<ProfilePage />} />
            </Routes>
          </AppLayout>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;