import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs';
import './Countdown.css'
import { getRemainingTimeUntilMsTimestamp } from './Utils/CountdownUtils';

const defaultRemainingTime = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
}

const Countdown = ({ countdownTimestampMs }) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const [isCountdownFinished, setIsCountdownFinished] = useState(false);

    let timeNow = dayjs().valueOf();

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs])

    useEffect(() => {
        if (timeNow > countdownTimestampMs) {
            setIsCountdownFinished(true);
        }
    }, [timeNow, countdownTimestampMs])

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return (
        isCountdownFinished ?
            <></> :
            <div className="countdown">
                <span>{remainingTime.days}</span>
                <span> D </span>
                <span>{remainingTime.hours}</span>
                <span> : </span>
                <span>{remainingTime.minutes}</span>
                <span> : </span>
                <span>{remainingTime.seconds}</span>
            </div>
    )
}

export default Countdown