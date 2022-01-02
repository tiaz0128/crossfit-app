import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import * as React from 'react';

import { END_DAY } from '../../util/time';

function WeekCalendar({
  selectedDay,
  handleDay,
  selectedWeek,
  handleWeek,
}: {
  selectedDay: Date;
  handleDay: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selectedWeek: Date[];
  handleWeek: (oneWeek: number) => void;
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '2.5rem',
        }}
      >
        <div
          key={1}
          onClick={() => {
            handleWeek(-1);
          }}
        >
          {'<'}
        </div>
        <div>{format(selectedDay, 'yyyy년 MMM', { locale: ko })}</div>
        <div
          key={2}
          onClick={() => {
            handleWeek(1);
          }}
        >
          {'>'}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {selectedWeek.map(
          (day, idx) =>
            day.getDay() !== END_DAY && (
              <div
                key={idx}
                style={{
                  color: isSameDay(selectedDay, day) ? 'green' : 'black',
                  fontSize: '2rem',
                }}
                onClick={handleDay}
              >
                <span
                  style={{
                    margin: '10px',
                  }}
                >
                  {format(day, 'ccccc', { locale: ko })}
                </span>
                <div data-date={day}>{format(day, 'dd', { locale: ko })}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default WeekCalendar;
