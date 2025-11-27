declare global {
  // Redis缓存相关的全局状态
  var __redisWarningShown: boolean | undefined
  var __cacheServiceWarningShown: boolean | undefined
}

export {}