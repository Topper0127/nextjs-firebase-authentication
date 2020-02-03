import { render, fireEvent, wait } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { GraphQLError } from 'graphql';
import { message } from 'antd';

import { PASSWORD_CHANGE } from '@queries/session';
import PasswordChangeForm from '.';

describe('PasswordChangeForm', () => {
  const oldPassword = 'myoldpassword';
  const newPassword = 'mynewpassword';

  message.error = jest.fn();

  let mutationCalled: boolean;

  beforeEach(() => {
    mutationCalled = false;
  });

  it('changes a password with success', async () => {
    const mocks = [
      {
        request: {
          query: PASSWORD_CHANGE,
          variables: { password: 'mynewpassword' },
        },
        result: () => {
          mutationCalled = true;
          return { data: { passwordChange: null } };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordChangeForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-old'),
      {
        target: { value: oldPassword },
      }
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-new'),
      {
        target: { value: newPassword },
      }
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-confirm'),
      {
        target: { value: newPassword },
      }
    );

    expect(
      component
        .getByLabelText('password-change-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(false);

    fireEvent.click(
      component.getByLabelText('password-change-submit')
    );

    expect(
      component
        .getByLabelText('password-change-submit')
        .classList.contains('ant-btn-loading')
    ).toBe(true);

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(0);

      expect(
        component
          .getByLabelText('password-change-submit')
          .classList.contains('ant-btn-loading')
      ).toBe(false);
    });
  });

  it('changes a password with error', async () => {
    const mocks = [
      {
        request: {
          query: PASSWORD_CHANGE,
          variables: { password: 'mynewpassword' },
        },
        result: () => {
          mutationCalled = true;
          return { errors: [new GraphQLError('Error!')] };
        },
      },
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PasswordChangeForm />
      </MockedProvider>
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-old'),
      {
        target: { value: oldPassword },
      }
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-new'),
      {
        target: { value: newPassword },
      }
    );

    fireEvent.change(
      component.getByLabelText('password-change-password-confirm'),
      {
        target: { value: newPassword },
      }
    );

    fireEvent.click(
      component.getByLabelText('password-change-submit')
    );

    await wait(() => {
      expect(mutationCalled).toBe(true);
      expect(message.error).toHaveBeenCalledTimes(1);
    });
  });
});
