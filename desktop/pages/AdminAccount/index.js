import Head from 'next/head';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Card, Row, Col, Table, Tag, Tabs, List, Avatar } from 'antd';

import AdminLayout1 from 'layouts/AdminLayout1';
import withAuthentication from 'components/withAuthentication';
import createRoutes from 'routes';
import s from './styles.css';

const { TabPane } = Tabs;
const { Router, Link } = createRoutes();

class AdminAccount extends React.Component {
  static async getInitialProps({ store, req, res }) {
    const { dispatch } = store;
    return {};
  }

  state = {
    data: []
  };

  parseData = () => {
    const { admin } = this.props;

    const statusTags = {
      activated: <Tag color="green">Kích hoạt</Tag>,
      disabled: <Tag color="red">Khóa</Tag>
    };

    const data = [
      {
        title: 'Tài khoản',
        description: admin.email
      },
      {
        title: 'Tên',
        description: admin.name
      },
      {
        title: 'Trạng thái',
        description: statusTags[admin.status]
      }
    ];
    this.setState({ data });
  };

  componentDidMount() {
    const { parseData } = this;
    parseData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { admin } = this.props;
    const { parseData } = this;

    if (prevProps.admin !== admin) {
      parseData();
    }
  }

  render() {
    const { data } = this.state;

    return (
      <AdminLayout1 className={s.root} title="Tài khoản của bạn">
        <Head>
          <title>Tài khoản của bạn</title>
        </Head>
        <Row gutter={16}>
          <Col span={24}>
            <div className={s.cardContainer}>
              <Tabs type="line">
                <TabPane tab="Thông tin chung" key="profile">
                  <List
                    grid={{ gutter: 16, column: 3 }}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar size={50} icon="user" />}
                          title={item.title}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="Đổi mật khẩu" key="change-password" />
              </Tabs>
            </div>
          </Col>
        </Row>
      </AdminLayout1>
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAuthentication(AdminAccount, ['admin', 'user'])));
