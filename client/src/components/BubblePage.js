import React, { useState, useEffect } from "react";
import AxiosAuth from '../axios/AxiosAuth';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    AxiosAuth().get('http://localhost:5000/api/colors')
      .then(res => {
        console.log('BubblePage', res.data);
        setColorList(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
