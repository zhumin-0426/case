import React, { useState,useEffect } from 'react';

function App() {
  // state hook
  // useState唯一的参数就是设置state变量count的初始值0
  // setCount为改变state变量的方法
  const [count, setCount] = useState(0)
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;
