import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Select from '../Select';
import './style.scss';

const weekdayshort = moment.weekdaysShort();

const Calender = ({ data }) => {
  const [dateObject, setDateObj] = useState(moment());
  const [allmonths] = useState(moment.months());
  const { isAdmin } = useSelector((state) => state.auth);

  const firstDayOfMonth = () => {
    return moment(dateObject).startOf('month').format('d');
  };

  let weekdayshortname = weekdayshort.map((day) => {
    return (
      <th key={day} className="week-day">
        <span className="flex-row mx-auto">{day}</span>
      </th>
    );
  });

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(
      <td className="calendar-day empty" key={`calender_empty_${i}`}>
        <span className="flex-row mx-auto">
          <p>{''}</p>
        </span>
      </td>
    );
  }

  let today = () => {
    return dateObject.format('D');
  };

  function formatdata(date) {
    if (!date) return;
    const day = new Date(date.date).getDate();
    return {
      day,
      time: date.time,
    };
  }

  let accessableData = [];

  accessableData =
    data &&
    data.filter((date) => {
      const year = new Date(date.date).getFullYear().toString();
      const month = allmonths[new Date(date.date).getMonth()];

      return (
        year === dateObject.format('Y') && month === dateObject.format('MMMM')
      );
    });

  let daysInMonth = [];
  let classes = [...blanks];
  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    const currentDay =
      d === Number(today()) &&
      allmonths[new Date().getMonth()] === dateObject.format('MMMM') &&
      new Date().getFullYear().toString() === dateObject.format('Y')
        ? 'today'
        : '';
    const classDay =
      accessableData && accessableData.find((day) => formatdata(day).day === d);

    classes.push(`calendar-day ${currentDay}${classDay ? ' classDay' : ''}`);
    daysInMonth.push(
      <td key={d}>
        <span className="flex-row mx-auto">
          <p>{d}</p>
        </span>
        {classDay ? (
          <div className="toolTip flex-row">
            <p>
              {!isAdmin && `You have the class`}{' '}
              <strong>"{classDay.title}"</strong> Today by{' '}
              {moment(classDay.time, 'HH:mm').format('hh:mm A')}
            </p>
          </div>
        ) : (
          ''
        )}
      </td>
    );
  }

  var totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  let el;
  totalSlots.forEach((row, i) => {
    if ((i % 7) / 3 < 1) {
      el = React.cloneElement(row, { className: `left ${classes[i]}` });
    } else {
      el = React.cloneElement(row, { className: `right ${classes[i]}` });
    }

    if (i % 7 !== 0) {
      cells.push(el); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(el); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });

  let daysinmonth = rows.map((d, i) => {
    return <tr key={`days_in_months_${i}`}>{d}</tr>;
  });

  function month() {
    return dateObject.format('MMMM');
  }

  const MonthList = (props) => {
    let months = [];
    props.data.map((data, i) =>
      months.push(
        <td
          key={`clander_moths_${i}`}
          onClick={(e) => {
            setMonth(data);
          }}
          data-active={data === month()}
        >
          {data}
        </td>
      )
    );

    let rows = [];

    rows.push(months);

    let monthlist = rows.map((d, i) => {
      return (
        <tr className="flex-col" key={`monthlist_${i}`}>
          {d}
        </tr>
      );
    });

    return (
      <table className="calendar-month">
        <tbody>{monthlist}</tbody>
      </table>
    );
  };

  function setMonth(month) {
    let monthNo = allmonths.indexOf(month); // get month number
    let newdateObject = Object.assign({}, dateObject);
    newdateObject = moment(newdateObject).set('month', monthNo); // change month value
    setDateObj(newdateObject);
  }

  function year() {
    return dateObject.format('Y');
  }

  function getDates(startDate, stopDate) {
    let dateArray = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY'));
      currentDate = moment(currentDate).add(1, 'year');
    }

    return dateArray.map((date) => ({
      name: date,
      value: date,
    }));
  }

  const setYear = (e) => {
    const year = e.target.value;
    let newdateObject = Object.assign({}, dateObject);
    newdateObject = moment(newdateObject).set('year', year);
    setDateObj(newdateObject);
  };

  return (
    <div className="r_calenx">
      <Select
        currentText={year()}
        inputs={getDates('2019', (new Date().getFullYear() + 2).toString())}
        handleSelect={setYear}
        value={new Date().getFullYear().toString()}
      />
      <div className="calendar flex-row">
        <div className="calendar-date">
          <MonthList data={moment.months()} />
        </div>
        <table className="calender-body">
          <thead>
            <tr>{weekdayshortname}</tr>
          </thead>
          <tbody>{daysinmonth}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Calender;
