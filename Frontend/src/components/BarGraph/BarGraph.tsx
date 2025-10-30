import { AgChartsReact } from 'ag-charts-react';
import { useEffect, useState } from 'react';
import { getDaysLeft } from 'src/helper/helperFunc';
import { IBarGraphData, IGraphDataItem } from 'src/views/TaskHome/ITaskHomeProps';

const BarGraph = ({ graphData }: IGraphDataItem) => {
    const [barGraphData, setBarGraphData] = useState<IBarGraphData[]>([]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newData: any = [];
        for (const item of graphData) {
            const transformedItems = item?.items?.map(data => {
                const { priority, dueDate } = data;
                const daysLeft = getDaysLeft(dueDate);
                const capitalisePriority = priority.toUpperCase()
                return { priority: capitalisePriority, dueDate: daysLeft };
            }) || [];
            newData.push(...transformedItems);
        }
        setBarGraphData(newData);
    }, [graphData]);

    const getData = () => barGraphData

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartOptions: any = {
        title: {
            text: 'Priority vs Due Date',
        },
        series: [
            {
                type: 'bar',
                xKey: 'priority',
                yKey: 'dueDate',
                yName: 'Days left'
            },
        ],
        data: getData(),
    };

    return (
        <div className='chartContainer'>
            <AgChartsReact options={chartOptions} />
        </div>
    );
};

export default BarGraph;
