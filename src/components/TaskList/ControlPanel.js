import React, { useEffect } from 'react';
// import { AnimateSharedLayout } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { format, differenceInHours, parse, formatDistanceToNow } from 'date-fns';
import { ExtraStuff } from '../../styles/style';
import "react-datepicker/dist/react-datepicker.css";

const DATE_FORMAT = "M/d/yyyy, h:mm a";
let timePickerSupport;
let parsedDate = "";
let distanceToNow = "";
let dueSoon = false;

(function () {
  var input = document.createElement('input');
  input.setAttribute('type', 'date');

  var notADateValue = 'not-a-date';
  input.setAttribute('value', notADateValue);

  timePickerSupport = input.value !== notADateValue;
})();

const ControlPanel = ({ isDraggingX, updateDueDate, task, handleSetIsFocused }) => {

  async function handleDateChange(date) {
    if (!date) {
      updateDueDate(null, task.id);
    } else {
      const formattedDate = format(date, DATE_FORMAT);
      const distanceToNow = date && formatDistanceToNow(date);
      const dueSoon = differenceInHours(date, Date.now()) <= 48;
      console.log(differenceInHours(date, Date.now()));
      await updateDueDate(formattedDate, dueSoon, distanceToNow, task.id);
    }
  }
  
  parsedDate = task.dueDate && parse(task.dueDate, 'M/d/yyyy, h:mm a', new Date());

  return (
    // <AnimateSharedLayout>
    <ExtraStuff
      layout={!isDraggingX ? "position" : false}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
      /> <br />
      {task.distanceToNow && "Due: " + task.distanceToNow + " from now"}<br />
      Created: {format(task.dateCreated, "MM/dd/yyyy")} at {format(task.dateCreated, "hh:mm a")} <br />
      {task.dateCompleted ? "Completed: " + format(task.dateCompleted, "MM/dd/yyyy") + " at " + format(task.dateCompleted, "hh:mm a") : null}
      {console.log(task.dueSoon)}
      {task.dueSoon ? "true" : "false"}
    </ExtraStuff>
    // </AnimateSharedLayout>
  );
};

export default ControlPanel;
