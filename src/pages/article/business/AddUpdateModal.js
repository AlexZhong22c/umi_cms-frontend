import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import { Form, Input, message, Select } from 'antd';
import service from '../service';
import useAddUpdateModal from '../../../hooks/useAddUpdateModal';

// 把依赖捕获进来：
function use({ changePage, refreshPage }) {
  /**
   * options
   */
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);
  useEffect(() => {
    service.listCategory().then(res => {
      setCategoryOptions(res.result.list);
    })
    service.listUser().then(res => {
      setAuthorOptions(res.result.list);
    })
  }, []);
  
  const FormDataModel = () => ({
    id: undefined,
    // https://github.com/ant-design/ant-design/issues/5768
    category: {},
    author: {},
    title: '',
    content: '',
  });
  const formRef = useRef();
  const [formData, setFormData] = useState(FormDataModel());
  
  const AddUpdateForm = React.forwardRef((props, ref) => {
    // 约定给到外面的ref:
    useImperativeHandle(ref, () => ({
      form: props.form
    }))
  
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} ref={props.forwardRef}
        >
        <Form.Item label="所属分类">
          {
            props.form.getFieldDecorator('category', {
              rules: [{ required: true, message: '请选择所属分类' }]
            })(
              <Select placeholder={'请选择所属分类'} allowClear>
                {
                  categoryOptions.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))
                }
              </Select>
            ) 
          }
        </Form.Item>
        <Form.Item label="作者">
          {
            props.form.getFieldDecorator('author', {
              rules: [{ required: true, message: '请选择作者' }]
            })(
              <Select placeholder={'请选择作者'} allowClear>
                {
                  authorOptions.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.username}
                    </Select.Option>
                  ))
                }
              </Select>
            ) 
          }
        </Form.Item>
        <Form.Item label="文章标题">
          {
            props.form.getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入文章标题' }]
            })(<Input placeholder="请输入文章标题" />) 
          }
        </Form.Item>
        <Form.Item label="文章内容">
          {
            props.form.getFieldDecorator('content', {
              rules: [{ required: true, message: '请输入文章内容' }]
            })(<Input.TextArea placeholder="请输入文章内容" />) 
          }
        </Form.Item>
      </Form>
    );
  });
  
  const WrappedAddUpdateForm = Form.create({
    mapPropsToFields(props) {
      const { formData } = props;
      return {
        category: Form.createFormField({
          value: formData.category.id
        }),
        author: Form.createFormField({
          value: formData.author.id
        }),
        title: Form.createFormField({
          value: formData.title
        }),
        content: Form.createFormField({
          value: formData.content
        }),
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

export default use;
