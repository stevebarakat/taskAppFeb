import React from 'react';
import { useState, useEffect } from "react";
import { useFirestore, useUser } from 'reactfire';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { findIndex } from 'lodash';
import { useMeasurePosition } from "../../hooks/useMeasurePosition";
import { Badge, ListItem, ListItemContainer, EndCap, TaskText, DeleteButton, CheckBox, BtnLink } from '../../styles/style';
import { MdExpandMore } from 'react-icons/md';
import ControlPanel from './ControlPanel';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const DELETE_BTN_WIDTH = 70;

function TaskItem({ i, task, taskList, updateDateCompleted, handleSetTaskList, updateDueDate, updatePosition, updateOrder, deleteTask, updateTask, handleDragEnd }) {
  const { register, watch } = useForm();
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingX, setIsDraggingX] = useState(false);
  const [bgColor, setBgColor] = useState("inherit");
  const [isShowing, setIsShowing] = useState(false);
  const taskCompleted = watch("completed");
  const user = useUser();
  const db = useFirestore();
  const docRef = db.collection('tasklist').doc(user.uid);
  let newList = [];
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const transition = {
    min: 0,
    max: 100,
    bounceStiffness: 10,
    bounceDamping: 10,
  };

  function handleSetIsFocused(value) {
    setIsFocused(value);
  }

  function handleKeyPress(e) {

    if (e.shiftKey && e.key === "Enter") {
      document.activeElement.focus();
      e.stopPropagation();
    } else if (e.key === "Enter") {
      document.activeElement.blur();
      e.cancelBubble = true;
      e.stopPropagation();
    }
  }

  function handleTaskItemKeyPress(e) {
    if (e.key === "Enter") {
      const docRef = db.collection('tasklist').doc(user.uid);
      docRef.set({
        tasks: [...taskList, {
          id: uuidv4(),
          title: "",
          height: "56",
          isSwiped: false,
          isCompleted: false,
          isOpen: false,
        }]
      }, { merge: true });
      e.cancelBubble = true;
    }
  }

  function handleOpen() {
    const tempTasks = taskList;
    const id = task.id;
    const taskIndex = findIndex(taskList, { id });
    tempTasks.map((_, i) => {
      if (taskIndex === i) {
        tempTasks[i].isOpen = !tempTasks[i].isOpen;
      } else {
        tempTasks[i].isOpen = false;
      }
    });
    handleSetTaskList(tempTasks);
    docRef.update({ tasks: tempTasks });
  }

  function handleIsCompleted(id) {
    newList = taskList.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isCompleted: taskCompleted,
          dateCompleted: taskCompleted ? Date.now() : null,
          dueDate: item.dueDate && !taskCompleted ? item.dueDate : null,
          distanceToNow: item.distanceToNow && !taskCompleted ? item.distanceToNow : null,
          isDueSoon: item.dueSoon && taskCompleted ? !item.isDueSoon : false,
          isOverdue: item.isOverdue && taskCompleted ? !item.isOverdue : false,
        };
        return updatedItem;
      }
      return item;
    });
  }
  console.log(newList)
  useEffect(() => {
    handleSetTaskList(newList);
    docRef.update({ tasks: taskList });
  }, [handleSetTaskList, newList, taskList, docRef]);

  useEffect(() => {
    if (task.isOverdue) {
      setBgColor("black");
    } else if (task.isDueSoon) {
      setBgColor("hsla(357, 76%, 32%, 1.0)");
    } else {
      setBgColor("inherit");
    }
  }, [task]);

  return (
    <>
      <motion.div
        ref={ref}
        layout="position"
        drag
        dragElastic={0.75}
        dragTransition={transition}
        dragDirectionLock
        onDirectionLock={axis => axis === "x" ? setIsDraggingX(true) : setIsDraggingX(false)}
        dragConstraints={{
          top: 0,
          bottom: 0,
          left: task.isSwiped ? DELETE_BTN_WIDTH * -1 : 0,
          right: 0
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          handleDragEnd(info, task.id, i);
        }}
        onViewportBoxUpdate={(_, delta) => {
          if (isDragging) {
            updateOrder(i, delta.y.translate);
          }
        }}
        whileTap={{ cursor: "grabbing" }}
        whileHover={{ cursor: "grab" }}
        animate={{ x: task.isSwiped ? DELETE_BTN_WIDTH * -1 : 0 }}
        style={{ zIndex: isFocused || isDragging ? 5 : 1, position: "relative", background: "#212936" }}
      >
        {console.log(isShowing)}
        <ListItemContainer
          onKeyDown={e => handleTaskItemKeyPress(e)}
          onMouseEnter={() => (task.dueDate && !task.isOverdue) && setIsShowing(true)}
          onMouseLeave={() => (task.dueDate && !task.isOverdue) && setIsShowing(false)}
        >
          <EndCap>
            <label style={{ width: 25, height: 25, alignSelf: "center" }}>
              <CheckBox
                type="checkbox"
                placeholder="completed"
                name="completed"
                ref={register}
                onClick={handleIsCompleted(task.id)}
                defaultChecked={task.isCompleted}
              />
            </label>
          </EndCap>
          <ListItem>
            <AnimatePresence>
              {(isShowing && !task.isOverdue) &&
                <Badge
                  dueSoon
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {task.distanceToNow && "Due in " + task.distanceToNow + " from now"}
                </Badge>
              }
            </AnimatePresence>
            {task.isOverdue && <Badge className="blink">Overdue!</Badge>}
            <TaskText
              contentEditable
              suppressContentEditableWarning
              onKeyDown={e => handleKeyPress(e)}
              onBlur={e => updateTask(e, task.id)}
              style={{
                textDecorationColor: "red",
                textDecoration: task.isCompleted
                  ? 'line-through 3px red'
                  : 'none',
              }}
            >
              {task.title}
            </TaskText>
          </ListItem>
          <EndCap>
            <MdExpandMore
              style={{
                margin: "auto",
                transform: task.isOpen ? "rotate(0deg)" : "rotate(90deg)",
                transition: "all 0.25s ease-out"
              }}
              onClick={handleOpen}
            />
          </EndCap>
          <>
            {task.isOpen ?
              <ControlPanel
                isDraggingX={isDraggingX}
                task={task}
                updateDueDate={updateDueDate}
                handleSetIsFocused={handleSetIsFocused}
              />
              :
              <div />
            }
          </>
        </ListItemContainer>
      </motion.div>
      <DeleteButton
        onClick={() => deleteTask(i)}
        style={{ display: isDraggingX ? "flex" : "none" }}
      >Delete</DeleteButton>
    </>
  );
}
export default TaskItem;
