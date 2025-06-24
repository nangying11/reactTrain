
import React from 'react'
// 高阶组件：为任何组件添加渲染日志功能
const withLogger = (WrappedComponent) => {
  // 返回一个新组件
  return function WithLogger(props) {
    console.log(props);
    console.log(props);
    // 组件挂载时记录
    React.useEffect(() => {
      console.log(`组件 ${WrappedComponent.name} 已挂载`);
      
      // 组件卸载时记录
      return () => {
        console.log(`组件 ${WrappedComponent.name} 已卸载`);
      };
    }, []);

    // 每次更新时记录
    React.useEffect(() => {
      console.log(`组件 ${WrappedComponent.name} 更新了`, props);
    });

    // 渲染原始组件并传递所有props
    return <WrappedComponent {...props} />;
  };
};

// 使用示例
const MyButton = ({ label }) => <button>{label}</button>;
const ButtonWithLogger = withLogger(MyButton);

export default ButtonWithLogger