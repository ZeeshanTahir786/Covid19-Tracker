import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import cronaimage from "./images/image.png";
import { fetchData } from "./api/index";

function App() {
  const [data, setData] = useState({});
  const [country , setCountry] = useState('');
  useEffect(() => {
    async function fetchData1() {
      const fetchedData = await fetchData();
      setData(fetchedData);
    }
    fetchData1();
  }, []);
  const handleCountryChange =async (country) => {
    const fetchedData = await fetchData(country);
    setData(fetchedData);
    setCountry(country);
  }
  return (
    <div className={styles.container}>
    <img src={cronaimage} className={styles.image} alt="COVID-19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Chart data={data} country={country}/>
    </div>
  );
}

export default App;
