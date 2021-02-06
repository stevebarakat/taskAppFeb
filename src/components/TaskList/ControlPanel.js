import React from 'react';
import DatePicker from 'react-datepicker';
import { format, differenceInHours, parse, formatDistanceToNow } from 'date-fns';
import { MetaData, MetaItem, ExtraStuff } from '../../styles/style';
import "react-datepicker/dist/react-datepicker.css";

const DATE_FORMAT = "M/d/yyyy, h:mm a";
let timePickerSupport;

(function () {
  var input = document.createElement('input');
  input.setAttribute('type', 'date');

  var notADateValue = 'not-a-date';
  input.setAttribute('value', notADateValue);

  timePickerSupport = input.value !== notADateValue;
})();

const ControlPanel = ({ isDraggingX, setDueDate, task, handleSetIsFocused }) => {

  function handleDateChange(date) {
    if (!date) {
      setDueDate(null, null, null, null, task.id);
    } else {
      const formattedDate = format(date, DATE_FORMAT);
      const distanceToNow = date && formatDistanceToNow(date);
      const diffInHours = differenceInHours(date, Date.now());
      const dueSoon = diffInHours <= 48 && diffInHours >= 0;
      const overdue = diffInHours < 0;
      setDueDate(formattedDate, dueSoon, overdue, distanceToNow, task.id);
    }
  }

  const parsedDate = task.dueDate && parse(task.dueDate, 'M/d/yyyy, h:mm a', new Date());

  return (
    <ExtraStuff
      layout={!isDraggingX ? "position" : false}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{marginLeft: `0.25rem`}}
    >
      <MetaData>
        <MetaItem>
          {task.dueDate && "Due: "}
          <DatePicker
            onChange={date => handleDateChange(date)}
            timeInputLabel="Time:"
            dateFormat="M/d/yyyy, h:mm a"
            showTimeInput={timePickerSupport ? true : false}
            showTimeSelect={!timePickerSupport ? true : false}
            onCalendarOpen={() => handleSetIsFocused(true)}
            onCalendarClose={() => handleSetIsFocused(false)}
            timeIntervals={15}
            shouldCloseOnSelect={false}
            closeOnScroll={true}
            selected={parsedDate}
            openToDate={parsedDate}
            placeholderText="Set Due Date"
            isClearable
            popperModifiers={{
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: "viewport"
              }
            }}
          />
        </MetaItem>
        <MetaItem>
          Created: {format(task.dateCreated, "MM/dd/yyyy")} at {format(task.dateCreated, "hh:mm a")}
        </MetaItem>
        {task.dateCompleted ? <MetaItem>Completed: {format(task.dateCompleted, "MM/dd/yyyy")} at {format(task.dateCompleted, "hh:mm a")}</MetaItem> : null}
      </MetaData>
    </ExtraStuff>
  );
};

export default ControlPanel;
