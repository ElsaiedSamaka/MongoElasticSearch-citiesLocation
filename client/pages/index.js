import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const getCitiesOne = async (str) => {
  try {
    let searchableCity = str.replace(/,/g, "");
    let url =
      `${process.env.NEXT_PUBLIC_HOST_API}/searchone?city=` + searchableCity;

    let { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getCitiesTwo = async (str) => {
  try {
    let searchableCity = str.replace(/,/g, "");
    let url =
      `${process.env.NEXT_PUBLIC_HOST_API}/searchtwo?city=` + searchableCity;

    let { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const [optionsOne, setOptionsOne] = useState([]);
  const [optionsTwo, setOptionsTwo] = useState([]);
  const [value, setValue] = useState("");

  const onChangeOne = async (e) => {
    if (e.target.value) {
      let data = await getCitiesOne(e.target.value);
      setOptionsOne(data);
    }
  };

  const onChangeTwo = async (e) => {
    if (e.target.value) {
      let data = await getCitiesTwo(e.target.value);
      setOptionsTwo(data);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ marginTop: 50 }}>
        <Autocomplete
          freeSolo
          filterOptions={(x) => x}
          onChange={(e) => setValue(e.target.innerText)}
          options={optionsOne ? optionsOne.map((obj) => obj.fullName) : []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search One"
              onChange={(e) => onChangeOne(e)}
            />
          )}
        />
        <br />
        <br />
        <Autocomplete
          freeSolo
          filterOptions={(x) => x}
          onChange={(e) => setValue(e.target.innerText)}
          options={optionsTwo ? optionsTwo.map((obj) => obj.fullName) : []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Two"
              onChange={(e) => onChangeTwo(e)}
            />
          )}
        />
      </div>
      <h1>{value}</h1>
    </div>
  );
}
