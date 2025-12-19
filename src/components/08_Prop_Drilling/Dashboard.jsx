import React, { useState } from "react";
import Profile from "./Profile";
const Dashboard = ({ inputData }) => {
  const [data, setData] = useState({
    age: "",
    salary: "",
  });
  const [finalData, setFinalData] = useState({})
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFinalData((prev)=>({
        ...prev,
        data,
        inputData
    }))
    console.log(finalData);
  };
  return (
    <div>
      <p>{inputData.names}</p>
      <p>{inputData.email}</p>
      <p>{inputData.password}</p>
      <input
        type="text"
        placeholder="Enter age"
        name="age"
        value={data.age}
        onChange={changeHandler}
      />
      <input
        type="text"
        placeholder="Enter salary"
        name="salary"
        value={data.salary}
        onChange={changeHandler}
      />
      <button onClick={submitHandler}>Submit</button>
      <Profile data={finalData} />
    </div>
  );
};

export default Dashboard;
