import React, { useState, useEffect, useCallback } from 'react';
import { useFirestore, useUser } from 'reactfire';
import Layout from './components/Layout';
import { findIndex } from 'lodash';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskList/TaskForm';
import FilterTasks from './components/TaskList/FilterTasks';
import useUpdateLocalState from './hooks/useUpdateLocalState';
import initialTasks from './initialTasks';

function AuthApp({ logOutUser }) {
  const user = useUser();
  const db = useFirestore();
  const localStorageRef = JSON.parse(localStorage.getItem(user.uid));
  const docRef = db.collection('tasklist').doc(user.uid);

  const [taskList, setTaskList] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const initialFilterType = () => localStorageRef?.filterType ?? "all";
  const [filterType, setFilterType] = useState(initialFilterType);

  const handleSetFilterType = (type) => {
    setFilterType(type);
  };

  const handleSetTaskList = useCallback((tasks) => {
    setTaskList(tasks);
  }, []);

  const handleSetSearchTerm = (term) => {
    setSearchTerm(term);
  };

  useUpdateLocalState(
    db,
    user,
    handleSetTaskList,
  );

  useEffect(() => {
    setTaskList(taskList);
    localStorage.setItem(user.uid,
      JSON.stringify({
        filterType
      }));
  }, [filterType, user.uid]);

  const updateTask = (e, id) => {
    const tempTasks = taskList;
    const taskIndex = findIndex(taskList, { id });
    tempTasks[taskIndex].title = e.currentTarget.innerText;
    setTaskList(tempTasks);
    docRef.update({ tasks: taskList });
  };

  const setDueDate = (formattedDate, dueSoon, overdue, distanceToNow, id) => {
    const tempTasks = taskList;
    const taskIndex = findIndex(taskList, { id });
    tempTasks[taskIndex].dueDate = formattedDate;
    tempTasks[taskIndex].isDueSoon = dueSoon;
    tempTasks[taskIndex].isOverdue = overdue;
    tempTasks[taskIndex].distanceToNow = distanceToNow;
    setTaskList(tempTasks);
    docRef.update({ tasks: taskList });
  };

  const updateTaskList = (filteredTasks) => {
    (async () => {
      await docRef.update({ tasks: filteredTasks });
    })();
    setTaskList([...filteredTasks]);
  };

  const deleteTask = async (index) => {
    setTaskList(await taskList.filter((_, i) => i !== index));
    await docRef.update({ tasks: taskList.filter((_, i) => i !== index) });
  };

  return (
    <Layout logOutUser={logOutUser} user={user}>
      <TaskForm taskList={taskList} searchTerm={searchTerm} handleSetSearchTerm={handleSetSearchTerm} />
      <FilterTasks
        filterType={filterType}
        handleSetFilterType={handleSetFilterType}
      />
      <TaskList
        searchTerm={searchTerm}
        taskList={taskList}
        deleteTask={deleteTask}
        updateTaskList={updateTaskList}
        handleSetTaskList={handleSetTaskList}
        handleSetFilterType={handleSetFilterType}
        filterType={filterType}
        updateTask={updateTask}
        setDueDate={setDueDate}
      />
    </Layout>
  );
}

export default AuthApp;
