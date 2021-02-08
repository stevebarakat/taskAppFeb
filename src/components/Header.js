import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { Avatar, MenuModal, IconLink, Button, StyledHeader, Logo, Title } from '../styles/style';
import { FaUserCircle } from 'react-icons/fa';
import { ImList2 } from 'react-icons/im';

const variants = {
  visible: { opacity: 1, y: -30 },
  hidden: { opacity: 0, y: -200 },
};

const Header = ({ user, logOutUser }) => {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const iconRef = useRef();
  const modalRef = useRef();
  // State for our modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(iconRef, modalRef, () => setIsModalOpen(!isModalOpen));

  return (
    <StyledHeader type={user ? 'signedIn' : 'signedOut'}>
      {!user && <Logo><ImList2 style={{ paddingTop: '.9rem' }} /></Logo>}
      <Title>Task <span style={{ fontWeight: '600' }}>App</span></Title>
      {user &&
        <>
          <IconLink ref={iconRef} onTap={() => setIsModalOpen(!isModalOpen)}>
            {user.photoURL ?
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                width="50px"
              /> :
              <FaUserCircle style={{ fontSize: "3rem" }} />
            }
          </IconLink>
          <AnimatePresence>
            {isModalOpen && (
              <MenuModal
                ref={modalRef}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <span>{user.displayName}</span>
                <Button onClick={e => {
                  logOutUser(e);
                }}>sign out</Button>
              </MenuModal>
            )}
          </AnimatePresence>
        </>
      }
    </StyledHeader>
  );
};
export default Header;


