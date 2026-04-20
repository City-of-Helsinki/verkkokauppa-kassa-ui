import React, { FunctionComponent } from "react"
import { useTimer } from "react-timer-hook"
import { IconAlertCircle, IconClock } from "hds-react-next"

type TimerProps = {
  expiryTimestamp: string;
  text?: string;
}


export const Timer: FunctionComponent<TimerProps> = ({ expiryTimestamp, text, children }) => {

  const {
    seconds,
    minutes,
    hours,
    totalSeconds,
    days,
  } = useTimer({ expiryTimestamp: removeTimeZone(expiryTimestamp), onExpire: () => console.warn('onExpire called') })

  function removeTimeZone(expiryTimestamp: string | number | Date) {
    let date = new Date(expiryTimestamp)
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return date
  }

  function padWithZero(value: number) {
    return value.toString().padStart(2, '0')
  }

  function convertToSeconds(minutes: number) {
    return minutes * 60
  }

  let hasLessThanTwoMinutesLeft = totalSeconds < convertToSeconds(2)

  const hasHoursInTime = hours > 0
  const hasDaysInTime = days > 0

  return (
    totalSeconds > 0 ? <div className={ 'timer-container' }>
      <IconClock className={ 'mr-1' }/>
      <p className={ 'mr-1' }>{ text }</p>
      <span
        className={ hasLessThanTwoMinutesLeft ? 'timer-alert text-bold' : 'text-bold' }>
        { hasDaysInTime ? `${days}:` : '' }
        { hasHoursInTime ? `${padWithZero(hours)}:` : '' }
        { padWithZero(minutes) }:{ padWithZero(seconds) }
      </span>
      { hasLessThanTwoMinutesLeft && <IconAlertCircle className={ 'ml-1' }/> }
    </div> : <>
      { children }
    </>
  )
}