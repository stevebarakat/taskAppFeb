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
  z-index: 99;
`;

export const Container = styled.div`
  max-width: 100%;
  width: 370px;
  border: 1px solid ${borderColor};
  margin: 0 auto;
  padding-bottom: 0.5rem;
  overflow: hidden;
`;

export const Content = styled.main`
  min-height: 100%;
  margin: 0 1rem 1rem;
  padding: 0;
`;

export const BtnLink = styled.button`
  font-weight: 600;
  text-transform: capitalize;
  color: ${textColor};
  background: none;
  margin: 0;
  border: none;
  &:focus,
  &:hover {
    color: ${textColor};
    text-decoration: underline;
  }
`;

export const EndCap = styled.div`
  display: flex;
  text-align: center;
  color: ${borderColor};
  &:hover,
  &:focus{
    cursor: pointer;
    color: ${textColor};
  }
  svg{
    width: 2rem;
    height: 2rem;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${borderColor};
  background: ${inputBg};
  border: 1px solid ${borderColor};
  text-transform: uppercase;
  padding: ${p => p.secondary ? '1rem' : '0'};
  margin: ${p => p.secondary ? '0' : '0.5rem 0 0'};
  width: ${p => p.secondary ? 'auto' : '100%'};
  height: 50px;
  transition: all 0.15s;
  &:focus,
  &:hover {
    background: 'hsla(207, 96%, 91%, 0.5)';
    color: ${textColor};
    border: 1px solid ${textColor};
    border-bottom: 2px solid ${textColor};
  };
  &:hover span:nth-child(2) {
    border: 1px solid ${textColor};
  }
  & svg{
    font-size: 1.25rem;
  }
`;

export const BtnIcon = styled.span`
  font-size: 1.25rem;
  width: 50px;
  height: 50px;
  border-left: 1px solid ${borderColor};
  padding: 0.75rem 0;
  &:hover{
    border: 1px solid ${textColor};
  }
`;

export const BtnText = styled.span`
  flex-grow: 2;
  /* border: 1px solid ${borderColor};
  padding: 1rem;
  &:hover{
    border: 1px solid ${textColor};
  } */
`;

export const IconLink = styled(motion.button)`
    border: none;
    border-radius: 90%;
    background: none;
    color: ${textColor};
    padding: 0.1rem 0.2rem;
    cursor: pointer;
`;

export const StyledHeader = styled.header`
  position: relative;
  background: ${inputBg};
  border-bottom: 1px solid ${borderColor};
  display: flex;
  flex-direction: ${({ type }) => (type === 'signedIn' ? 'row' : 'column')};
  justify-content: space-between;
  color: ${textColor};
  padding: 1rem;
`;

export const Logo = styled.div`
  background: ${inputBg};
  border-radius: 90%;
  border: 1px solid ${borderColor};
  width: 70px;
  height: 70px;
  text-align: center;
  color: ${borderColor};
  font-size: 2.5rem;
  padding-top: 0.1rem;
  margin: 0 auto;
  `;

export const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-weight: 200;
  font-size: 1.5rem;
  margin-top: 1rem;
`;

export const StyledTaskForm = styled.form`
  margin: 1.5rem 0 1.5rem;
`;

export const ListItem = styled.div`
  padding: 1rem 0;
`;

export const ListItemContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 35px 1fr 50px;
  justify-content: space-between;
  transition: all .15s;
    input[type="checkbox"] {
      transition: all .15s;
      border: 2px solid ${textColor};
      &:hover{
        border-color: ${textColor};
      }&::before{
        /* background: ${textColor}; */
      }
  }
  &:focus {
    button,
    div{
      background-color: ${textColor};
    }
    background-color: ${textColor};
  }
  input[type="checkbox"]{
    border: 2px solid ${borderColor};
  }
`;

export const ListContainer = styled(motion.ul)`
  /* display: flex;
  flex-direction: column; */
`

export const ListItemContainerWrap = styled(motion.li)`
  list-style: none;
  position: relative;
  border-bottom: 1px solid ${borderColor};
  div:first-child:hover {
    /* border: 1px solid ${textColor}; */
    background: ${inputBg};
  } 
`;

export const TaskFormContainer = styled.div`
  position: relative;
  margin-top: 1.5rem;
`;

export const TaskFormForm = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export const TaskText = styled.div`
    padding: 0 0.1rem;
    cursor: text;
    color: ${p => p.overdue ? 'red' : 'inherit'};
    &:focus{
      outline: none;
      /* background: ${inputBg};
      border: 1px solid ${borderColor}; */
      /* &::before{
        content: "Editing";
        position: absolute;
        top: -10px;
      } */
    }
`;

export const Center = styled.div`
  margin: 0 auto;
  text-align: center;
`;

export const TextLabel = styled.label`
  color: ${borderColor};
  font-size: 1rem;
  /* font-weight: 700; */
  transition: all 0.2s;
  touch-action: manipulation; 
`;

export const InputWrap = styled.div`
  display: flex;
  margin: 0.5rem auto;  
`;

export const TextInput = styled.input`
  position: relative;
  cursor: text;
  font-size: 1rem;
  border-top: 1px solid ${borderColor};
  border-bottom: 1px solid ${borderColor};
  border-right: ${p => p.leftIcon ? `1px solid ${borderColor}` : "none"};
  border-left: none;
  padding: 1rem 0 0 1rem;
  margin: 0;
  width: 100%;
  z-index: 0;
  background: ${inputBg};
  color: ${textColor};
  transition: all 0.1s;
  touch-action: manipulation;
  border-radius: 0;
  &:focus {
    outline: 0;
    background: none;
  }
  &:placeholder-shown + label {
    cursor: text;
    margin-left: .75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: translate(0, 1rem) scale(1);
    position: absolute;
  }
  &:not(:placeholder-shown) + label,
  &:focus + label{
    transform: translate(0, -2px) scale(0.85);
    cursor: pointer;
    z-index: 3;
    position: absolute;
    margin-left: .2rem;
    color: ${borderColor};
  }
  &::-webkit-search-cancel-button{
    display: none;
  }
`;

export const Field = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
`;

export const TaskField = styled.div`
  margin: 1rem 0;
  display: flex;
  position: relative;
`;

export const Flex = styled.div`
  display: flex;
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: hsla(0, 0%, 0%, 0.85);
  z-index: 1;
`;

export const InputIcon = styled.div`
  font-size: 1.2rem;
  padding: .75rem 1rem .25rem;
  color: ${borderColor};
  background: ${inputBg};
  border: 1px solid ${borderColor};
  position: relative; 
`;

export const ErrorMessage = styled.div`
  color: #de5246;
  background: hsla(5, 70%, 57%, 0.15);
  border: 1px solid #de5246;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export const StyledSpinner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const DeleteButton = styled.div`
  z-index: 0;
  position: absolute;
  height: calc(100% - 2px);
  width: 70px;
  top: 50%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  background-color: ${activeColor};
  cursor: pointer;
  font-weight: 700;
`;

export const ExtraStuff = styled.div`
  /* padding-bottom: 1rem; */
  grid-area: 2 / 1 / auto / span 3;
`;

export const Notes = styled.div`
  background: ${inputBg};
  border: 1px solid ${borderColor};
  padding: 1rem;
`;

export const Label = styled.label`
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  color: ${textColor};
  cursor: pointer;
`;

export const CheckBox = styled.input`
  position: relative;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  background: none;
  cursor: pointer;
  border: 2px solid ${borderColor};
    &::before {
    content: " ";
    position: absolute;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    transition: all 0.1s;
  }
  &:active {
    background: ${activeColor};
  }
  &:focus {
    border: 3px solid ${textColor} !important;
  }
  &:checked {
    background: ${bodyBg};
  }
  &:checked::after {
    content: "";
    display: block;
    background-color: ${activeColor};
    width: 75%;
    height: 75%;
    position: relative;
    top: 2px;
    left: 2px;
  }
`;

export const RadioButton = styled.input`
  position: relative;
  flex-shrink: 0;
  position: relative;
  top: 0.25rem;
  width: 20px;
  height: 20px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  background: none;
  cursor: pointer;
  border: 2px solid ${borderColor};
  border-radius: 90%;
    &:focus {
      border: 3px solid ${textColor};
    }
    &::before {
    content: " ";
    position: absolute;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    transition: all 0.1s;
    background: ${activeColor};
    border-radius: 90%;
  }
  &:checked::before {
    background: ${activeColor};
    top: 2px;
    right: 2px;
    bottom: 2px;
    left: 2px;
  }
`;

export const StyledModal = styled(motion.div)`
  max-width: 300px;
  background: #212936;
  border-radius: 3px;
  box-shadow: 1px 4px 5px hsla(0, 0%, 0%, 0.5);  
`;

export const MenuModal = styled(motion.div)`
  background: ${bodyBg};
  border: 1px solid ${borderColor};
  height: auto;
  border-radius: 3px;
  box-shadow: 1px 4px 5px hsla(0, 0%, 0%, 0.5);
  z-index: 55;
  right: 10px;
  position: absolute;
  padding: 0.5rem;
  width: 150px;
  text-align: center;
  top: 105px;
`;

export const Avatar = styled.img`
  border-radius: 2px;
  border: 2px solid ${borderColor};
  &:hover, 
  &:focus {
  border: 2px solid ${textColor};
  }
`;

export const FilterForm = styled.form`
  border-bottom: 1px solid ${borderColor};
  padding-bottom: 1rem;
`;

export const OptionWrap = styled.div`
  display: inline-block;
`;

export const MetaData = styled.ul`
  margin: 0 !important;
  padding: 0 !important;
`

export const MetaItem = styled.li`
  list-style: none;
  margin: 0 !important;
  padding: 0 !important;
  /* padding-bottom: 0.5rem; */
  &:last-of-type{
    padding-bottom: 0 !important;
  }
`
