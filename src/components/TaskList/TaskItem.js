import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useFirestore, useUser } from 'reactfire';
import { motion, AnimatePresence } from 'framer-motion';
import { findIndex } from 'lodash';
import { useMeasurePosition } from "../../hooks/useMeasurePosition";
import { Badge, BadgeButton, ListItem, ListItemContainer, EndCap, TaskText, DeleteButton, CheckBox } from '../../styles/style';
import { MdExpandMore } from 'react-icons/md';
import ControlPanel from './ControlPanel';
import { v4 as uuidv4 } from 'uuid';

const DELETE_BTN_WIDTH = 70;

const transition = {
  min: 0,
  max: 100,
  bounceDamping: 8,
  bounceStiffness: 10
};

function TaskItem({ i, task, taskList, handleSetTaskList, setDueDate, updatePosition, updateOrder, deleteTask, updateTask, handleDragEnd }) {
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));
  const taskEl = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingX, setIsDraggingX] = useState(false);
  const [isHoveringListItem, setIsHoveringListItem] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const user = useUser();
  const db = useFirestore();
  const docRef = db.collection('tasklist').doc(user.uid);
  let newList = [];
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  function handleSetIsFocused(value) {
    setIsFocused(value);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      document.activeElement.blur();
      taskEl.current.focus();
      e.cancelBubble = true;
      e.stopPropagation();
      // e.nativeEvent.stopImmediatePropagation();
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
          dateCreated: Date.now(),
          isOverdue: false,
          isDueSoon: false,
          distanceToNow: null,
          dueDate: null,
          dateCompleted: null
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
        return tempTasks[i].isOpen = !tempTasks[i].isOpen;
      } else {
        return tempTasks[i].isOpen = false;
      }
    });
    handleSetTaskList(tempTasks);
    docRef.update({ tasks: tempTasks });
  }

  function handleIsCompleted(id) {
    newList = taskList.map((item) => {
      if (item.id === id) return {
        ...item,
        isCompleted: taskCompleted,
        dateCompleted: taskCompleted ? Date.now() : null,
        dueDate: taskCompleted ? null : item.dueDate,
        distanceToNow: taskCompleted ? null : item.distanceToNow,
        isDueSoon: taskCompleted ? null : item.isDueSoon,
        isOverdue: taskCompleted ? null : item.isOverdue,
      };
      return item;
    });
  }

  useEffect(() => {
    handleSetTaskList(newList);
    docRef.update({ tasks: taskList });
  }, [handleSetTaskList, newList, docRef, taskList]);

  return (
    <>
      <motion.div
        ref={ref}
        layout="position"
        drag
        dragElastic={0.5}
        dragDirectionLock
        dragTransition={transition}
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
        transition={{ duration: 0.25 }}
        style={{ zIndex: isDragging || isFocused ? 5999 : 1, position: "relative", background: "#212936" }}
      >
        <ListItemContainer
          onKeyDown={e => handleTaskItemKeyPress(e)}
          onMouseEnter={() => setIsHoveringListItem(true)}
          onMouseLeave={() => setIsHoveringListItem(false)}
        >
          <EndCap>
            <label style={{ width: 25, height: 25, alignSelf: "center" }}>
              <CheckBox
                type="checkbox"
                placeholder="completed"
                name="completed"
                onChange={e => setTaskCompleted(e.target.checked)}
                onClick={handleIsCompleted(task.id)}
                checked={task.isCompleted}
              />
            </label>
          </EndCap>
          <ListItem>
            <AnimatePresence>
              {(isHoveringListItem && !task.isOverdue) &&
                <Badge
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{ right: 0, top: 0 }}
                >
                  {task.distanceToNow && "Due in " + task.distanceToNow + " from now"}
                </Badge>
              }
            </AnimatePresence>
            <AnimatePresence>
              {(isHoveringListItem && !task.dueDate && !task.isOpen) &&
                <BadgeButton
                  onClick={handleOpen}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{ right: 0, top: 0 }}
                >
                  Set Due Date
                </BadgeButton>
              }
            </AnimatePresence>
            <AnimatePresence>
              {task.isOverdue && <Badge overdue variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden" style={{ right: 0, top: 0 }} className="blink">Overdue!</Badge>}
            </AnimatePresence>
            <TaskText
              contentEditable
              suppressContentEditableWarning
              onKeyDown={e => handleKeyPress(e)}
              onBlur={e => updateTask(e, task.id)}
              className={task.isCompleted ? 'completed' : ''}
            >
              {task.title}
            </TaskText>
          </ListItem>
          <EndCap as="button" ref={taskEl} onClick={handleOpen}>
            <MdExpandMore
              style={{
                margin: "auto",
                transform: task.isOpen ? "rotate(0deg)" : "rotate(90deg)",
                transition: "all 0.25s ease-out"
              }}
            />
          </EndCap>
          <AnimatePresence>
            {task.isOpen ?
              <ControlPanel
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                isDraggingX={isDraggingX}
                task={task}
                setDueDate={setDueDate}
                handleSetIsFocused={handleSetIsFocused}
              /> : <></>
            }
          </AnimatePresence>
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
