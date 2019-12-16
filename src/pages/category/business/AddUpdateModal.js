import React, { useState, useRef, useImperativeHandle } from 'react';
import { Form, Input, message } from 'antd';
import service from '../service';
import useAddUpdateModal from '../../../hooks/useAddUpdateModal';

// 把依赖捕获进来：
function Install({ changePage, refreshPage }) {
  const FormDataModel = () => ({
    id: undefined,
    name: ''
  });
  const formRef = useRef();
  const [formData, setFormData] = useState(FormDataModel());
  
  const AddUpdateForm = React.forwardRef((props, ref) => {
    // 约定给到外面的ref:
    // 如何拿到“在函数组件中的”组件实例:
    // https://github.com/ant-design/ant-design/pull/19937/files/e22830985c025a4979239b42e46a12dc96b32b87#diff-c228e588c2e28d43fdccf78a6045206b
    useImperativeHandle(ref, () => ({
      form: props.form
    }))
  
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} ref={props.forwardRef}
        >
        <Form.Item label="分类名称">
          {
            props.form.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入分类名称' }]
            })(<Input placeholder="请输入分类名称" />) 
          }
        </Form.Item>
      </Form>
    );
  });
  
  const WrappedAddUpdateForm = Form.create({
    mapPropsToFields(props) {
      const { formData } = props;
      return {
        name: Form.createFormField({
          value: formData.name
        })
      }
  
    }
  })(AddUpdateForm);
  
  function onSubmitModal() {
    const form = (formRef.current || {}).form;
    form.validateFields((err, values) => {
      // 在页面上自动就会显示校验提示。
      if (err) return;
      // 如果要修改字段就需改params而不是values:
      const params = JSON.parse(JSON.stringify(values));
      let fn;
      const id = formData.id;
      if (id) {
        params.id = id;
        fn = service.update;
      } else {
        fn = service.add;
      }
      fn(params).then(() => {
        setModalVisible(false);
        if (id) {
          refreshPage();
        } else {
          changePage(1);
        }
        message.success('操作成功');
      });
    });
  }
  const onShowModal = (formDataArg = {}) => {
    const appendFormFields = JSON.parse(JSON.stringify(formDataArg));
    setFormData({
      ...FormDataModel(),
      ...appendFormFields
    });
    setModalVisible(true);
  };
  const modalProps = {
    title: formData.id ? '编辑' : '新建'
  };
  const {
    AddUpdateModal,
    setModalVisible
  } = useAddUpdateModal(
    <WrappedAddUpdateForm wrappedComponentRef={formRef} formData={formData} />,
    modalProps,
    onSubmitModal
  );

  return [
    AddUpdateModal,
    {
      onShowModal
    }
  ]
}

export default Install;
