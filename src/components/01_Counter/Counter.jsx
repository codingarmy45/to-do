import React, { useState } from 'react'

const Counter = () => {
    const [counter, setCounter] = useState(0)
  return (
    <div>
      <button onClick={()=>setCounter(counter+1)}>+</button>
      <h1>{counter}</h1>
      <button onClick={()=>setCounter(counter-1)}>-</button>
      <button onClick={()=>setCounter(0)}>Reset</button>
    </div>
  )
}

export default Counter
