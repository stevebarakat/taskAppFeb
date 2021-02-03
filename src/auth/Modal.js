import React from "react";
import { StyledModal, BackDrop } from '../styles/style';
import { textColor } from '../styles/colors';
import { AnimatePresence, motion } from "framer-motion";
import { AiFillCloseSquare } from 'react-icons/ai';

const Modal = ({ isToggled, setToggle, children }) => {
  return (
    <AnimatePresence>
      {isToggled && (
        <>
          <BackDrop onClick={isToggled => setToggle(!isToggled)} />
          <StyledModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: "30px",
              left: "50%",
              padding: "1rem",
              transform: "translate3d(-50%, 0,0)",
              zIndex: 99
            }}
          >
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
              <AiFillCloseSquare 
                style={{
                  fontSize: "1.85rem",
                  color: `${textColor}`,
                  position: "absolute",
                  right: "1.5rem",
                  zIndex: 123
                }}
                onClick={isToggled => setToggle(!isToggled)} 
                />
              {children}
            </motion.div>
          </StyledModal>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
