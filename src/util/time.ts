import { eachDayOfInterval, startOfWeek, endOfWeek, format } from 'date-fns';

export const START_DAY = 1;
export const END_DAY = 0;

const getSelectedWeek = (selectedDay: Date) => {
  return eachDayOfInterval({
    start: startOfWeek(selectedDay, { weekStartsOn: START_DAY }),
    end: endOfWeek(selectedDay, { weekStartsOn: selectedDay.getDay() !== 0 ? END_DAY : START_DAY }),
  });
};

const getClickedDate = (divElement: HTMLDivElement) => {
  return new Date(divElement.dataset.date as string);
};

const setFullDateFormat = (date: Date | number) => {
  return format(date, 'yyyy-MM-dd');
};

const setMMddFormat = (startDay: Date) => {
  return format(startDay, 'MM월 dd일');
};

export { getSelectedWeek, getClickedDate, setFullDateFormat, setMMddFormat };
