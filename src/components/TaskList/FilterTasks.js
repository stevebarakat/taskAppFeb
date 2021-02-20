import React from 'react';
import { OptionWrap, RadioButton, FilterForm } from '../../styles/style';

export default function FilterTasks({
  filterType,
  handleSetFilterType,
}) {

  return (
    <FilterForm onChange={e => handleSetFilterType(e.target.value)}>
      <OptionWrap>
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
      </OptionWrap>
      <OptionWrap>
        <label htmlFor="todo">
          <RadioButton
            id="todo"
            name="filtered-tasks"
            type="radio"
            value="todo"
            defaultChecked={filterType === 'todo'}
          />
        To Do
      </label>
      </OptionWrap>
      <OptionWrap>
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
      </OptionWrap>
      <OptionWrap>
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
      </OptionWrap>
      <OptionWrap>
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
      </OptionWrap>
    </FilterForm>
  );
}
