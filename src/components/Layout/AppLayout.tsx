import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Grid, Avatar, Dropdown, Space, message } from 'antd';
import { MenuOutlined, HomeOutlined, TrophyOutlined, FileTextOutlined, InfoCircleOutlined, FormOutlined, UserOutlined, LoginOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NAVIGATION_MENU } from '../../constants';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    // 检查用户登录状态
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // 菜单图标映射
  const menuIcons: { [key: string]: React.ReactNode } = {
    home: <HomeOutlined />,
    tracks: <TrophyOutlined />,
    news: <FileTextOutlined />,
    about: <InfoCircleOutlined />,
    register: <FormOutlined />
  };

  // 菜单项
  const menuItems = NAVIGATION_MENU.map(item => ({
    key: item.key,
    icon: menuIcons[item.key],
    label: (
      <Link to={item.path} onClick={() => setDrawerVisible(false)}>
        {item.label}
      </Link>
    )
  }));

  // 当前选中的菜单项
  const selectedKeys = NAVIGATION_MENU
    .filter(item => location.pathname === item.path ||
      (item.path !== '/' && location.pathname.startsWith(item.path)))
    .map(item => item.key);

  // 处理登出
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    message.success('已成功登出');
    navigate('/baitabei/login');
  };

  // 用户菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/baitabei/profile">个人中心</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账户设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      {/* 页头 */}
      <Header className="bg-white shadow-md px-4 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          {/* Logo区域 */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            >
              白
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 m-0">
                2025年第四届“白塔杯”文化创意大赛
              </h1>
              <p className="text-sm text-gray-600 m-0">文化引领·创意西城</p>
            </div>
          </Link>

          {/* 桌面端导航 */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              <Menu
                mode="horizontal"
                selectedKeys={selectedKeys}
                items={menuItems}
                className="border-none bg-transparent"
                style={{ lineHeight: '80px' }}
              />

              {/* 用户状态 */}
              {user ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                  <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                    <Avatar
                      size="small"
                      src={user.avatar}
                      icon={<UserOutlined />}
                    />
                    <span className="text-gray-700">{user.realName || user.username}</span>
                  </Space>
                </Dropdown>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/baitabei/login">
                    <Button type="default" icon={<LoginOutlined />}>
                      登录
                    </Button>
                  </Link>
                  <Link to="/baitabei/register">
                    <Button type="primary" className="bg-red-600 border-red-600 hover:bg-red-700">
                      报名参赛
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 移动端菜单按钮和用户状态 */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              {user && (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft">
                  <Avatar
                    size="small"
                    src={user.avatar}
                    icon={<UserOutlined />}
                    className="cursor-pointer"
                  />
                </Dropdown>
              )}
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
                className="text-lg"
              />
            </div>
          )}
        </div>
      </Header>

      {/* 移动端抽屉菜单 */}
      <Drawer
        title={(
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded flex items-center justify-center text-white font-bold text-sm">
              白
            </div>
            <span>白塔杯文化创意大赛</span>
          </div>
        )}
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <Menu
          mode="vertical"
          selectedKeys={selectedKeys}
          items={menuItems}
          className="border-none mb-4"
        />

        {/* 移动端用户状态 */}
        {!user && (
          <div className="px-4 space-y-2">
            <Link to="/baitabei/login" onClick={() => setDrawerVisible(false)}>
              <Button type="default" icon={<LoginOutlined />} block>
                登录
              </Button>
            </Link>
            <Link to="/baitabei/register" onClick={() => setDrawerVisible(false)}>
              <Button type="primary" className="bg-red-600 border-red-600" block>
                报名参赛
              </Button>
            </Link>
          </div>
        )}
      </Drawer>

      {/* 主内容区 */}
      <Content className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </Content>

      {/* 页脚 */}
      <Footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 大赛信息 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">2025年第四届“白塔杯”文化创意大赛</h3>
              <p className="text-gray-300 mb-2">文化引领·创意西城</p>
              <p className="text-gray-300">聚焦“数字文化创新”与“消费新场景重构”</p>
            </div>

            {/* 联系方式 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">联系我们</h3>
              <p className="text-gray-300 mb-2">咨询电话：15712909137</p>
              <p className="text-gray-300 mb-2">联系电话：010-83160689</p>
              <p className="text-gray-300">工作时间：工作日 9:00-18:00</p>
            </div>

            {/* 主办单位 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">主办单位</h3>
              <p className="text-gray-300 mb-2">北京市西城区人民政府</p>
              <p className="text-gray-300 mb-2">中共北京市西城区委宣传部</p>
              <p className="text-gray-300">北京市西城区文化产业发展促进中心</p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 北京市西城区人民政府. 版权所有 | 京ICP备xxxxxxxx号
            </p>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default AppLayout;