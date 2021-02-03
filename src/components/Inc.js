import React from "react";
import { useInc } from "../hooks/useInc";

const Inc = () => {
  const [value, { inc, dec }] = useInc({
    maxValue: 12,
    minValue: 0,
    initial: 12,
    step: 1
  });

  return (
    <div>
      <button onClick={dec}>-</button>
      {value}
      <button onClick={inc}>+</button>
    </div>
  );
};

export default Inc;
