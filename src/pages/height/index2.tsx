import React from 'react'
// 高阶组件：检查用户认证状态
const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    
    // 模拟检查登录状态
    React.useEffect(() => {
      // 实际项目中这里可能是API请求或检查localStorage
      const checkAuth = async () => {
        // 模拟异步检查
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsAuthenticated(false); // 改为false测试未登录状态
      };
      
      checkAuth();
    }, []);

    if (!isAuthenticated) {
      return (
        <div className="auth-error">
          <p>请先登录！</p>
          <button onClick={() => setIsAuthenticated(true)}>模拟登录</button>
        </div>
      );
    }

    // 用户已认证，渲染原始组件
    return <WrappedComponent {...props} />;
  };
};

// 使用示例
const ProfilePage = () => <div>用户个人资料页面</div>;
const ProtectedProfile = withAuth(ProfilePage);

export default ProtectedProfile