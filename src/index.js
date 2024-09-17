import React from 'react';
import ReactDOM from 'react-dom/client'; // 从 'react-dom/client' 导入 createRoot
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById('root'); // 获取根元素
const root = ReactDOM.createRoot(rootElement); // 使用 createRoot 创建根

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

