export const SystemClock = (fixedTime = null) => ({
  now: () => fixedTime ?? new Date().toISOString()
})
