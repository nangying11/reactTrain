import React from 'react'
// 高阶组件：处理数据加载状态
const withDataLoader = (fetchData, dataName = "data") => (WrappedComponent) => {
  return function WithDataLoader(props) {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          const result = await fetchData(props); // 传递props以便使用参数
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      loadData();
    }, [props]); // 当props变化时重新加载

    if (loading) return <div>加载中...</div>;
    if (error) return <div>错误: {error}</div>;
    
    // 创建要传递的新props
    const newProps = {
      ...props,
      [dataName]: data
    };
console.log(newProps,props)
    return <WrappedComponent {...newProps} />;
  };
};

// 使用示例
// 1. 创建数据获取函数
const fetchUserData = async () => {
  // 模拟API请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { name: "张三", age: 28, email: "zhangsan@example.com" };
};

// 2. 创建展示组件
const UserProfile = ({ userData }) => (
  <div>
    <h2>用户资料</h2>
    <p>姓名: {userData.name}</p>
    <p>年龄: {userData.age}</p>
    <p>邮箱: {userData.email}</p>
  </div>
);

// 3. 应用高阶组件
const UserProfileWithData = withDataLoader(fetchUserData, "userData")(UserProfile);


export default UserProfileWithData