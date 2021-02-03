import React from 'react';
import { RadioButton } from '../../styles/style';

export default function FilterTasks({
  filterType,
  handleSetFilterType,
}) {

  return (
    <form onChange={e => handleSetFilterType(e.target.value)}>
      <label htmlFor="all" style={{ paddingRight: '1rem' }}>
        <RadioButton
          id="all"
          name="filtered-tasks"
          type="radio"
          value="all"
          defaultChecked={filterType === 'all'}
        />
        All
      </label>
      <label htmlFor="todo" style={{ paddingRight: '1rem' }}>
        <RadioButton
          id="todo"
          name="filtered-tasks"
          type="radio"
          value="todo"
          defaultChecked={filterType === 'todo'}
        />
        Todo
      </label>
      <label htmlFor="completed" style={{ paddingRight: '1rem' }}>
        <RadioButton
          id="completed"
          name="filtered-tasks"
          type="radio"
          value="completed"
          defaultChecked={filterType === 'completed'}
        />
        Completed
      </label>
    </form>
  );
}
