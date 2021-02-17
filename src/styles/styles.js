import styled from 'styled-components/macro';
import { inputBg, borderColor, textColor, bodyBg, activeColor, activeColorLite } from './colors';
import { motion } from 'framer-motion';

function handleSetDueDateBadge(value) {
  switch (value) {
    case "overdue":
      return "#03a9f3";
    case "dueSoon":
      return "#f56342";
    default:
      return "#fff";
  }
};

// TEXT 



// ELEMENTS



// LINKS 



// BUTTONS 



// INPUTS 



// FORMS



// COMPONENTS



// DATA DISPLAY

export const Badge = styled(motion.div)`
  color: ${({ value }) => handleSetDueDateBadge(value)};
  border: ${p => p.overdue ? `1px solid transparent` : `1px solid ${borderColor}`};
  background: ${p => p.overdue ? activeColor : bodyBg};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.65rem;
  display: inline-block;
  line-height: 0.65rem;
  position: absolute;
  text-align: center;
  padding: 0.15rem;
  border-radius: 3px;
  margin-top: 0.1rem;
`;






// LAYOUT

