import Link from 'next/link';

import Layout from '@components/Layout';

const SignInPage = () => (
  <Layout>
    <p>Sign In Page</p>
    <Link href="/">
      <a>To Dashboard Page</a>
    </Link>
  </Layout>
);

export default SignInPage;
