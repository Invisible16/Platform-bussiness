import { isNil, isEmpty } from 'lodash';
import { checkPermission } from 'utils';

export default function withAuthorization(WrappedComponent) {
  return class extends React.Component {
    render() {
      const { allow, current, updated } = this.props;
      if (isNil(allow) || isNil(current)) {
        return <WrappedComponent {...this.props} />;
      }
      return checkPermission(allow, current) ? (
        <WrappedComponent {...this.props} />
      ) : updated ? (
        <WrappedComponent {...this.props} disabled />
      ) : null;
    }
  };
}
