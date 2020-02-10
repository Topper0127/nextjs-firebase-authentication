import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Menu, Icon } from 'antd';

import * as ROUTES from '@constants/routes';
import SessionContext from '@context/session';

import signOut from './signOut';

const Container = styled.nav`
  ul {
    padding-top: 8px;
    padding: bottom: 0px;
    padding-left: 30px;
    padding-right: 32px;
  }
`;

const Navigation = () => {
  const session = React.useContext(SessionContext);

  return (
    <Container>
      <Menu mode="horizontal">
        <Menu.Item
          style={{
            float: 'left',
            borderBottom: '2px solid transparent',
          }}
        >
          <Link href="/">
            <a>
              <img height="40" src="/logo.svg" alt="logo" />
            </a>
          </Link>
        </Menu.Item>

        {!session && (
          <Menu.Item style={{ float: 'right' }}>
            <Link href={ROUTES.SIGN_IN}>
              <a>Sign In</a>
            </Link>
          </Menu.Item>
        )}

        {session && (
          <Menu.SubMenu style={{ float: 'right' }} title="Home">
            <Menu.Item key="0">
              <Link href={ROUTES.ACCOUNT}>
                <a>
                  <Icon type="user" />
                  Account
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="1" onClick={() => signOut()}>
              <Icon type="poweroff" />
              Sign Out
            </Menu.Item>
          </Menu.SubMenu>
        )}

        <Menu.Item style={{ float: 'right' }}>
          <Link href={ROUTES.INDEX}>
            <a>Courses</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default Navigation;
