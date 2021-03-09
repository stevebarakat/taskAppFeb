const DELETE_BTN_WIDTH = 70;

export const useSwipe = (info, taskId, index, taskList, handleSetTaskList, deleteTask) => {
  const dragDistance = info.offset.x;
  const taskSwiped = taskList.filter((task) => task.id === taskId)[0];

  if (
    dragDistance < 0 &&
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
