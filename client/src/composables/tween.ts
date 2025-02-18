// auto increments panel number based on waitTime delay
import { ref, computed, watchEffect } from 'vue'
import { useClock } from '../stores/clock'

// add these
// https://9to5answer.com/ease-in-and-ease-out-animation-formula

export function useTween(
  fromValue:number=0,
  toValue:number=1,
  duration:number=2000,
  easing:number=0,
  loop:boolean=false,
  pingpong:boolean=false,
  callback?: () => void
):number {

  const clock = useClock()
  const startTime = clock.gameTime
  const currentValue = ref(0)
  let complete = false

  function percentage() {
    if (duration <=0) return 1
    if (complete) return 1

    const elapsed = (clock.gameTime - startTime)
    let percentage = (elapsed / duration)
    if (loop) {
      percentage = percentage % 1
    } else {
      percentage = Math.min(1, percentage)
      if (percentage === 1) {
        complete = true 
        if (callback && typeof callback === "function") {
          callback()
        }
      }
    }
    if (pingpong) {
      if (percentage > 0.5) {
        percentage = percentage
      } else { 
        percentage = (1 - percentage)
      }
    }

    return percentage
  }

  watchEffect(() => {
    const progress = (toValue - fromValue) * percentage()
    const value = fromValue + progress
    currentValue.value = (Math.round(value * 1000) / 1000)
  })

  return currentValue
}