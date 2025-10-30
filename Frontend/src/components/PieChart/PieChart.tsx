import { AgChartsReact } from 'ag-charts-react';
import { useEffect, useState } from 'react';
import { STATUSES_OBJ } from 'src/helper/constants';
import { IGraphDataItem } from 'src/views/TaskHome/ITaskHomeProps';
import "./PieChart.css"

const PieChart = ({ graphData }: IGraphDataItem) => {
  const [pieData, setPieData] = useState({ ADDED: 0, STARTED: 0, COMPLETED: 0 });

  useEffect(() => {
    const rawGraphData: Record<string, number> = {};
    for (const item of graphData) {
      rawGraphData[item.status] = item?.items?.length;
    }
    const newData = {
      ADDED: rawGraphData.ADDED || 0,
      STARTED: rawGraphData.STARTED || 0,
      COMPLETED: rawGraphData.COMPLETED || 0,
    };

    setPieData(newData);
  }, [graphData]);


  const getData = () => [
    { taskStatus: STATUSES_OBJ.ADDED, count: pieData.ADDED },
    { taskStatus: STATUSES_OBJ.STARTED, count: pieData.STARTED },
    { taskStatus: STATUSES_OBJ.COMPLETED, count: pieData.COMPLETED },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    title: {
      text: 'Overall Task Anaysis',
    },
    series: [
      {
        type: 'pie',
        angleKey: 'count',
        legendItemKey: 'taskStatus',
      },
    ],
    data: getData(),
  };

  return (
    <div className='chartContainer'>
      {
        Object.keys(pieData).length && <AgChartsReact options={options} />
      }
    </div>
  );
};

export default PieChart;
