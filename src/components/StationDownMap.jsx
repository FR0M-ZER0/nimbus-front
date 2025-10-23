import { Link } from 'react-router'

function StationDownMap() {
    return (
        <div className='flex justify-end'>
            <div className='flex flex-col mt-40 mr-12'>
                <h3 className='text-3xl green-color-text font-semibold mb-1'>24 Estações online</h3>
                <p className='text-5xl red-color-text font-semibold mb-4'>3 Offline</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <p className='mb-4'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <Link className='alt-light-color-text'>Ver tudo</Link>
            </div>
            <div>
                <img src="/brazil_dotted_map.svg" alt="brazil" width={900} />
            </div>
        </div>
    )
}

export default StationDownMap
