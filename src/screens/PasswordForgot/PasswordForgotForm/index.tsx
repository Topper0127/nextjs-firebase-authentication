import React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import FormItem from '@components/Form/Item';
import FormStretchedButton from '@components/Form/StretchedButton';
import useErrorIndicator from '@hooks/useErrorIndicator';

export const PASSWORD_FORGOT = gql`
  mutation PasswordForgot($email: String!) {
    passwordForgot(email: $email)
  }
`;

interface PasswordForgotFormProps extends FormComponentProps {}

const PasswordForgotForm = ({ form }: PasswordForgotFormProps) => {
  const [passwordForgot, { loading, error }] = useMutation(
    PASSWORD_FORGOT
  );

  useErrorIndicator({ error });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    form.validateFields(async (error, values) => {
      if (error) return;

      try {
        await passwordForgot({
          variables: {
            email: values.email,
          },
        });

        form.resetFields();
      } catch (error) {}
    });

    event.preventDefault();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <FormItem label="E-mail">
        {form.getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
          validateFirst: true,
          validateTrigger: 'onBlur',
        })(<Input aria-label="password-forgot-email" />)}
      </FormItem>

      <FormItem wrapperCol={{ sm: 24 }}>
        <FormStretchedButton
          loading={loading}
          type="primary"
          htmlType="submit"
          aria-label="password-forgot-submit"
        >
          Reset Password
        </FormStretchedButton>
      </FormItem>
    </Form>
  );
};

export default Form.create<PasswordForgotFormProps>({
  name: 'password-forgot',
})(PasswordForgotForm);
