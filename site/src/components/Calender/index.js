import React, { useState } from 'react';
import moment from 'moment';
import Select from '../Select';
import './style.scss';

const weekdayshort = moment.weekdaysShort();

const Calender = ({ data }) => {
  const [dateObject, setDateObj] = useState(moment());
  const [allmonths] = useState(moment.months());

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

  const accessableData =
    data &&
    data.filter((date) => {
      const year = new Date(date.date).getFullYear().toString();
      const month = allmonths[new Date(date.date).getMonth()];
      const day = new Date(date.date).getDay();

      console.log(
        year === dateObject.format('Y') && month === dateObject.format('MMMM'),
        year,
        month,
        dateObject.format('Y'),
        dateObject.format('MMMM')
      );

      return (
        year === dateObject.format('Y') && month === dateObject.format('MMMM')
      );
    });

  console.log(accessableData);

  let daysInMonth = [];
  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    const currentDay = d === Number(today()) ? 'today' : '';
    // const year = new Date()

    daysInMonth.push(
      <td key={d} className={`calendar-day ${currentDay}`}>
        <span className="flex-row mx-auto">
          <p>{d}</p>
        </span>
      </td>
    );
  }

  var totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(row); // in current loop we still push current row to new container
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
    props.data.map((data, i) => {
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
      );
    });

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
        inputs={getDates('1965', '2020')}
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
