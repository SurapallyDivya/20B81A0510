import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';

function App() {

  const [trainData, setTrainData] = useState([])

  const d = {
    "companyName": "Show Traing",
    "clientID": "daf25a18-0210-4467-b997-d0e25720a4fa",
    "ownerName": "Divya",
    "ownerEmail": "divya.surapally2@gmail.com",
    "rollno": "20B81A0510",
    "clientSecret": "CvokhNhSeFRvuKek"
  }
  

  useEffect(() => {
    async function call() {

      await fetch('http://20.244.56.144/train/auth', {
        method: "POST",
        body: JSON.stringify(d)
      }).then((data) => {
        return data.json()
      }).then((res) => {
        var { access_token } = res

        var header = { 'Authorization': `Bearer ${access_token}` }

        fetch('http://20.244.56.144/train/trains', {
          method: "GET",
          headers: header
        }).then((result) => {
          return result.json()
        }).then((trains) => {
          // console.log(y)
          setTrainData(trains)
        })
      })
    }
    call()
  }, [])



  return (
    <>
      <ul>
        {trainData.map(trainitem => {
          var { trainnm } = trainitem
          console.log(trainnm)
          return <li>{
            trainnm
          }</li>;
        })}
      </ul>
    </>
  );
}

export default App;