import React from 'react'
import { useEffect, useState } from 'react'

const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(()=>{
    document.title = `Count: ${counter}`
  },[counter]);
  
  return (
    <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
      <button onClick={()=>setCounter(counter + 1)}>+</button>
      <p>{counter}</p>
      <button onClick={()=>setCounter(counter - 1)}>-</button>
      <button onClick={()=>setCounter(0)}>Reset</button>
    </div>
  )
}

export default Counter;

/*
  Here are the **exact concepts involved in the “Counter with Side Effects” example**, explained **clearly and interview-ready** 👇

---

## 🔹 Core Concepts Present in This Example

### 1️⃣ **Side Effects in React**

* **Side effect** = anything that affects something **outside the React render flow**
* Examples:

  * Updating `document.title`
  * API calls
  * Timers (`setTimeout`, `setInterval`)
* React components **should not do side effects during render**

👉 `document.title` update is a **side effect**

---

### 2️⃣ **useEffect Hook**

* `useEffect` is used to **handle side effects** in functional components
* It runs **after the component renders**

```js
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

---

### 3️⃣ **Effect Runs After Render**

* React flow:

  1. Component renders
  2. DOM updates
  3. `useEffect` executes

👉 This ensures **UI is updated first**, then side effects run

---

### 4️⃣ **Dependency Array `[count]`**

* Dependency array tells React **when to run the effect**
* `[count]` means:

  * Run effect **only when `count` changes**
  * Not on every render

| Dependency | Behavior                      |
| ---------- | ----------------------------- |
| No array   | Runs after **every render**   |
| `[]`       | Runs **only once** (on mount) |
| `[count]`  | Runs when **count changes**   |

---

### 5️⃣ **Avoiding Infinite Loops**

* If `useEffect` **updates state that it depends on**, it can cause an infinite loop

❌ Wrong:

```js
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

✔️ Correct:

```js
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

👉 Effect **reads** `count` but does **not update it**

---

### 6️⃣ **State–Effect Relationship**

* `count` is **state**
* `useEffect` **reacts to state changes**
* This creates **reactive behavior**

👉 “When state changes → effect runs”

---

## 🧠 One-Line Interview Explanation

> “This example demonstrates how `useEffect` handles side effects by running after render and re-executing only when its dependency (`count`) changes, while avoiding infinite re-render loops.”

---

If you want, I can now:

* Add **cleanup version**
* Convert this to a **real mini project**
* Give **common interview traps**
* Or show **wrong vs correct patterns**


*/ 