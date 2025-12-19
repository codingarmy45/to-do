import React, { useState } from 'react'
import Dashboard from './Dashboard';
const Login = () => {
    const [isclick, setIsClick] = useState(false);
    const [data,setData] = useState({
        names:"",
        email:"",
        password:""
    });
    const changeHandler = (e) =>{
        setIsClick(false);
        const {name,value} = e.target;
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const submitHandler = (e) =>{
        setIsClick(true);
        e.preventDefault();
    }
  return (
    <div>
        
        {
            isclick ? <><Dashboard inputData={data}></Dashboard></> : <><input type="text" placeholder='Enter Name' name='names' onChange={changeHandler} value={data.names} />
        <input type="email" placeholder='Enter Email' name='email' onChange={changeHandler} value={data.email} />
        <input type="password" placeholder='Enter Passoword' name='password' onChange={changeHandler} value={data.password} />
        <button onClick={submitHandler}>Submit</button></> 
        }
    </div>
  )
}

export default Login