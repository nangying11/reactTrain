import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// 模态框组件的 props 类型定义
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

// 模态框组件
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  // 创建一个 div 作为模态框的容器
  const modalRoot = document.getElementById('modal-root') || document.body;
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';

  // 组件挂载后将容器添加到 DOM
  React.useEffect(() => {
    modalRoot.appendChild(modalContainer);
    
    // 组件卸载时移除容器
    return () => {
      modalRoot.removeChild(modalContainer);
    };
  }, [modalRoot]);

  // 使用 createPortal 将内容传送到指定 DOM 节点
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div>{content}</div>
        <button onClick={onClose}>关闭</button>
      </div>
    </div>,
    modalContainer
  );
};

// 父组件
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <h1>React Teleport 示例</h1>
      <button onClick={() => setIsModalOpen(true)}>打开模态框</button>

      {/* 使用模态框组件 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="欢迎使用"
        content={<p>这是一个使用 React Portal 实现的模态框。</p>}
      />
    </div>
  );
};

export default App;