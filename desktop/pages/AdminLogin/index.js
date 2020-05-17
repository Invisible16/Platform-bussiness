import Cookies from 'js-cookie';
import { isNil, isEmpty } from 'lodash';
import Head from 'next/head';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Form, Input, Row, Col, Button, message, Icon, Card, Typography } from 'antd';

import { loginAdmin } from 'actions/common';
import { redirectOnServer, checkAccessToken, decrypt } from 'utils';
import BlankLayout1 from 'layouts/BlankLayout1';
import createRoutes from 'routes';
import s from './styles.css';

const { Title } = Typography;
const { Router } = createRoutes();

class AdminLogin extends React.Component {
  static async getInitialProps({ store, req, res, query }) {
    const { dispatch } = store;

    const accessToken = req ? req.cookies.accessToken : Cookies.get('accessToken');
    const redirectUrl = query.from ? decrypt(query.from, 'tikilive') : `${ADMIN_BASE}/dashboard`;

    const redirect = url => {
      if (req) {
        redirectOnServer({ res, url });
      } else {
        Router.pushRoute(url);
      }
    };

    if (accessToken) {
      try {
        await checkAccessToken({ accessToken, req });
        redirect(redirectUrl);
        return null;
      } catch (err) {
        console.log(err);
      }
    }

    return { redirectUrl };
  }

  state = {
    loading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { loginAdmin, redirectUrl } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        message.destroy();
        const theMessage = message.loading('Đang tải..', 0);
        loginAdmin({
          payload: values,
          callback: () => {
            this.setState({ loading: false });
            theMessage();
            message.success('Đăng nhập thành công', 0.5);
            Router.pushRoute(redirectUrl);
          },
          handleError: () => {
            this.setState({ loading: false });
            theMessage();
            message.error('Tài khoản đăng nhập không chính xác');
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return (
      <BlankLayout1 className={s.root}>
        <Head>
          <title>Đăng nhập</title>
        </Head>
        <Card
          title={
            <Title className={s.title} level={4}>
              Đăng nhập
            </Title>
          }
          className={s.card}
        >
          <Form onSubmit={this.handleSubmit} className={s.loginForm}>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Email không đúng định dạng'
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập Email'
                  }
                ]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" />}
                  placeholder="Email"
                  disabled={loading}
                />
              )}
            </Form.Item>
            <Form.Item label="Mật khẩu" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu'
                  }
                ]
              })(
                <Input.Password
                  size="large"
                  prefix={<Icon type="lock" />}
                  placeholder="Mật khẩu"
                  disabled={loading}
                />
              )}
            </Form.Item>
            <Form.Item className={s.formItem}>
              <a className={s.loginFormForgot} href="">
                Quên mật khẩu
              </a>
              <Button
                disabled={loading}
                loading={loading}
                type="primary"
                size="large"
                icon="login"
                htmlType="submit"
                className={s.loginFormButton}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </BlankLayout1>
    );
  }
}

function mapStateToProps(state) {
  const { accessToken } = state.common;
  return {
    accessToken
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginAdmin: query => dispatch(loginAdmin(query))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Form.create({ name: 'admin-login' })(AdminLogin)));
