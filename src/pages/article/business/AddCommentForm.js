import React, { useRef, useImperativeHandle } from 'react';
import { Button, Row, Col, Form, Input, message } from 'antd';
import service from '../service';
/**
 * 
 * @param {Object} article
 * @param {Function} onSuccess
 */
const use = ({article, onSuccess}) => {
  const formRef = useRef();

  const onAddComment = async () => {
    const userInfo = window.g_app._store.getState().userInfo;
    const form = (formRef.current || {}).form;
    const { content } = form.getFieldsValue();
    if (!content) {
      return message.warning('请输入评论内容');
    }
    
    const res = await service.addComment({
      id: article.id,
      username: userInfo.username,
      content
    })
    message.success('操作成功');
    onSuccess(res.result.list);
  };

  const AddForm = React.forwardRef((props, ref) => {
    const { forwardRef, form } = props;
    const { getFieldDecorator } = form;
  
    // 约定给到外面的ref，以及ref对象中的字段:
    useImperativeHandle(ref, () => ({ form }))
  
    return (
      <Form ref={forwardRef} style={{ marginTop: 15 }}>
        <Form.Item>
          <Row gutter={8}>
            <Col span={19}>
              {
                getFieldDecorator('content')(
                  <Input placeholder="请输入评论内容" onPressEnter={() => onAddComment()} />
                )
              }
            </Col>
            <Col span={5}>
              <Button type="primary" onClick={() => onAddComment()}>提交</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    )
  });

  const WrappedAddForm = Form.create()(AddForm);

  const AddCommentForm = () => {
    return (
      <WrappedAddForm wrappedComponentRef={formRef} />
    )
  }
  return [
    AddCommentForm
  ];
};

export default use;
