import React, { useState } from 'react';
import { Badge, Button, TextInput, TaskFormForm, TaskFormContainer, Flex, TextLabel } from '../../styles/style';
import { v4 as uuidv4 } from 'uuid';
import { RiAddLine } from 'react-icons/ri';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { BsPencil, BsSearch } from 'react-icons/bs';
import { useFirestore, useUser } from 'reactfire';
import { Switch } from './Switch';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const TaskForm = ({ handleSetSearchTerm, searchTerm, taskList }) => {
  const db = useFirestore();
  const user = useUser();
  const [isSearch, setIsSearch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    handleSetSearchTerm(e.target.value);
  };

  const handleToggleSearch = () => {
    setClicked(clicked => !clicked);
    handleSetSearchTerm("");
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
          isOverdue: false,
          isDueSoon: false,
          distanceToNow: null,
          dueDate: null,
          dateCompleted: null
        }]
      }, { merge: true });
    }
    setNewTask('');
  };

  return (
    <TaskFormContainer>
      {/* {isHovering &&
        <Badge
          color="textColor"
          style={{ left: "1rem", top: "-1.35rem" }}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        ><IoMdArrowRoundDown
            style={{ fontSize: "1rem", verticalAlign: "middle", borderColor: "red" }}
          />Toggle Search</Badge>} */}
      <TaskFormForm
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Button
          secondary
          style={{padding: "1em 0.5em" }}
        ><Switch
            on={clicked}
            onClick={handleToggleSearch}
          />
        </Button>
        <form
          onSubmit={e => addTask(e)}
          style={{ flexGrow: 1 }}
        >
          <Flex>
            {clicked ?
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
      </TaskFormForm>
    </TaskFormContainer>
  );
};

export default TaskForm;
