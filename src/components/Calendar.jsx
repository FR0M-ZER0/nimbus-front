import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { CalendarDotsIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

function Calendar() {
    const today = new Date()
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [alarmsByDay, setAlarmsByDay] = useState({})

    const monthNames = [
        'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
        'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
    ]

    const loadAlarms = async () => {
        try {
            const { data } = await api.get('/alarms/by-month', {
                params: { year: currentYear, month: currentMonth + 1 }
            })

            const count = {}
            data.forEach(a => {
                const date = new Date(a.created_at)
                const day = date.getDate()
                count[day] = (count[day] || 0) + 1
            })

            setAlarmsByDay(count)

        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        loadAlarms()
    }, [currentMonth, currentYear])

    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const daysArray = []

    for (let i = 0; i < firstDay; i++) daysArray.push(null)
    for (let d = 1; d <= daysInMonth; d++) daysArray.push(d)

    const weeks = []
    for (let i = 0; i < daysArray.length; i += 7)
        weeks.push(daysArray.slice(i, i + 7))

    const prevMonth = () => {
        setCurrentMonth(prev => {
            if (prev === 0) {
                setCurrentYear(y => y - 1)
                return 11
            }
            return prev - 1
        })
    }

    const nextMonth = () => {
        setCurrentMonth(prev => {
            if (prev === 11) {
                setCurrentYear(y => y + 1)
                return 0
            }
            return prev + 1
        })
    }

    const goToday = () => {
        setCurrentYear(today.getFullYear())
        setCurrentMonth(today.getMonth())
    }

    return (
        <div className='dark-gradient h-full rounded-lg p-8'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center space-x-2'>
                    <h2 className='text-2xl'>
                        {monthNames[currentMonth]} {currentYear}
                    </h2>
                    <CalendarDotsIcon size={26} />
                </div>

                <div className='flex items-center space-x-3'>
                    <CaretLeftIcon size={22} className="cursor-pointer" onClick={prevMonth}/>
                    <p onClick={goToday} className="cursor-pointer">Hoje</p>
                    <CaretRightIcon size={22} className="cursor-pointer" onClick={nextMonth}/>
                </div>
            </div>

            <div className="grid grid-cols-7 text-center mb-2 mt-12">
                <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div>
                <div>Qui</div><div>Sex</div><div>Sáb</div>
            </div>

            <div className="grid grid-cols-7 text-center">
                {weeks.map((week, wi) => (
                    <React.Fragment key={wi}>
                        {week.map((day, di) => (
                            <div key={di} className="flex flex-col items-center rounded-md py-4 h-32 border-1 border-[#262730]">
                                {day || ""}
                                {day && alarmsByDay[day] && (
                                    <div className='flex justify-center items-center w-full red-color-bg rounded-lg py-2 px-1 mt-4'>
                                        <p>{alarmsByDay[day]} alarmes</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Calendar
