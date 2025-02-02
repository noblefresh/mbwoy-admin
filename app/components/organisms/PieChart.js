"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

function PieChart({ labels, series }) {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const [chart, setChartData] = useState({
    options: {
      plotOptions: {
        pie: {
          expandOnClick: false,
        },
      },
      fill: {
        colors: [
          "#009f00",
          "#777fff",
          "#fff444",
          "#FFFA49",
          "#E91E63",
          "#9C27B0",
        ],
      },
      colors: [
        "#009f00",
        "#777fff",
        "#fff444",
        "#FFFA49",
        "#E91E63",
        "#9C27B0",
      ],
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: "top",
      },
      labels,
    },
    colors: [
      "#009f00",
      "#777fff",
      "#fff444",
      "#FFFA49",
      "#E91E63",
      "#9C27B0",
    ],
    series,
  });

  useEffect(() => {
    setChartData(prv => ({ ...prv, series }))
  }, [series])



  return (
    <div className="donut">
      {typeof window !== "undefined" && (
        <Chart
          options={chart.options}
          series={chart.series}
          type="donut"
          width="100%"
          height=""
        />
      )}
    </div>
  );
}

export default PieChart;
