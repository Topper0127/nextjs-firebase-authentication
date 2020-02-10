import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Layout as AntdLayout } from 'antd';

import { StorefrontCourse } from '@generated/client';
import { GET_STOREFRONT_COURSE } from '@queries/storefront';
import { Session } from '@typeDefs/session';
import * as ROUTES from '@constants/routes';
import Layout from '@components/Layout';

import CheckoutWizard from './CheckoutWizard';

const StyledContent = styled(AntdLayout.Content)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 56px;
`;

interface CheckoutPageProps {
  data: {
    storefrontCourse: StorefrontCourse;
  };
}

type NextAuthPage = NextPage<CheckoutPageProps> & {
  isAuthorized: (session: Session) => boolean;
};

const CheckoutPage: NextAuthPage = ({ data }) => {
  const router = useRouter();

  React.useEffect(() => {
    router.prefetch(ROUTES.INDEX);
  });

  return (
    <Layout>
      <StyledContent>
        <CheckoutWizard storefrontCourse={data.storefrontCourse} />
      </StyledContent>
    </Layout>
  );
};

CheckoutPage.isAuthorized = (session: Session) => true;

CheckoutPage.getInitialProps = async ctx => {
  const { courseId, bundleId } = ctx.query;

  const { data } = await ctx.apolloClient.query({
    query: GET_STOREFRONT_COURSE,
    variables: {
      courseId,
      bundleId,
    },
  });

  return { data };
};

export default CheckoutPage;
