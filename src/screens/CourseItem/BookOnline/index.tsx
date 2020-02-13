import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Skeleton } from 'antd';

import { GET_ONLINE_CHAPTER } from '@queries/book';
import mdxComponents from '@components/Mdx';

import useErrorIndicator from '@hooks/useErrorIndicator';

import MDX from '@mdx-js/runtime';

type BookOnlineProps = {
  path: string | null | undefined;
};

const BookOnline = ({ path }: BookOnlineProps) => {
  if (!path) return null;

  const { loading, error, data } = useQuery(GET_ONLINE_CHAPTER, {
    variables: { path },
  });

  useErrorIndicator({
    error,
  });

  if (loading) return <Skeleton active />;
  if (!data) return null;

  return (
    <MDX components={mdxComponents} scope={{}}>
      {atob(data.onlineChapter.body)}
    </MDX>
  );
};

export default BookOnline;
