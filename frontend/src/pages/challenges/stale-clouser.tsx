import { useState, useEffect, useRef } from 'react';
function AutoCounter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(count);
  prevCountRef.current = count;
  useEffect(() => {
    const id = setInterval(() => {
      // setCount((c) => c + 1);
      //One fix: use the functional updater form setCount(c => c + 1)
      ///second fix: use a ref to store the previous count value and update it inside the effect
      setCount(prevCountRef.current + 1);
      console.log(count);///Always logs 0 because at the first of every render, count is zero. 
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg font-bold">Count: {count}</p>
    </div>
  );
}

export default AutoCounter;
////Use functional update when:The new state depends on the previous state.