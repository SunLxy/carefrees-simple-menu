
/**
 * 组件显示/隐藏
 * 
*/
import { useEffect, useMemo, useRef } from "react";
import { useMenu } from "../hooks"

interface TogglesProps {
  height?: number
  path?: any
  isExpand?: boolean
  parentIsExpand?: boolean
}

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

const checkRun = (url: string) => {
  const result = mapToUrl.get(url)
  runTimeOut(url)
  return result
}

export const Toggles = (props?: TogglesProps) => {
  const { menuStore } = useMenu()
  const { path, } = props
  const ref = useRef<HTMLDivElement>(null)
  const refProps = useRef(props)
  refProps.current = props;


  const onObserver = (mutations: MutationRecord[], observer: MutationObserver) => {
    if (checkRun(path)) return;
    const [fistEle] = mutations || []
    if (fistEle) {
      const currentScrollHeight = ref.current.scrollHeight
      const offsetHeight = (fistEle.target as any).offsetHeight
      const clientHeight = (fistEle.target as any).clientHeight
      const scrollHeight = (fistEle.target as any).scrollHeight
      const firstHeight = (fistEle.target as any).style.height
      let height = Number(firstHeight)
      if (Number.isNaN(height)) {
        height = 0
      }
      if (refProps.current.isExpand) {
        // 展开
        if (ref.current === fistEle.target) {// 节点相等
          ref.current.style.height = `${height || ref.current.scrollHeight}px`
        } else if (clientHeight) { // 节点已经展开
          ref.current.style.height = `${currentScrollHeight - (height || scrollHeight)}px`
        } else { // 节点未展开
          ref.current.style.height = `${currentScrollHeight + (height || scrollHeight)}px`
        }
        console.log("展开数据处理===>", currentScrollHeight, offsetHeight, scrollHeight)
      } else {
        // 隐藏
        if (ref.current === fistEle.target) { // 节点相等
          ref.current.style.height = "0px"
        } else if (firstHeight) { // 其他的直接减值
          ref.current.style.height = `${currentScrollHeight - (height || scrollHeight)}px`
        }
        console.log("隐藏数据处理===>", firstHeight, currentScrollHeight, clientHeight, offsetHeight, scrollHeight)
      }
    }
  }

  useEffect(() => {
    if (!props.parentIsExpand) {
      return
    }
    let observer: MutationObserver;
    if (ref.current) {
      observer = new MutationObserver(onObserver);
      observer.observe(ref.current, {
        childList: true,
        attributes: true,
        subtree: true
      });
    }
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return ref
}