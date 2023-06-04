import { useContext, useEffect, useRef, useState } from 'react';
import './calendar.scss'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom';
import { TRAININGS_ROUTE } from '../utils/consts';
import { Context } from "../..";
import { getTrainings } from '../../https/TrainingApi';

const defaulValues = {
    date: new Date(),
    years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2023],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс'],
    onChange: Function.prototype
};

const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    Novermber: 10,
    December: 11
};

const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];

function areEqual(a, b) {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function isLeapYear(year) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

function getDaysInMonth(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = DAYS_IN_MONTH[month];
    
    if (isLeapYear(year) && month === Month.February) {
        return daysInMonth + 1;
    } else {
        return daysInMonth;
    }
}

function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();

    return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

function getMonthData(year, month) {
    const result = [];
    const date = new Date(year, month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
        result[i] = [];
        
        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++);
            }
        }
    }

    return result;
}

const Calendar = ({dateTraining, setDateTraining, activeCalendar, setActiveCalendar}) => {

    const {user, trainings} = useContext(Context);
    const [trainingsContains, setTrainingsContains] = useState([])

    useEffect(() => {
        getTrainings(user.userId).then(data => setTrainingsContains(data))
    }, [user,  dateTraining])

    const checkTraining = (date) => {

        const elem = trainingsContains.find((el) => {
            const elDate = new Date(el.date)

            return elDate.getFullYear() === date.getFullYear() &&
            elDate.getMonth() === date.getMonth() &&
            elDate.getDate() === date.getDate()
        })
        if (elem) {return true}
        return false
    }

    const {date, monthNames, years, weekDayNames} = defaulValues


    const [dateProps, setDateProps] = useState(date);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null)
    const monthSelect = useRef();
    const yearSelect = useRef()

 

    const monthData = getMonthData(dateProps.getFullYear(), dateProps.getMonth());

    const handlePrevButtonClick = () => {
        const date = new Date(dateProps.getFullYear(), dateProps.getMonth() - 1)
        setDateProps(date);
    }

    const handleNextButtonClick = () => {
        const date = new Date(dateProps.getFullYear(), dateProps.getMonth() + 1)
        setDateProps(date);
    }

    const handleSelectChange = () => {
        const year = yearSelect.current.value;
        const month = monthSelect.current.value;
        const date = new Date(year, month);
        setDateProps(date);
        setDateTraining(dateProps)
    }

    const handleDayClick = (date) => {

        if (date !== currentDate){
            localStorage.setItem('dateTraining', date)
        }
        setSelectedDate(date)
        setDateTraining(date)
        defaulValues.onChange(date)
    }

    return(

        <div className={activeCalendar ? "calendar active" : "calendar "}>
            <div className='calendar-header'>
                <div style={{padding:'10px 2px'}}>
                    <button onClick={handlePrevButtonClick}>{'<'}</button>

                    <select
                        ref={monthSelect}
                        value={dateProps.getMonth()}
                        onChange={handleSelectChange}
                    >
                        {monthNames.map((name, index) =>
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>

                    <select
                        ref={yearSelect}
                        value={dateProps.getFullYear()}
                        onChange={handleSelectChange}
                    >
                        {years.map(year =>
                            <option key={year} value={year}>{year}</option> 
                        )}
                    </select>

                    <button onClick={handleNextButtonClick}>{'>'}</button>
                </div>
            </div>

            <table style={{width: '300px'}}>
                <thead>
                    <tr>
                        {weekDayNames.map(name =>
                            <th key={name}>{name}</th>    
                        )}
                    </tr>
                </thead>

                <tbody>
                    {monthData.map((week, index) =>
                        <tr key={index} className="week">
                            {week.map((date, index) => date ?
                                <td
                                key={index}
                                className={classnames('day', {
                                    'today': areEqual(date, currentDate),
                                    'selected': areEqual(date, selectedDate),
                                    'contains': checkTraining(date)
                                })}
                                onClick={() => {handleDayClick(date);}}
                                >{date.getDate()}</td>
                                :
                                <td key={index} />
                            )}
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>

    )
}

export default Calendar;