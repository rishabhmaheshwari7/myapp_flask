import React, { useEffect, useState } from 'react'
import './RadarChart.styles.css'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Radar } from 'react-chartjs-2';
import Nav from '../ui/nav/Nav.component';
import ViewResult from '../view_result/ViewResult';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  
const labels = ['Code Quality', 'Source code management', 'Testing', 'Security', 'Observability', 'Continuous Integration','Sprint Planning','Estimation','Stakeholder Management','Engagement'];
const data = {
    labels,
    datasets: [
      {
        label: '# of Votes',
        data: [55, 90, 30, 50, 60, 100, 70, 95, 40, 85],
        backgroundColor: 'rgba(66, 143, 212, 0.2)',
        borderColor: 'rgba(66, 143, 212, 1)',
        borderWidth: 1,
      },
    ],
  };

  
const options = {
    scales: {
        r: {
            angleLines: {
                display: false
            },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1
            }
          }
    }
};

export default function RadarChart() {
  const [agileData, setagileData] = useState({
    labels,
    datasets: [
      {
        label: 'First Assessment',
        data: [],
        borderColor: 'rgb(66, 143, 212)',
        backgroundColor: 'rgba(66, 143, 212, 0.5)',
      },
    ],
  });


  const [engData, setengData] = useState({
    labels,
    datasets: [
      {
        label: 'First Assessment',
        data: [],
        borderColor: 'rgb(66, 143, 212)',
        backgroundColor: 'rgba(66, 143, 212, 0.5)',
      },
    ],
  });
  const navigate = useNavigate();

  const [prodData, setprodData] = useState({
    labels,
    datasets: [
      {
        label: 'First Assessment',
        data: [],
        borderColor: 'rgb(66, 143, 212)',
        backgroundColor: 'rgba(66, 143, 212, 0.5)',
      },
    ],
  });
  useEffect(() => {
    async function toCheckForResult(){
      try {  
          let sha = sessionStorage.getItem("shaToPassForResult");
          let res;
          if(sha)
            res = await axios.get(`http://localhost:8080/api/test/checkisvalidkey/${sha}`);
          else 
            navigate("/error/invalid/assessment");
          console.log(res.data);
      } catch (error) {
        console.log(error); 
        navigate("/error/invalid/assessment");
      }
    }
    toCheckForResult();
  }, [])
  useEffect(() => {
    async function fetchDataForChart(){
      try {
      const res1 = await axios.get("http://localhost:8080/api/test/questions");
      console.log(res1.data);
      const res2 = await axios.get(`http://localhost:8080/api/test/responsestats/${sessionStorage.getItem("shaToPassForResult")}`);
      console.log(res2.data);
      let bigArrayOfObject = [];
      for(let i = 0; i < res1.data.length; i++){
        bigArrayOfObject[i] = {
          ...res1.data[i],
          ...res2.data[i]
        }
      }
      console.log(bigArrayOfObject);

      let aF = [], eF = [], pF = [];
      bigArrayOfObject.forEach(bigObj => {
        if(bigObj.category == "a"){
          aF.push(bigObj);
        }
        else if(bigObj.category == "e"){
          eF.push(bigObj);
        }
        else if(bigObj.category == "p"){
          pF.push(bigObj);
        }
      })
      
      let aFMap = new Map(), eFMap = new Map(), pFMap = new Map();
      
      // for agile graph
      aF.forEach(af => {
        let arrAlreadyInaFMapKey = aFMap.get(af.competency);
        if(arrAlreadyInaFMapKey){
          eFMap.set(af.competency, [...arrAlreadyInaFMapKey, af.maxSelectedId])}
        else{
          aFMap.set(af.competency, [af.maxSelectedId])
        }  
      })
      console.log(aFMap);
      let aFLabel = [], aFValues = [];
      aFMap.forEach((v, k) => {
        let cnt = 0;
        v.forEach((val) => {
          cnt += val;
        });
        aFLabel.push(k);
        cnt = Math.ceil(cnt/v.length);
        aFValues.push(cnt);
      })
      // for engineering
      eF.forEach(ef => {
        let arrAlreadyIneFMapKey = eFMap.get(ef.competency);
        if(arrAlreadyIneFMapKey){
          eFMap.set(ef.competency, [...arrAlreadyIneFMapKey, ef.maxSelectedId])}
        else{
          eFMap.set(ef.competency, [ef.maxSelectedId])
        }  
      })
      console.log(eFMap);
      let eFLabel = [], eFValues = [];
      eFMap.forEach((v, k) => {
        let cnt = 0;
        v.forEach((val) => {
          cnt += val;
        });
        eFLabel.push(k);
        cnt = Math.ceil(cnt/v.length);
        eFValues.push(cnt);
      })
      console.log(pF);
      // for product
      pF.forEach(pf => {
        let arrAlreadyInpFMapKey = pFMap.get(pf.competency);
        if(arrAlreadyInpFMapKey){
          pFMap.set(pf.competency, [...arrAlreadyInpFMapKey, pf.maxSelectedId])}
        else{
          pFMap.set(pf.competency, [pf.maxSelectedId])
        }  
      })
      console.log(pFMap);
      let pFLabel = [], pFValues = [];
      pFMap.forEach((v, k) => {
        let cnt = 0;
        v.forEach((val) => {
          cnt += val;
        });
        pFLabel.push(k);
        cnt = Math.ceil(cnt/v.length);
        pFValues.push(cnt);
      })

      console.log(aFValues);
      console.log(eFValues);
      console.log(pFValues);
      
      setagileData({
    labels: aFLabel,
    datasets: [
      {
        label: 'First Assessment',
        data: aFValues,
        borderColor: 'rgb(66, 143, 212)',
        backgroundColor: 'rgba(66, 143, 212, 0.5)',
      },
    ],
  })

    setengData({
    labels: eFLabel,
    datasets: [
      {
        label: 'First Assessment',
        data: eFValues,
        borderColor: 'rgb(66, 143, 212)',
        backgroundColor: 'rgba(66, 143, 212, 0.5)',
      },
    ],
  })
    setprodData({
    labels: pFLabel,
    datasets: [
      {
        label: 'First Assessment',
        data: pFValues,
        borderColor: 'rgb(66, 143, 212)',
        backgroundColor: 'rgba(66, 143, 212, 0.5)',
      },
    ],
  })

      // console.log(aLabel, aMax, eLabel, eMax, pLabel, pMax); 
      } catch (error) {
        console.log(error);
      }
    }
    fetchDataForChart();
  }, [])
  return (
    <>
    <ViewResult activatedBtn="C" />
        <div className='page'>
        <h2 style={{textAlign: "center"}}>Radar Chart</h2>
        <p style={{textAlign: "center"}}>(Based on Competency)</p>
        <div className='radarBox'>
            
             <div className='headText'>
                 <h3>Dimension: Agile</h3>
             </div>
              <div className='radar'>
                 <Radar data={agileData} options={options} />
              </div> 
        
        </div>
        <div className='radarBox'>
            
            <div className='headText'>
                <h3>Dimension: Product</h3>
            </div>
             <div className='radar'>
                <Radar data={prodData} options={options} />
             </div> 
       
       </div>
       <div className='radarBox'>
            
            <div className='headText'>
                <h3>Dimension: Engineering</h3>
            </div>
             <div className='radar'>
                <Radar  data={engData} options={options} />
             </div> 
       
       </div>
       </div>
    </>
  )
}
