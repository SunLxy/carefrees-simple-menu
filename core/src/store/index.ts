import { useRef } from "react"

export class Store {
  /**选中值*/
  private value: string | undefined = undefined
  /**展开数据*/
  private expandData: Map<string, boolean> = new Map([])
  /**对应的方法调用*/
  private componentMap: Map<string, Function> = new Map([])

  init(value: string | undefined) {
    this.value = value
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
    const prevPath = this.value
    this.value = value
    /**把上一次的组件进行更新*/
    this.notice(prevPath)
    /**更新当前选中组件*/
    this.notice(value)
  }

  /**通知对应组件更新*/
  notice(path: string) {
    const fun = this.componentMap.get(path)
    if (typeof fun === "function") fun();
  }

  //=============================展开数据===================================

  toggles = (path: string) => {
    if (this.isExpandData(path)) {
      this.removeExpandData(path)
    } else {
      this.addExpandData(path)
    }
  }

  /**添加展开数据*/
  addExpandData = (path: string) => {
    this.expandData.set(path, true)
    this.notice(path)
  }
  /**移除展开数据*/
  removeExpandData = (path: string) => {
    this.expandData.delete(path)
    this.notice(path)
  }
  /**获取所有展开数据*/
  getExpandData = () => {
    return this.expandData.keys()
  }
  /**判断是否展开*/
  isExpandData = (path: string) => {
    return this.expandData.has(path)
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