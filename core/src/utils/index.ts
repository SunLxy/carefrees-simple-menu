
const mapToUrl: Map<string, boolean> = new Map([])
const timerObject: Record<string, NodeJS.Timeout> = {}

const runTimeOut = (path: string) => {
  clearTimeout(timerObject[path])
  mapToUrl.set(path, true)
  timerObject[path] = setTimeout(() => {
    mapToUrl.delete(path)
    clearTimeout(timerObject[path])
    delete timerObject[path]
  }, 100)
}

/** 时间内 执行第一次，根据 数据进行判断 */
export const runFirstToPath = (path: string) => {
  const result = mapToUrl.get(path)
  runTimeOut(path)
  return result
}

let timer = false
let timerRef: NodeJS.Timeout;

/** 时间内 执行第一次 */
export const throttleTimer = (time = 300) => {
  let oldTimer = timer
  timer = true
  clearTimeout(timerRef)
  timerRef = setTimeout(() => {
    timer = false
    clearTimeout(timerRef)
  }, time)
  return oldTimer
}
