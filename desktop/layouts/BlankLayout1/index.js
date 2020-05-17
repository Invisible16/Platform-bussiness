import classNames from 'classnames';
import NProgress from 'nprogress';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Head from 'next/head';
import { Layout } from 'antd';

import createRoutes from 'routes';
import s from './styles.css';

const { Content } = Layout;
const { Router } = createRoutes();

class BlankLayout1 extends React.Component {
  componentDidMount() {
    Router.onRouteChangeStart = url => {
      NProgress.start();
    };
    Router.onRouteChangeComplete = url => {
      NProgress.done();
    };
    Router.onRouteChangeError = (err, url) => {};
  }

  render() {
    const { children, className } = this.props;

    return (
      <Layout className={classNames(s.root, className)}>
        <Head>
          <link rel="stylesheet" href="/static/styles/blank-layout.css" />
        </Head>
        <Content className={s.content}>{children}</Content>
      </Layout>
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
)(withRouter(BlankLayout1));
