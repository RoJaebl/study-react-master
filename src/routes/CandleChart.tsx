import { useOutletContext } from "react-router-dom";
import ApexCharts, { Props } from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import { IChartContext } from "./Chart";
import dayjs from "dayjs";

export default function CandleChart() {
    const { coinId, name, histories } = useOutletContext() as IChartContext;
    const { type, series, options } = {
        type: "candlestick",
        series: [
            {
                name: "candle",
                data: histories?.map((history, idx) => {
                    const x = history.time_close;
                    const y = [
                        history.open,
                        history.high,
                        history.low,
                        history.close,
                    ];
                    return [x, ...y];
                }),
            },
        ],
        options: {
            theme: { mode: "dark" },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: "#00b746",
                        downward: "#ef403c",
                    },
                    wick: {
                        useFillColor: true,
                    },
                },
            },
            chart: {
                type: "candlestick",
                height: 300,
                width: 500,
                toolbar: {
                    show: false,
                },
                background: "transparent",
            },
            tooltip: {
                enabled: true,
            },
            xaxis: {
                axisTicks: { show: false },
                type: "category",
                labels: {
                    formatter: function (val) {
                        return dayjs(val).format("DD HH:mm");
                    },
                    show: false,
                },
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
                show: false,
            },
            grid: {
                show: false,
            },
        },
    } as Props;
    return (
        <>
            <Helmet>
                <title>{`${name}-chart cnadle`}</title>
            </Helmet>
            <ApexCharts type={type} series={series} options={options} />
        </>
    );
}
