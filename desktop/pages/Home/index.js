import Head from 'next/head';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Alert } from 'antd';

import BlankLayout1 from 'layouts/BlankLayout1';
import { redirectOnServer, checkAccessToken } from 'utils';
import createRoutes from 'routes';
import s from './styles.css';

const { Router } = createRoutes();

class Home extends React.Component {
  static async getInitialProps({ store, req, res }) {
    const { dispatch } = store;

    if (req) {
      const { accessToken } = req.cookies;
      if (accessToken) {
        try {
          await checkAccessToken({ accessToken });
          redirectOnServer({ res, url: `${ADMIN_BASE}/dashboard` });
        } catch (err) {
          console.log(err);
          redirectOnServer({ res, url: `${ADMIN_BASE}/login` });
        }
      } else {
        redirectOnServer({ res, url: `${ADMIN_BASE}/login` });
      }
    }

    return {};
  }

  render() {
    return (
      <BlankLayout1 className={s.root}>
        <Head>
          <title>VietCanvas</title>
        </Head>
        <Alert
          message="Thông báo"
          description="Bạn không có quyền truy cập trang này."
          type="warning"
        />
      </BlankLayout1>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
