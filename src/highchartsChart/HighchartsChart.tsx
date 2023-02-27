import Highcharts from 'highcharts';
import DataPlugin from 'highcharts/modules/data.js';
import { cloneDeep } from 'lodash-es';
import { useEffect, useMemo, useRef } from 'react';
import { selectTitle } from '../store/highchartsOptionsSlice';
import { useAppSelector } from '../store/hooks';
import { createShallowDifference } from './createShallowDifference';
import { defaultOptions } from './defaultoptions';
import './HighchartsChart.css';

// Initialize the Data plugin
DataPlugin(Highcharts);

// Change this to run a different benchmark
const benchmarkType: 'reinitialize' | 'update' | 'updateSmart' = 'reinitialize';

function HighchartsChart() {
    const title = useAppSelector(selectTitle);
    const customOptions: Highcharts.Options = useMemo(
        () => ({
            ...cloneDeep(defaultOptions),
            title: {
                text: title,
            },
        }),
        [title]
    );
    const chartContainer = useRef();
    const chartRef = useRef<Highcharts.Chart>();
    useEffect(
        () => {
            // Initialize the chart
            chartRef.current = new Highcharts.Chart({
                chart: {
                    renderTo: chartContainer.current as any,
                    animation: false,
                },
                ...customOptions,
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        benchmarkType === 'reinitialize' ? [customOptions] : []
    );
    useEffect(() => {
        if (!chartRef.current) {
            return;
        }
        switch (benchmarkType) {
            case 'reinitialize':
                return;
            case 'update':
                chartRef.current.update(customOptions);
                break;
            case 'updateSmart':
                {
                    const diff = createShallowDifference(
                        chartRef.current.userOptions,
                        customOptions
                    );

                    chartRef.current.update(diff);
                }
                break;
        }
    }, [customOptions]);
    return <div ref={chartContainer as any}></div>;
}

export default HighchartsChart;
