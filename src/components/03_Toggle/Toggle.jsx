import React, { useState } from 'react'

const Toggle = () => {
    const [toggle, setToggle] = useState(false);
    const [bgColor, setBgColor] = useState('yellow');
  return (
    <div style={{background:bgColor, height:'100vh', width:'100vw', display:'flex', justifyContent:'center', alignItems:'center'}}>
        {toggle ? <button onClick={()=>{setToggle(!toggle), setBgColor('yellow')}}>ON</button> : <button onClick={()=>{setToggle(!toggle),setBgColor('black')}}>OFF</button>}
    </div>
  )
}

export default Toggle
