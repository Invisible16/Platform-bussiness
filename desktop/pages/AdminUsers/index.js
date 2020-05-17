import { isNil, isEmpty, debounce } from 'lodash';
import Head from 'next/head';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  message,
  Card,
  Row,
  Col,
  Table,
  Form,
  Input,
  Button,
  Icon,
  InputNumber,
  Select,
  Tag,
  Popconfirm,
  Modal,
  List,
  Spin,
  DatePicker,
  Checkbox
} from 'antd';

import AdminLayout1 from 'layouts/AdminLayout1';
import { getUsers, createUser, updateUser, deleteUser, getStaffs } from 'actions/admin-users';
import withAuthorization from 'components/withAuthorization';
import withAuthentication from 'components/withAuthentication';
import createRoutes from 'routes';
import s from './styles.css';

const { Option } = Select;
const { Router } = createRoutes();

class AdminUsers extends React.Component {
  static async getInitialProps({ store, req, res }) {
    const { dispatch } = store;
    return {};
  }

  state = {
    formVals: {
      id: '',
      email: '',
      name: '',
      password: '',
      permissions: '',
      status: 'disabled'
    },
    loading: false,
    visible: false,
    action: '',
    filters: {
      status: ['activated', 'disabled']
    }
  };

  handleClose = () => {
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { action, formVals } = this.state;
        if (action === 'create') {
          this.handleCreate(values);
        } else {
          this.handleUpdate(formVals.id, values);
        }
      }
    });
  };

  handleCreate = params => {
    const { createUser } = this.props;
    this.setState({ loading: true });
    createUser({
      params,
      callback: res => {
        this.setState({ loading: false });
        message.success('Tài khoản đã được tạo thành công');
        this.handleReset();
      },
      handleError: error => {
        this.setState({ loading: false });
        message.error(error.message);
      }
    });
  };

  handleUpdate = (id, params) => {
    const { updateUser } = this.props;
    this.setState({ loading: true });
    updateUser({
      id,
      params,
      callback: res => {
        this.setState({ loading: false });
        message.success('Cập nhật tài khoản thành công');
      },
      handleError: error => {
        this.setState({ loading: false });
        message.error(error.message);
      }
    });
  };

  handleDelete = id => {
    const { deleteUser } = this.props;
    this.setState({ loading: true });
    deleteUser({
      id,
      callback: res => {
        this.setState({ loading: false });
        message.success('Tài khoản đã được xóa thành công');
      },
      handleError: error => {
        this.setState({ loading: false });
        message.error(error.message);
      }
    });
  };

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formVals: {
        id: '',
        email: '',
        name: '',
        password: '',
        permissions: '',
        status: 'disabled'
      }
    });
  };

  handleTableChange = (pagination, filters, sorter, extra) => {
    filters.status = isEmpty(filters.status) ? ['activated', 'disabled'] : filters.status;
    this.setState({ filters });
    this.getData({
      $limit: pagination.pageSize,
      $skip: (pagination.current - 1) * pagination.pageSize,
      status: {
        $in: filters.status
      }
    });
  };

  handleShowAdd = e => {
    this.setState({
      visible: true,
      action: 'create'
    });
    this.handleReset();
  };

  handleShowUpdate = record => {
    this.setState({
      visible: true,
      action: 'update',
      formVals: {
        id: record.id,
        email: record.email,
        password: record.password,
        permissions: record.permissions,
        status: record.status,
        name: record.name
      }
    });
  };

  getData = (query = {}) => {
    this.setState({ loading: true });
    this.props.getUsers({
      query: {
        ...query,
        $select: ['id', 'email', 'permissions', 'status', 'name'],
        $sort: { createdAt: -1 }
      },
      callback: res => {
        this.setState({ loading: false });
      }
    });
  };

  componentDidMount() {
    const { pagination } = this.props;
    const { filters } = this.state;
    this.getData({
      $limit: pagination.pageSize,
      $skip: (pagination.current - 1) * pagination.pageSize,
      status: {
        $in: filters.status
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { created, updated, deleted, pagination } = this.props;
    const { filters } = this.state;
    const isCreated = prevProps.created !== created && !isNil(created.id);
    const isUpdated = prevProps.updated !== updated && !isNil(updated.id);
    const isDeleted = prevProps.deleted !== deleted && !isNil(deleted.id);
    if (isCreated || isUpdated || isDeleted) {
      this.getData({
        $limit: pagination.pageSize,
        $skip: (pagination.current - 1) * pagination.pageSize,
        status: {
          $in: filters.status
        }
      });
    }
  }

  render() {
    const { data, pagination, form } = this.props;
    const { loading, visible, formVals, action, filters } = this.state;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };

    const statusTags = {
      activated: <Tag color="green">Kích hoạt</Tag>,
      disabled: <Tag color="red">Khóa</Tag>
    };

    const columns = [
      {
        title: '',
        key: 'index',
        align: 'center',
        width: 60,
        render: (text, record, index) => index + 1
      },
      {
        title: 'Email',
        dataIndex: 'email'
      },
      {
        title: 'Tên',
        dataIndex: 'name'
      },
      {
        title: 'Phân quyền',
        key: 'permissions',
        render: record => record.permissions.toString()
      },
      {
        title: 'Trạng thái',
        width: 130,
        dataIndex: 'status',
        filters: [{ text: 'Kích hoạt', value: 'activated' }, { text: 'Khóa', value: 'disabled' }],
        filteredValue: filters.status,
        render: status => statusTags[status]
      },
      {
        title: '',
        render: (text, record, index) => (
          <div>
            <Button
              type="primary"
              size="small"
              disabled={loading}
              onClick={e => this.handleShowUpdate(record)}
              style={{ marginLeft: 10 }}
            >
              <Icon type="edit" />
              <span>Cập nhật</span>
            </Button>
            {!record.permissions.includes('admin') && (
              <Popconfirm
                title="Bạn thực sự muốn xóa?"
                onConfirm={e => this.handleDelete(record.id)}
                okText="Có"
                cancelText="Không"
              >
                <Button type="danger" size="small" disabled={loading} style={{ marginLeft: 10 }}>
                  <Icon type="delete" />
                  <span>Xóa</span>
                </Button>
              </Popconfirm>
            )}
          </div>
        )
      }
    ];

    return (
      <AdminLayout1 className={s.root} title="Tài khoản" selectedKeys={['admin-users']}>
        <Head>
          <title>Tài khoản</title>
        </Head>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button key="buttonAdd" type="primary" loading={loading} onClick={this.handleShowAdd}>
              Thêm tài khoản
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span={24}>
            <Table
              loading={loading}
              size="middle"
              bordered={true}
              columns={columns}
              dataSource={data}
              pagination={pagination}
              filters={filters}
              rowKey="id"
              onChange={this.handleTableChange}
            />
          </Col>
        </Row>
        <Modal
          title={action === 'create' ? `Thêm tài khoản` : `Cập nhật tài khoản: ${formVals.email}`}
          visible={visible}
          destroyOnClose
          onOk={this.handleSubmit}
          onCancel={this.handleClose}
          width={500}
          footer={[
            <Button
              key="buttonOk"
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              onClick={this.handleSubmit}
            >
              {action === 'create' ? `Thêm tài khoản` : `Cập nhật tài khoản`}
            </Button>,
            <Button
              key="buttonReset"
              loading={loading}
              disabled={loading}
              onClick={this.handleReset}
            >
              Làm lại
            </Button>,
            <Button
              key="buttonClose"
              loading={loading}
              disabled={loading}
              onClick={this.handleClose}
            >
              Đóng
            </Button>
          ]}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <Form.Item label="Email">
                  {getFieldDecorator(`email`, {
                    rules: [{ required: true, message: 'Cung cấp đầy đủ thông tin' }],
                    initialValue: formVals.email
                  })(<Input placeholder="johndoe@gmail.com" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Tên">
                  {getFieldDecorator(`name`, {
                    rules: [{ required: true, message: 'Cung cấp đầy đủ thông tin' }],
                    initialValue: formVals.name
                  })(<Input placeholder="Họ và tên" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Mật khẩu">
                  {getFieldDecorator(`password`, {
                    rules: [
                      { required: action === 'create', message: 'Cung cấp đầy đủ thông tin' }
                    ],
                    initialValue: formVals.password
                  })(<Input.Password placeholder="********" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Quyền hạn">
                  {getFieldDecorator(`permissions`, {
                    rules: [{ required: true, message: 'Cung cấp đầy đủ thông tin' }],
                    initialValue: formVals.permissions
                  })(
                    <Select placeholder="Tài khoản">
                      <Option key="user" value="user">
                        Nhân viên bình thường
                      </Option>
                      <Option key="admin" value="admin">
                        Quản lý cấp siêu cao
                      </Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label="Trạng thái">
                  {getFieldDecorator(`status`, {
                    rules: [{ required: true, message: 'Cung cấp đầy đủ thông tin' }],
                    initialValue: formVals.status
                  })(
                    <Select placeholder="Trạng thái">
                      <Option key="activated" value="activated">
                        Kích hoạt
                      </Option>
                      <Option key="disabled" value="disabled">
                        Khóa
                      </Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </AdminLayout1>
    );
  }
}

function mapStateToProps(state) {
  const { data, pagination, created, updated, deleted, staffs } = state.adminUsers;
  return {
    data,
    pagination,
    created,
    updated,
    deleted,
    staffs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: options => dispatch(getUsers(options)),
    createUser: options => dispatch(createUser(options)),
    updateUser: options => dispatch(updateUser(options)),
    deleteUser: options => dispatch(deleteUser(options)),
    getStaffs: options => dispatch(getStaffs(options))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Form.create({ name: 'admin-users' })(withAuthentication(AdminUsers, ['admin']))));
