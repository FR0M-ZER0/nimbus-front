
function DateTimeWatcher() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const day = time.getDate()
  const month = time.getMonth() + 1
  const year = time.getFullYear()

  return (
    <div className='flex flex-col items-center font-semibold'>
        {/* O ponto verde indica se o serviço de processamento de dados está on */}
        <div className='rounded-full green-color-bg h-5 w-5 mb-4'></div>
        <p className='text-2xl'>{`${day}/${month.toString().padStart(2, '0')}/${year}`}</p>
        <p className='text-5xl'>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
    </div>
  )
}

export default DateTimeWatcher
