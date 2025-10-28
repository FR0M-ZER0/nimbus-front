import { ResponsiveLine } from '@nivo/line'

export default function MeasureChart({ data }) {
  return (
    <div style={{ height: 400 }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Horário',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Valor',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.2}
        useMesh={true}
        theme={{
          fontFamily: 'Inter, sans-serif',
          textColor: '#fff',
          labels: {
            text: {
              fontSize: 12,
              fill: '#fff',
            },
          },
          axis: {
            ticks: {
              text: {
                fill: '#fff',
              },
            },
            legend: {
              text: {
                fill: '#fff',
              },
            },
          },
          tooltip: {
            container: {
              background: '#222',
              color: '#fff',
            },
          },
        }}
      />
    </div>
  )
}
