import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const use = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({});

  const DetailModal = () => {
    return (
      <Modal
        title="查看文章"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setModalVisible(false)}>
            确定
          </Button>
        ]}
      >
        <h3>标题：</h3>
        <p>{item.title}</p>
        <h3>内容：</h3>
        <p>{item.content}</p>
      </Modal>
    )
  }
  const show = (itemArg) => {
    setItem(itemArg);
    setModalVisible(true);
  };

  return [
    DetailModal,
    show
  ];
};

export default use;
