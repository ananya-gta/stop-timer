import React from "react";
import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef();
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
       if (dialog.current) {
         dialog.current.showModal();
       } else {
         console.error("dialog.current is undefined");
       }
       console.log(dialog.current)
    }, targetTime * 1000);

    setTimerStarted(true);
  }
  function handleStop() {
    clearTimeout(timer.current);
    setTimerStarted(false);
    setTimerExpired(false);
  }

  return (
    <>
      
        <ResultModal ref={dialog}  result={timerExpired ? "lost" : "won"}
 targetTime={targetTime} />
      
      <section className="challenge">
        <h2>{title}</h2>
        {timerExpired && <p>You lost!!</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>

        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop challenge" : "Start challenge"}
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerStarted ? "Timer is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
