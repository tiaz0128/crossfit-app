import { eachDayOfInterval, startOfWeek, endOfWeek, format } from 'date-fns';

const START_DAY = 1;
const END_DAY = 0;

const getSelectedWeek = (selectedDay: Date) => {
  return eachDayOfInterval({
    start: startOfWeek(selectedDay, { weekStartsOn: START_DAY }),
    end: endOfWeek(selectedDay, { weekStartsOn: END_DAY }),
  });
};

const getClickedDate = (divElement: HTMLDivElement) => {
  return new Date(divElement.dataset.date as string);
};

const setFullDateFormat = (date: Date | number) => {
  return format(date, 'yyyy-MM-dd');
};

export { getSelectedWeek, getClickedDate, setFullDateFormat };
