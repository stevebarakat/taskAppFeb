import React, { useState } from 'react';
import { BtnIcon, BtnText, Center, InputWrap, TextLabel, TextInput, Field, InputIcon, Flex, ErrorMessage } from '../styles/style';
import Modal from './Modal';
import Layout from '../components/Layout';
import { Button, BtnLink } from '../styles/style';
import PasswordReset from './PasswordReset';
import { FaUser, FaGoogle } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { useForm } from 'react-hook-form';

const Login = ({ isNewUser, handleLogin, handleSetIsNewUser, errMsg, googleSignIn }) => {
  const { register, handleSubmit } = useForm();
  const [isToggled, setToggle] = useState(false);

  return (
    <Layout>
      <div style={{ padding: "1rem" }}>
        <Center style={{ padding: "0.5rem" }}>
          <BtnLink onClick={() => handleSetIsNewUser(isNewUser => !isNewUser)}>{!isNewUser ? "need to create an account?" : "already have an account?"}</BtnLink>
        </Center>
        <form onSubmit={handleSubmit(handleLogin)}>
          {isNewUser &&
            <InputWrap>
              <InputIcon><FaUser /></InputIcon>
              <Field>
                <TextInput
                  leftIcon
                  type="text"
                  name="displayName"
                  placeholder=" "
                  autoComplete="off"
                  ref={register}
                  required />
                <TextLabel htmlFor="displayName">Name</TextLabel>
              </Field>
            </InputWrap>
          }
          <InputWrap>
            <InputIcon><MdEmail /></InputIcon>
            <Field>
              <TextInput
                leftIcon
                signIn
                type="email"
                name="email"
                placeholder=" "
                ref={register}
                autoComplete="off"
                required />
              <TextLabel htmlFor="email">Email</TextLabel>
            </Field>
          </InputWrap>
          <InputWrap>
            <InputIcon><RiLockPasswordFill /></InputIcon>
            <Field>
              <TextInput
                leftIcon
                signIn
                type="password"
                name="password"
                placeholder=" "
                autoComplete="off"
                ref={register}
                required />
              <TextLabel htmlFor="password">Password</TextLabel>
            </Field>
          </InputWrap>
          {errMsg && <ErrorMessage>{errMsg}</ErrorMessage>}
          <Button type="submit">{isNewUser ? <BtnText>Create Account</BtnText> : <BtnText>Sign In With Email</BtnText>}
            <BtnIcon>
              <MdEmail />
            </BtnIcon>
          </Button>
        </form>
        <Flex>
          <Button type="submit" onClick={googleSignIn}><span style={{ flexGrow: 2 }}>Sign In With Google</span>
            <BtnIcon>
              <FaGoogle />
            </BtnIcon>
          </Button>
        </Flex>
        <BtnLink
          secondary
          style={{ marginTop: "1.5rem" }}
          onClick={() => setToggle(true)}
        >Forgot Password?</BtnLink>
        <Modal isToggled={isToggled} setToggle={setToggle}>
          <PasswordReset />
        </Modal>
      </div>
    </Layout>
  );
};

export default Login;
