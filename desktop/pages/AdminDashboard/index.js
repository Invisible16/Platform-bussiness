import Head from 'next/head';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Card, Row, Col, Table, Tag } from 'antd';

import AdminLayout1 from 'layouts/AdminLayout1';
import withAuthorization from 'components/withAuthorization';
import withAuthentication from 'components/withAuthentication';
import createRoutes from 'routes';
import s from './styles.css';

const { Router, Link } = createRoutes();

class AdminDashboard extends React.Component {
  static async getInitialProps({ store, req, res }) {
    const { dispatch } = store;
    return {};
  }

  render() {
    return (
      <AdminLayout1 className={s.root} title="Dashboard" selectedKeys={['admin-dashboard']}>
        <Head>
          <title>Dashboard</title>
        </Head>
        <Row gutter={16}>
          <Col span={12} />
          <Col span={12} />
        </Row>
        <Row gutter={16}>
          <Col span={12} />
          <Col span={12} />
        </Row>
      </AdminLayout1>
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
)(withRouter(withAuthentication(AdminDashboard, ['admin', 'user'])));
