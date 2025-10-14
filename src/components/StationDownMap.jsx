import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

const stateMap = {
  ac: 'acre', al: 'alagoas', ap: 'amapa', am: 'amazonas',
  ba: 'bahia', ce: 'ceara', df: 'distrito-federal', es: 'espirito-santo',
  go: 'goias', ma: 'maranhao', mt: 'mato-grosso', ms: 'mato-grosso-do-sul',
  mg: 'minas-gerais', pa: 'para', pb: 'paraiba', pr: 'parana',
  pe: 'pernambuco', pi: 'piaui', rj: 'rio-de-janeiro', rn: 'rio-grande-do-norte',
  rs: 'rio-grande-do-sul', ro: 'rondonia', rr: 'roraima', sc: 'santa-catarina',
  sp: 'sao-paulo', se: 'sergipe', to: 'tocantins'
}

function StationDownMap({ stations = [] }) {
    const onlineCount = stations.filter(s => s.status === 'online').length
    const offlineCount = stations.filter(s => s.status === 'offline').length
    const [svgContent, setSvgContent] = useState('')

    useEffect(() => {
        fetch('/brazil_dotted_map.svg')
        .then(res => res.text())
        .then(setSvgContent)
    }, [])

    const svgRef = useRef(null)
    useEffect(() => {
        if (!svgRef.current) return
        const svg = svgRef.current

        svg.querySelectorAll('circle').forEach(c => c.setAttribute('fill', '#ccc'))

        stations.forEach(station => {
            const rawAddress = station.address || ''
            const match = rawAddress.match(/\/([a-zA-Z]{2})$/)
            const uf = match ? match[1].toLowerCase() : null
            const stateClass = uf && stateMap[uf]

            if (!stateClass) return

            try {
                const circles = svg.querySelectorAll(`.${stateClass}`)
                if (circles.length > 0) {
                    const circle = circles[Math.floor(Math.random() * circles.length)]
                    circle.setAttribute('fill', station.status === 'online' ? '#0DFF00' : '#BA1200')
                    circle.style.cursor = 'pointer'
                }
            } catch (e) {
                console.warn('Classe de estado inválida:', stateClass, e)
            }
        })
    }, [stations, svgContent])
    return (
        <div className='flex justify-end'>
            <div className='flex flex-col mt-40 mr-12'>
                <h3 className='text-3xl green-color-text font-semibold mb-1'>{onlineCount} Estações online</h3>
                <p className='text-5xl red-color-text font-semibold mb-4'>{offlineCount} Offline</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <p className='mb-4'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <Link className='alt-light-color-text'>Ver tudo</Link>
            </div>
            <div className='w-[900px]'>
                <div
                    ref={svgRef}
                    className='w-[900px]'
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />
            </div>
        </div>
    )
}

export default StationDownMap
