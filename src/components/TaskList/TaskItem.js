import React from 'react';
import { useState, useEffect } from "react";
import { useFirestore, useUser } from 'reactfire';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { findIndex } from 'lodash';
import { useMeasurePosition } from "../../hooks/useMeasurePosition";
import { Badge, ListItem, ListItemContainer, EndCap, TaskText, DeleteButton, CheckBox } from '../../styles/style';
import { MdExpandMore } from 'react-icons/md';
import ControlPanel from './ControlPanel';

const DELETE_BTN_WIDTH = 70;

function TaskItem({ i, task, taskList, handleSetTaskList, setDueDate, updatePosition, updateOrder, deleteTask, updateTask, handleDragEnd }) {
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));
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
    <AnimateSharedLayout>
      <motion.div
        ref={ref}
        layout="position"
        drag={task.isOpen ? false : true}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          handleDragEnd(info, task.id, i);
        }}
        dragDirectionLock
        onDirectionLock={axis => axis === "x" ? setIsDraggingX(true) : setIsDraggingX(false)}
        dragElastic={0.7}
        dragPropagation={true}
        dragConstraints={{
          top: 0,
          bottom: 0,
          left: task.isSwiped ? DELETE_BTN_WIDTH * -1 : 0,
          right: 0
        }}
        onViewportBoxUpdate={(_, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}
        whileTap={{ cursor: "grabbing" }}
        whileHover={{ cursor: "grab" }}
        animate={{ x: task.isSwiped ? DELETE_BTN_WIDTH * -1 : 0 }}
        style={{ zIndex: isDragging || isFocused ? 9 : 1, position: "relative", background: "#212936" }}
      >
        <ListItemContainer
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
              {(isHoveringListItem && !task.isOverdue && !task.isOpen) &&
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
                <Badge
                  onClick={handleOpen}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{ right: 0, top: 0, cursor: "pointer" }}
                >
                  Set Due Date
                </Badge>
              }
            </AnimatePresence>
            <AnimatePresence>
              {task.isOverdue && <Badge
                overdue
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                style={{ right: 0, top: 0 }}
                className="blink">Overdue!</Badge>}
            </AnimatePresence>
            <TaskText
              contentEditable
              suppressContentEditableWarning
              onBlur={e => updateTask(e, task.id)}
              className={task.isCompleted ? 'completed' : ''}
            >
              {task.title}
            </TaskText>
          </ListItem>
          <EndCap as="button" onClick={handleOpen}>
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
    </AnimateSharedLayout>
  );
}
export default TaskItem;
