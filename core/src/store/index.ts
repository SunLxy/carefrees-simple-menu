import { useRef } from "react"

export class Store {
  /**选中值*/
  private value: string | undefined = undefined
  private prevPath: string | undefined

  /**对应的方法调用*/
  private componentMap: Map<string, Function> = new Map([])

  init(value: string | undefined) {
    this.value = value
    this.prevPath = value
  }

  /**把对应更新单个组件的方法进行存储*/
  register(path: string, fun: Function) {
    this.componentMap.set(path, fun)
  }

  /**获取值*/
  getValue() {
    return this.value
  }

  /**更新值*/
  updateValue(value: string | undefined) {
    this.value = value
    /**把上一次的组件进行更新*/
    this.notice(this.prevPath)
    /**更新当前选中组件*/
    this.notice(value)
    this.prevPath = value
  }

  /**通知对应组件更新*/
  notice(path: string) {
    const fun = this.componentMap.get(path)
    if (typeof fun === "function") fun();
  }
}

export const useMenuStore = (menu?: Store) => {
  const ref = useRef<Store>()
  if (!ref.current) {
    if (menu) {
      ref.current = menu
    } else {
      ref.current = new Store()
    }
  }
  return [ref.current]
}