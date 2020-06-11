import React, { useState, useCallback } from 'react';

const generalStyle = { padding: 10, margin: 10 };

const initialMaxNum = 20;

const getInitialNumbers = maxNum => {
  let initialNumbers = [];
  for (let i = 1; i <= maxNum; i++) {
    initialNumbers.push(i);
  }
  return initialNumbers;
};

const PickFromBasketWithoutReplacement = _ => {
  const [maxNum, setMaxNum] = useState(initialMaxNum);
  const [numbers, setNumbers] = useState(getInitialNumbers(maxNum));
  const [number, setNumber] = useState(null);

  const handleMaxNumChange = useCallback(
    event => {
      setMaxNum(event.target.value);
    },
    [setMaxNum]
  );

  const handleRestart = useCallback(
    _ => {
      setNumber(null);
      setNumbers(getInitialNumbers(maxNum));
    },
    [maxNum, setNumbers]
  );

  const handlePickFromRemainingClick = useCallback(
    _ => {
      const randIdx = Math.floor(Math.random() * numbers.length);
      setNumber(numbers[randIdx]);
      setNumbers(numbers.filter((_, idx) => idx !== randIdx));
    },
    [numbers, setNumber, setNumbers]
  );

  return (
    <div style={generalStyle}>
      <div style={generalStyle}>
        Max number:
        <input
          name='maxNum'
          type='text'
          onChange={handleMaxNumChange}
          value={maxNum}
          style={generalStyle}
          maxLength='2'
        />
      </div>
      <button style={generalStyle} onClick={handleRestart}>
        Restart
      </button>
      <div style={generalStyle}>{`Numbers remaining: ${numbers}`}</div>
      <button style={generalStyle} onClick={handlePickFromRemainingClick}>
        Pick from remaining
      </button>
      <div style={generalStyle}>{`Number picked: ${number}`}</div>
    </div>
  );
};

export default PickFromBasketWithoutReplacement;
