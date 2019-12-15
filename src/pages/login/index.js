import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(
  state => ({
    isSignin: state.login.isSignin
  }),
  {
    signin: payload => ({ type: 'login/signin', payload }),
    login: payload => ({ type: 'login/login', payload }),
    turnOnSignin: () => ({ type: 'login/turnOnSignin' }),
    turnOffSignin: () => ({ type: 'login/turnOffSignin' })
  }
)

@Form.create()
class LoginForm extends Component {
  checkUsername = (rule, value, callback) => {
    if (!value) return callback('请输入用户名');      
    if (!/^[a-zA-Z][a-zA-Z0-9]{4,19}$/.test(value))
      return callback('用户名应为5~20位英文或数字，不以数字开头');

    callback();
  }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      // 在页面上自动就会显示校验提示。
      if (err) return;

      // values也可以这样获得：
      // const values = this.props.form.getFieldsValue();
      if (this.props.isSignin) {
        this.props.signin(values);
      } else {
        this.props.login(values);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const initialValues = {
      username: 'user1',
      password: '123456',
      email: '12345@qq.com'
    };
    const usernamePlaceholder = this.props.isSignin ? `例如：${initialValues.username}` : '请输入用户名';
    const passwordPlaceholder = this.props.isSignin ? `例如：${initialValues.password}` : '请输入密码';
    const emailPlaceholder = this.props.isSignin ? `例如：${initialValues.email}` : '请输入邮箱';
    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <Form.Item>
          {
            getFieldDecorator('username', {
              initialValue: initialValues.username,
              rules: [{ validator: this.checkUsername }]
            })(
              <Input
                prefix={
                  <Icon type="user" className={styles['login-form-icon']} />
                }
                placeholder={usernamePlaceholder}
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              initialValue: initialValues.password,
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input type="password"
                prefix={
                  <Icon type="lock" className={styles['login-form-icon']} />
                }
                placeholder={passwordPlaceholder} 
              />
            )
          }
        </Form.Item>
        {
          this.props.isSignin && <Form.Item>
            {
              getFieldDecorator('email', {
                initialValue: initialValues.email,
                rules: [{ required: true, message: '请输入邮箱' }]
              })(
                <Input type="email"
                  prefix={
                    <Icon type="mail" className={styles['login-form-icon']} />
                  }
                  placeholder={emailPlaceholder} 
                />
              )
            }
          </Form.Item>
        }

        <Form.Item>
          <Button type="primary" style={{marginRight: '16px'}} htmlType="submit"
            className={styles['login-form-button']}>
            {this.props.isSignin ? '注册' : '登录'}
          </Button>
          <a onClick={this.props.isSignin ? this.props.turnOffSignin : this.props.turnOnSignin}>
            {this.props.isSignin ? '已有账号，直接登录?' : '若没有账号，请注册'}
          </a>
        </Form.Item>
      </Form>
    )
  }
}

export default class Login extends Component {
  render() {
    return (
      <div className={styles['login-page']}>
        <div className={styles['login-form-container']}>
          <h1>umi-egg-cms</h1>
          <LoginForm />
        </div>
      </div>
    )
  }
}