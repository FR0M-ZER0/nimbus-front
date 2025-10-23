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

    const weeks = []
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

            <div className="grid grid-cols-7 text-center mb-2 mt-12">
                <div>Dom</div>
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div>Sáb</div>
            </div>

            <div className="grid grid-cols-7 text-center">
                {weeks.map((week, index) => (
                    <React.Fragment key={index}>
                        {week.map((day, i) => (
                            <div
                                key={i}
                                className={`flex flex-col items-center rounded-md py-4 h-32 border-1 border-[#262730]`}
                            >
                                {day || ''}
                                {
                                    day === 13 &&
                                    <div className='flex justify-center items-center w-full red-color-bg rounded-lg py-2 px-1 mt-4'>
                                        <p>52 alertas</p>
                                    </div>
                                }
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Calendar
