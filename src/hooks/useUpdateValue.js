import React from 'react';
import { findIndex } from 'lodash';

const useUpdateValue = (newVal, valToUpdate, id, taskList, handleSetTaskList) => {
  const tempTasks = taskList;
  const taskIndex = findIndex(taskList, { id });
  tempTasks[taskIndex][valToUpdate] = newVal;
  handleSetTaskList(tempTasks);
};

export default useUpdateValue;
