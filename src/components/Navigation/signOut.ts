import Router from 'next/router';
import cookie from 'js-cookie';

import { ServerRequest, ServerResponse } from '@typeDefs/server';
import * as ROUTES from '@constants/routes';

export default (
  req?: ServerRequest,
  res?: ServerResponse,
  // TODO: other type than any
  apolloClient?: any
) => {
  const isServer = req || res;

  if (apolloClient) apolloClient.resetStore();

  if (isServer) {
    res?.writeHead(302, { Location: ROUTES.SIGN_IN });
    res?.end();
  } else {
    Router.push(ROUTES.SIGN_IN);
    cookie.remove('session');
  }
};
