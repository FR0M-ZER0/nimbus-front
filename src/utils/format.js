function formatISOToBR(isoDate) {
  const d = new Date(isoDate)

  const pad = num => String(num).padStart(2, '0')

  const dia = pad(d.getDate())
  const mes = pad(d.getMonth() + 1)
  const ano = d.getFullYear()

  const horas = pad(d.getHours())
  const minutos = pad(d.getMinutes())
  const segundos = pad(d.getSeconds())

  return `${dia}/${mes}/${ano} às ${horas}:${minutos}:${segundos}`
}

export {
    formatISOToBR
}