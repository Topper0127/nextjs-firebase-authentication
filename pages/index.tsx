import Layout from '@components/Layout';
import withAuthorization from '@components/Session/withAuthorization';

import { Session } from '@typeDefs/session';

const DashboardPage = () => {
  return <Layout>Protected Dashboard</Layout>;
};

const condition = (session: Session): boolean => !!session.authUser;

export default withAuthorization(condition)(DashboardPage);
