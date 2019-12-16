import React, { useState } from 'react';
import { Modal } from 'antd';

const useAddUpdateModal = (children, modalProps, onSubmitModal) => {
  const [modalVisible, setModalVisible] = useState(false);

  const AddUpdateModal = () => {
    return (
      <Modal
        visible={modalVisible}
        onOk={() => onSubmitModal()}
        onCancel={() => setModalVisible(false)}
        maskClosable={false}
        {...modalProps}
      >
        {children}
      </Modal>
    )
  }

  return {
    AddUpdateModal,
    setModalVisible
  };
};

export default useAddUpdateModal;
