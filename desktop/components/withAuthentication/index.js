import Cookies from 'js-cookie';
import { isNil, isEmpty } from 'lodash';
import createRoutes from 'routes';
import { checkAccessToken, redirectOnServer, checkPermission, encrypt } from 'utils';
import { getAdmin } from 'actions/common';

const { Router } = createRoutes();

export default function withAuthentication(PageComponent, allow = []) {
  return class Authentication extends React.Component {
    static async getInitialProps(ctx) {
      const { store, req, res, asPath } = ctx;
      const { dispatch } = store;

      const accessToken = req ? req.cookies.accessToken : Cookies.get('accessToken');
      const redirectUrl = `${ADMIN_BASE}/login/${encrypt(asPath, 'tikilive')}`;

      const redirect = url => {
        if (req) {
          redirectOnServer({ res, url });
        } else {
          Router.pushRoute(url);
        }
      };

      if (isNil(accessToken)) {
        redirect(redirectUrl);
        return null;
      }

      try {
        const json = await checkAccessToken({ accessToken, req });
        dispatch(getAdmin(json));

        if (!isEmpty(allow)) {
          const isAllow = checkPermission(allow, json.permissions);
          if (!isAllow) {
            redirect(`${ADMIN_BASE}/dashboard`);
            return null;
          }
        }
      } catch (err) {
        console.log(err);
        redirect(redirectUrl);
        return null;
      }

      const pageProps = PageComponent.getInitialProps && (await PageComponent.getInitialProps(ctx));
      return { ...pageProps };
    }

    render() {
      return <PageComponent {...this.props} />;
    }
  };
}
