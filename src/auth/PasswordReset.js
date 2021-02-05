import React, { useState } from 'react';
import { useAuth } from 'reactfire';
import { Button, TextInput, Field, InputIcon, ErrorMessage, InputWrap, TextLabel } from '../styles/style';
import { MdEmail } from 'react-icons/md';

const PasswordReset = () => {
  const auth = useAuth();
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  async function handleResetPassword() {
    try {
      const redirect = {
        // After password reset, redirect
        url: 'http://localhost:3000/login'
      };
      await auth.sendPasswordResetEmail(resetPasswordEmail, redirect);
      setIsPasswordReset(true);
    } catch (err) {
      console.error("Error sending email", err);
      setPasswordResetError(err.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <div>
      <h3>Password Recovery</h3>
      <hr />
      <p>Please enter your email address to recieve a password reset.</p>
      <InputWrap>
        <InputIcon><MdEmail /></InputIcon>
        <Field>
          <TextInput
            leftIcon
            signIn
            type="email"
            name="email"
            placeholder=" "
            autoComplete="off"
            onChange={e => setResetPasswordEmail(e.target.value)}
            required />
          <TextLabel htmlFor="email">Email</TextLabel>
        </Field>
      </InputWrap>
      <Button onClick={handleResetPassword}>Reset Password</Button>
      {isPasswordReset && <p>Check email to reset password.</p>}
      {passwordResetError && <ErrorMessage>{passwordResetError}</ErrorMessage>}
    </div>
  );
};

export default PasswordReset;
