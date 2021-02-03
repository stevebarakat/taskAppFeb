import React from 'react';
import { RadioButton } from '../../styles/style';

export default function FilterTasks({
  filterType,
  handleSetFilterType,
}) {

  return (
    <form onChange={e => handleSetFilterType(e.target.value)}>
      <label htmlFor="all">
        <RadioButton
          id="all"
          name="filtered-tasks"
          type="radio"
          value="all"
          defaultChecked={filterType === 'all'}
        />
        All
      </label>
      <label htmlFor="todo">
        <RadioButton
          id="todo"
          name="filtered-tasks"
          type="radio"
          value="todo"
          defaultChecked={filterType === 'todo'}
        />
        Todo
      </label>
      <label htmlFor="completed">
        <RadioButton
          id="completed"
          name="filtered-tasks"
          type="radio"
          value="completed"
          defaultChecked={filterType === 'completed'}
        />
        Done
      </label>
      <label htmlFor="dueSoon">
        <RadioButton
          id="dueSoon"
          name="filtered-tasks"
          type="radio"
          value="dueSoon"
          defaultChecked={filterType === 'dueSoon'}
        />
        Soon
      </label>
      <label htmlFor="overdue">
        <RadioButton
          id="overdue"
          name="filtered-tasks"
          type="radio"
          value="overdue"
          defaultChecked={filterType === 'overdue'}
        />
        Late
      </label>
    </form>
  );
}
