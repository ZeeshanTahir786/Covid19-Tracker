import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line,Bar } from "react-chartjs-2";
import styles from "./chart.module.css";

const Chart = ({data: { confirmed, recovered, deaths }, country}) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
    //To display Golbal daily data consists on only infected, deaths and dates
    };
    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'Infected',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: true },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{          
          labels: dailyData.map(({ date }) => date),          
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, 
          // Recovered data not exist in the selected API
          // {
          //   data: dailyData.map((data) => data.recovered),
          //   label: 'Recovered',
          //   borderColor: 'green',
          //   backgroundColor: 'rgba(0, 255, 0, 0.5)',
          //   fill: true,
          // }, 
          {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return <div className={styles.container}>
     {country ? barChart : lineChart}
  </div>;
};

export default Chart;
