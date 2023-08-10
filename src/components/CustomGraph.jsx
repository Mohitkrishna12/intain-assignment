import React from 'react'
import Chart from "react-apexcharts";
import { styled } from "styled-components";

const StyledGraph = styled.div`
  border: 2px solid #e8e9ed;
`;

const CustomGraph = ({data}) => {
    const series = data?.map((e) =>({name:e?.officer_name,data:e?.status}));
    const options = {
      chart: {
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          align: "center",
          style: {
            fontSize: "12px",
            fontWeight: 400,
          },
        },
        axisBorder: {
          show: true,
          color: "#e8e9ed",
          offsetX: 0,
          offsetY: 0,
        },
      },
      grid: {
        show: false,
        borderColor: "#90A4AE",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 30,
        },
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 10,
                color: "#FFFFFF",
              },
              {
                from: 11,
                to: 29,
                color: "#C6F1F1",
              },
              {
                from: 30,
                to: 79,
                color: "#63D9D9",
              },
              {
                from: 80,
                to: 100,
                color: "#022121",
              },
            ],
          },
        },
      },
      legend: {
        show: false,
      },
    };
  return (
    <StyledGraph>
        <Chart options={options} series={series} type="heatmap" height={"300px"} />
    </StyledGraph>
  )
}

export default CustomGraph