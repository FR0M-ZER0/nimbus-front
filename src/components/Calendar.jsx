import React from 'react'
import { CalendarDotsIcon, CaretLeftIcon } from '@phosphor-icons/react'

function Calendar() {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    const firstDay = new Date(currentYear, currentMonth, 1).getDay()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const daysArray = []

    for (let i = 0; i < firstDay; i++) {
        daysArray.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push(day)
    }

    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
        weeks.push(daysArray.slice(i, i + 7))
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

                <div className='flex items-center space-x-2'>
                    <CaretLeftIcon size={18} />
                    <p>Hoje</p>
                </div>
            </div>

            <div className="grid grid-cols-7 text-center font-medium mb-2">
                <div>Dom</div>
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div>Sáb</div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                {weeks.map((week, index) => (
                    <React.Fragment key={index}>
                        {week.map((day, i) => (
                            <div
                                key={i}
                                className={`h-10 flex items-center justify-center rounded-md ${
                                    day === today.getDate() ? 'bg-blue-500 text-white' : 'text-gray-700'
                                }`}
                            >
                                {day || ''}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Calendar
