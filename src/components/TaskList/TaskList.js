import React, { useEffect } from 'react';
import TaskItem from './TaskItem';
import { AnimatePresence } from 'framer-motion';
import { ListContainer, ListItemContainerWrap } from '../../styles/style';
import { usePositionReorder } from '../../hooks/usePositionReorder';

const DELETE_BTN_WIDTH = 70;

const TaskList = ({
  searchTerm,
  filterType,
  taskList,
  deleteTask,
  updateTask,
  updateTaskList,
  handleSetTaskList,
  setDueDate,
  setDateCompleted,
}) => {
  const FILTER_MAP = {
    all: () => true,
    todo: task => !task.isCompleted,
    completed: task => task.isCompleted,
    dueSoon: task => task.isDueSoon,
    overdue: task => task.isOverdue,
    search: task => task.title.toLowerCase().includes(searchTerm)
  }
  const [updatePosition, updateOrder] = usePositionReorder(taskList, handleSetTaskList);

  useEffect(() => {
    updateTaskList(taskList);
  }, [taskList, updateTaskList]);

  const handleDragEnd = (info, taskId, index) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;
    const taskSwiped = taskList.filter((task) => task.id === taskId)[0];

    if (
    (dragDistance < 0 || velocity < -500 ) &&
      (dragDistance < -DELETE_BTN_WIDTH * 2 ||
        (taskSwiped.isSwiped && dragDistance < -DELETE_BTN_WIDTH - 10))
    ) {
      const newTasksList = taskList.filter((task) => task.id !== taskId);
      handleSetTaskList(newTasksList);
      deleteTask(index);
    } else if (dragDistance > -DELETE_BTN_WIDTH && taskSwiped.isSwiped) {

      const newTasksList = taskList.map((item) => {
        if (item.id === taskId) {
          item.isSwiped = false;
        }
        return item;
      });
      handleSetTaskList(newTasksList);
      
    } else if (dragDistance < 0 && dragDistance <= -DELETE_BTN_WIDTH / 3) {
      const newTasksList = taskList.map((item) => {
        if (item.id === taskId) {
          item.isSwiped = true;
        } else {
          item.isSwiped = false;
        }

        return item;
      });

      handleSetTaskList(newTasksList);
    }
  };

  return (
    <ListContainer>
      {taskList.length === 0 ? (
        <p>You don't have any tasks.</p>
      ) : (
        <AnimatePresence>
            {taskList
            ?.filter(FILTER_MAP[filterType])
            .filter(task => task.title
              .toLowerCase()
              .includes(searchTerm)).map((task, i) => (
                <ListItemContainerWrap 
                  key={task.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                <TaskItem
                  i={i}
                  task={task}
                  updatePosition={updatePosition}
                  updateOrder={updateOrder}
                  handleDragEnd={handleDragEnd}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  taskList={taskList}
                  handleSetTaskList={handleSetTaskList}
                  setDueDate={setDueDate}
                  setDateCompleted={setDateCompleted}
                />
              </ListItemContainerWrap>
            ))}
        </AnimatePresence>
      )}
      </ListContainer>
  );
};

export default TaskList;
