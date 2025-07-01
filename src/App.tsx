import React, { useEffect, useState ,useRef} from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  // 固定count为0，不再更新
  useEffect(() => {
    setCount(0);
  }, []);
  const handleClick = () => {
    setTimeout(() => {
      // ❶ 使用对象字面量强制立即求值（显示闭包中的真实值）
      console.log("闭包中的count:", { count });
      
      // ❷ 通过闭包间接访问（可能被控制台延迟求值）
      console.log("直接打印count:", count);
       console.log("冻结值:", count);      
    }, 2000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 100)}>尝试更新</button>
      <button onClick={handleClick}>Test Closure</button>
    </div>
  );
}

export default App;
