import { useState } from 'react';
import './App.css';

function App() {

  const [height,setHeight] = useState('');
  const [weight,setWeight] = useState('');
  const [bmival,setBmival] =  useState(null);
  const [bmistatus,setBmistatus] = useState('')
  const [error,setError] = useState(false)

  function calculateBMI (){
    const isvalidHeight = /^\d+$/.test(height);
    const isvalidWeight = /^\d+$/.test(weight);
    if(isvalidHeight && isvalidWeight){
      const heightInMeter =  height/100;
      const bmival = weight/(heightInMeter * heightInMeter);
      setBmival(bmival.toFixed(2));
      if(bmival<18.5){
        setBmistatus("Under Weight");
      }
      else if(bmival>18.5 && bmival<24.9){
        setBmistatus("Healthy Weight");
      }
      else if(bmival>25.0 && bmival<29.9){
        setBmistatus("Over Weight");
      }
      else{
        setBmistatus("Obese")
      }
      setError(false)
    }
    else{
      setBmival(null);
      setBmistatus('');
      setError(true);
    }
  }

  const clear = () => {
    setHeight("");
    setWeight("");
    setBmival(null);
    setBmistatus("");
  }

  return (
    <>
      <div className='bmi-container'>
        <div className='bmi-img'>
        </div>
        <div className='bmi-data'>
          <h1>BMI Calculator</h1>
          {error &&  <p className='error'>Please fill the data for height and weight in numeric</p>}
          <div className='input-group'>
            <label htmlFor='height'>Height in (cm):</label>
            <input id='height' value={height} onChange={(e)=>setHeight(e.target.value)}/>
          </div>
          <div className='input-group'>
            <label htmlFor='weight'>Weight in (kg):</label>
            <input id='weight' value={weight} onChange={(e)=>setWeight(e.target.value)}/>
          </div>
          <button onClick={calculateBMI}>Calculate BMI</button>
          <button className='clear' onClick={clear}>Clear</button>
          {bmival &&(
            <div className='result'>
            <p>Your BMI Value is: {bmival}</p>
            <p>BMI Status: {bmistatus}</p>
          </div>
          )}
        </div>
      </div>
    </>
   
  );
}

export default App;
