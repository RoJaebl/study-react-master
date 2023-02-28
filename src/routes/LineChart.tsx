import { useOutletContext } from "react-router-dom";
import ApexCharts, { Props } from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import { IChartContext } from "./Chart";
import { isDarkAtom } from "./atom";
import { useRecoilValue } from "recoil";

export default function LineChart() {
    const isDark = useRecoilValue(isDarkAtom);
    const { coinId, name, histories } = useOutletContext() as IChartContext;
    const { type, series, options } = {
        type: "line",
        series: [
            {
                name: "Price",
                data: histories?.map((history) =>
                    Number(history.close)
                ) as number[],
            },
        ],
        options: {
            xaxis: {
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: histories?.map((history) => history.time_close),
            },
            yaxis: { labels: { show: false } },
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
                height: 300,
                width: 500,
                toolbar: {
                    show: false,
                },
                background: "transparent",
            },
            grid: { show: false },
            stroke: {
                curve: "smooth",
                width: 4,
            },
            fill: {
                type: "gradient",
                gradient: {
                    gradientToColors: ["#4cd137"],
                    stops: [0, 100],
                },
            },
            tooltip: { y: { formatter: (value) => `$${value.toFixed(2)}` } },
            colors: ["#00a8ff"],
        },
    } as Props;
    return (
        <>
            <Helmet>
                <title>{`${name}-chart line`}</title>
            </Helmet>
            <ApexCharts type={type} series={series} options={options} />
        </>
    );
}
