import { ThemeConfig } from 'antd';

// 2025年白塔杯主题配置
export const baitabeiTheme: ThemeConfig = {
  token: {
    // 主色调：中国红
    colorPrimary: '#C41E3A',
    // 辅助色：墨绿
    colorSuccess: '#2F5233',
    // 强调色：金色
    colorWarning: '#FFD700',
    colorError: '#FF4D4F',

    // 布局配置
    borderRadius: 8,
    wireframe: false,

    // 字体配置
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',

    // 颜色配置
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorText: '#333333',
    colorTextSecondary: '#666666',

    // 阴影配置
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  },
  components: {
    Button: {
      primaryShadow: '0 2px 0 rgba(196, 30, 58, 0.1)',
      borderRadius: 8,
    },
    Card: {
      borderRadiusLG: 12,
      paddingLG: 24,
    },
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 80,
    },
    Menu: {
      itemBg: 'transparent',
      activeBarBorderWidth: 0,
    },
    Typography: {
      titleMarginBottom: 16,
      titleMarginTop: 16,
    },
  },
};

// 移动端媒体查询
export const mediaQueries = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

// 响应式断点
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};