import classNames from 'classnames';
import NProgress from 'nprogress';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/vi';
import numeral from 'numeral';
import 'numeral/locales/vi';
import Head from 'next/head';
import { Layout, Breadcrumb, Menu, Icon, Row, Col, Button, LocaleProvider, message } from 'antd';
import vi_VN from 'antd/lib/locale-provider/vi_VN';

import withAuthorization from 'components/withAuthorization';
import { logoutAdmin } from 'actions/common';
import createRoutes from 'routes';
import s from './styles.css';

moment.locale('vi');
numeral.locale('vi');
const { Content, Header, Sider, Footer } = Layout;
const { SubMenu } = Menu;
const AuthMenuItem = withAuthorization(Menu.Item);
const AuthSubMenu = withAuthorization(SubMenu);
const { Router, Link } = createRoutes();

class AdminLayout1 extends React.Component {
  componentDidMount() {
    Router.onRouteChangeStart = url => {
      NProgress.start();
    };
    Router.onRouteChangeComplete = url => {
      NProgress.done();
    };
    Router.onRouteChangeError = (err, url) => {};
  }

  state = {
    collapsed: false,
    loading: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleLogout = () => {
    this.setState({ loading: true });
    message.destroy();
    const theMessage = message.loading('Đang tải..', 0);
    this.props.logoutAdmin({
      callback: res => {
        this.setState({ loading: false });
        theMessage();
        message.success('Đã thoát thành công', 0.5);
        if (typeof document !== 'undefined') {
          document.cookie = `${
            AUTHENTICATION_CLIENT.cookie
          }=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;`;
        }
        Router.pushRoute('admin-login');
      },
      handleError: error => {
        this.setState({ loading: false });
        theMessage();
      }
    });
  };

  render() {
    const { children, className, title, selectedKeys, openKeys, admin } = this.props;
    const { collapsed, loading } = this.state;
    const logoClass = collapsed ? classNames(s.logo, s.logoSmall) : classNames(s.logo, s.logoFull);

    return (
      <LocaleProvider locale={vi_VN}>
        <Layout key={vi_VN} hasSider={true} className={classNames(s.root, className)}>
          <Head>
            <link rel="stylesheet" href="/static/styles/admin-layout-1.css" />
          </Head>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            className={s.slider}
          >
            <Link route="admin-dashboard">
              <a>
                <span className={logoClass} />
              </a>
            </Link>
            <Menu
              theme="dark"
              defaultSelectedKeys={selectedKeys}
              defaultOpenKeys={openKeys}
              mode="inline"
            >
              {/*Dashboard*/}
              <AuthMenuItem
                allow={['admin', 'user']}
                current={admin.permissions}
                key="admin-dashboard"
              >
                <Link route="admin-dashboard">
                  <a>
                    <Icon type="pie-chart" />
                    <span>Tổng quan</span>
                  </a>
                </Link>
              </AuthMenuItem>

              {/*User*/}
              <AuthMenuItem allow={['admin']} current={admin.permissions} key="admin-users">
                <Link route="admin-users">
                  <a>
                    <Icon type="team" />
                    <span>Tài khoản</span>
                  </a>
                </Link>
              </AuthMenuItem>
            </Menu>
          </Sider>
          <Layout>
            <Content className={classNames(s.content, className)}>
              <Row gutter={16}>
                <Col span={16}>
                  <Breadcrumb className={s.breadcrumb}>
                    <Breadcrumb.Item>GoodFlash</Breadcrumb.Item>
                    <Breadcrumb.Item>{title}</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
                <Col span={8} className={s.colInnerRight}>
                  <Button
                    type="primary"
                    className={s.buttonAccount}
                    icon="user"
                    onClick={e => Router.pushRoute('admin-account')}
                    disabled={loading}
                  >
                    Chào {admin.email}
                  </Button>
                  <Button
                    className={s.buttonLogout}
                    icon="poweroff"
                    onClick={this.handleLogout}
                    disabled={loading}
                    loading={loading}
                  >
                    Thoát
                  </Button>
                </Col>
              </Row>
              <div className={s.pageWrap}>{children}</div>
            </Content>
            <Footer className={s.footer} className={s.footer}>
              GoodFlash © 2019
            </Footer>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}

function mapStateToProps(state) {
  const { admin } = state.common;
  return {
    admin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAdmin: options => dispatch(logoutAdmin(options))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminLayout1));
