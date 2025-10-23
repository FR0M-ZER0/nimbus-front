import InfoCard from './InfoCard'

function DashboardCard({ dataValue, title, updateDate, altData, additionMessage, icon }) {
    return (
        <InfoCard>
            <div className='flex justify-between'>
                <div className='pt-14 max-w-[360px]'>
                    <p className='font-semibold text-6xl mb-2'>{ dataValue }{ altData ? <span className='alt-light-color-text text-4xl ml-1'>{ altData }</span> : '' }</p>
                    <p className='text-3xl'>{ title }</p>
                    <p className='alt-light-color-text'>Última atualização: { updateDate }</p>
                    <p className='red-color-text'>{ additionMessage ? additionMessage : '' }</p>
                </div>

                <div className='alt-light-color-text'>
                    { icon }
                </div>
            </div>
        </InfoCard>
    )
}

export default DashboardCard
