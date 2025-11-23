import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence } from 'framer-motion'

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
    const [selectedStation, setSelectedStation] = useState(null)
    const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 })
    const svgContainerRef = useRef(null)
    const svgElementRef = useRef(null)

    const onlineCount = stations.filter(s => s.status === 'online').length
    const offlineCount = stations.filter(s => s.status === 'offline').length

    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch('/brazil_dotted_map.svg')
                const svgText = await response.text()
                const parser = new DOMParser()
                const doc = parser.parseFromString(svgText, 'image/svg+xml')
                const svg = doc.documentElement

                if (svg.tagName !== 'svg') throw new Error('Invalid SVG')

                svg.setAttribute('class', 'w-[900px]')
                svg.setAttribute('width', '900')
                svg.setAttribute('height', 'auto')

                if (svgContainerRef.current) {
                    svgContainerRef.current.innerHTML = ''
                    svgContainerRef.current.appendChild(svg)
                    svgElementRef.current = svg
                    applyStationStyles(svg, stations)
                }
            } catch (err) {
                console.error('Failed to load or parse SVG', err)
            }
        }

        loadSVG()
    }, [])

    useEffect(() => {
        if (svgElementRef.current) {
            applyStationStyles(svgElementRef.current, stations)
        }
    }, [stations])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (svgContainerRef.current && !svgContainerRef.current.contains(e.target)) {
                setSelectedStation(null)
            }
        }

        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                setSelectedStation(null)
            }
        }

        window.addEventListener('click', handleClickOutside)
        window.addEventListener('keydown', handleEscKey)

        return () => {
            window.removeEventListener('click', handleClickOutside)
            window.removeEventListener('keydown', handleEscKey)
        }
    }, [])

    const applyStationStyles = (svg, stations) => {
        svg.querySelectorAll('circle').forEach(c => {
            c.setAttribute('fill', '#ccc')
            c.style.cursor = 'default'
            c.onclick = null
        })

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

                    circle.onclick = (e) => {
                        e.stopPropagation()
                        const rect = svg.getBoundingClientRect()
                        const cx = e.clientX - rect.left
                        const cy = e.clientY - rect.top
                        setPopoverPos({ x: cx, y: cy })
                        setSelectedStation(station)
                    }
                }
            } catch (e) {
                console.warn('Invalid state class:', stateClass, e)
            }
        })
    }

    return (
        <div className='flex justify-end'>
            <div className='flex flex-col mt-40 mr-12'>
                <h3 className='text-3xl green-color-text font-semibold mb-1'>{onlineCount} Estações online</h3>
                <p className='text-5xl red-color-text font-semibold mb-4'>{offlineCount} Offline</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <p className='mb-2'>01/03/2025 - 22:21 (Estação xyz123)</p>
                <Link className='alt-light-color-text'>Ver tudo</Link>
            </div>

            <div className='relative w-[900px]'>
                <div ref={svgContainerRef} className='w-[900px]' />

                <AnimatePresence>
                    {selectedStation && (
                        <motion.div
                            key="popover"
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="absolute w-64 main-dark-color-bg rounded-lg border-1 border-[#9093B4] p-4 pointer-events-auto flex items-center justify-between"
                            style={{
                                top: popoverPos.y - 130,
                                left: popoverPos.x - 100,
                            }}
                        >
                            <div className='alt-light-color-text'>
                                <h4 className="font-semibold mb-1 main-light-color-text">{selectedStation.Nome}</h4>
                                <p className="mb-1">{selectedStation.address}</p>
                                <p>
                                    Status:
                                    <span className={`ml-1 font-semibold ${selectedStation.status === 'online' ? 'green-color-text' : 'red-color-text'}`}>
                                        {selectedStation.status}
                                    </span>
                                </p>
                                <p className="mt-1">
                                    Lat: {selectedStation.Lat}, Long: {selectedStation.Long}
                                </p>
                            </div>

                            <div>
                                <img src={selectedStation.image} alt="station" width={60} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default StationDownMap
