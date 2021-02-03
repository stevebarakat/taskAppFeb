import React, { useState } from 'react';
import { Button, TextInput, TaskFormContainer, Flex, TextLabel } from '../../styles/style';
import { v4 as uuidv4 } from 'uuid';
import { RiAddLine } from 'react-icons/ri';
import { BsPencil, BsSearch } from 'react-icons/bs';
import { useFirestore, useUser } from 'reactfire';

const TaskForm = ({ handleSetSearchTerm, searchTerm, taskList }) => {
  const db = useFirestore();
  const user = useUser();
  const [isSearch, setIsSearch] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    handleSetSearchTerm(e.target.value);
  };

  const handleToggleSearch = () => {
    setIsSearch(isSearch => !isSearch);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!!newTask) {
      const docRef = db.collection('tasklist').doc(user.uid);
      docRef.set({
        tasks: [...taskList, {
          id: uuidv4(),
          title: newTask,
          height: "56",
          isSwiped: false,
          isCompleted: false,
          isOpen: false,
          dateCreated: Date.now(),
        }]
      }, { merge: true });
    }
    setNewTask('');
  };

  return (
    <TaskFormContainer>
      <Button
        onClick={handleToggleSearch}
        onMouseEnter={handleToggleSearch}
        onMouseLeave={handleToggleSearch}
        secondary
      >{isSearch ? <BsSearch /> : <BsPencil />}
      </Button>
      <form 
        onSubmit={e => addTask(e)}
        style={{flexGrow: 1 }}  
      >
        <Flex>
          {isSearch ?
            <>
              <TextInput
                id="search"
                type="search"
                name="search"
                placeholder=" "
                autoComplete="off"
                value={searchTerm}
                onChange={handleSearch}
              />
              <TextLabel htmlFor="search">Search Tasks</TextLabel>
            </> :
            <>
              <TextInput
                id="task"
                name="task"
                placeholder=" "
                autoComplete="off"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                required
              />
              <TextLabel htmlFor="task">Add Task</TextLabel>
            </>
          }
          <Button
            secondary
            type="submit"
          >
            <RiAddLine />
          </Button>
        </Flex>
      </form>
    </TaskFormContainer>
  );
};

export default TaskForm;
