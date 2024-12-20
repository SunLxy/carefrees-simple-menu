import { useRef, createRef } from "react"
import { MenuItemType, CallBackType } from "./../interface"

export class MenuItemInstanceBase {
  /**当前路径*/
  path: string
  /**更新当前组件方法*/
  updated: React.MutableRefObject<Function>;
  /**层级*/
  level: number;
  /**父级路径*/
  parentPath: string[]
  /**当前对象*/
  item: MenuItemType
  /**节点*/
  subMenu?: React.MutableRefObject<HTMLDivElement> = createRef();
  /**节点*/
  subMenuWarp?: React.MutableRefObject<HTMLDivElement> = createRef();
  /**节点实例*/
  menuInstance: MenuInstanceBase;
  /**移入悬浮展示
   * @default false
  */
  isHover: boolean = false
  isShow: boolean = false

  /**更新父级节点高度*/
  updatedHeight = (preHeight: number = 0, childIsExpand?: boolean) => {
    const isExpand = this.menuInstance.isExpandData(this.path)
    let height = 0
    if (this.subMenu && this.subMenu.current) {
      height = this.subMenu.current.scrollHeight
      /**当前的是否展开*/
      if (isExpand) {
        let newHeight = this.subMenu.current.scrollHeight
        /**判断子集的是否展开还是隐藏*/
        if (childIsExpand) {
          newHeight += preHeight
        } else {
          newHeight -= preHeight
        }
        this.subMenu.current.style.height = `${newHeight}px`
      } else {
        this.subMenu.current.style.height = `0px`
      }
    }
    return height
  }

  ctor = (path: string, menuInstance: MenuInstanceBase, parentPath: string[], item: MenuItemType) => {
    this.parentPath = parentPath
    this.path = path
    this.menuInstance = menuInstance
    this.item = item
  }

  /**移入*/
  public onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.isHover && !this.isShow) {
      this.isShow = true
      this.subMenu.current.style.display = 'block'
      this.subMenu.current.style.left = `${this.subMenuWarp.current.clientWidth}px`;
    }
  }
  /**移除*/
  public onMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.isHover) {
      this.isShow = false
      this.subMenu.current.style.display = 'none'
      this.subMenu.current.style.left = `0px`;
    }
  }
}

export class MenuInstanceBase {
  /**菜单组件*/
  private menuComponentMap: Map<string, MenuItemInstanceBase> = new Map([])
  /**菜单组件*/
  private subMenuComponentMap: Map<string, MenuItemInstanceBase> = new Map([])
  /**状态*/
  private expandData: Map<string, boolean> = new Map([])
  /**选中值*/
  private value: string | undefined = undefined
  /**选中值对象*/
  private valueItem: any = undefined

  public valueKey: string = 'path'
  public sortKey?: string
  public labelKey?: string = 'title'
  /**移入悬浮展示
   * @default false
  */
  public isHover?: boolean = false
  /**大小*/
  public size?: "small" | 'middle' | "large" = 'small'
  /**全部折叠或全部展开状态*/
  private status: "none" | "expandLoading" | "removeLoading" = 'none'


  /**父级菜单嵌套层级*/
  public subMenuLevelMap = new Map([]);

  /**设置层级*/
  setMaxLevel = (level: number) => {
    this.subMenuLevelMap.set(level, true)
  }

  /**数据*/
  public items: MenuItemType[] = []

  private callBack: CallBackType

  /**初始化*/
  ctor = (value?: string | undefined) => {
    const preValue = this.value
    this.value = value
    if (preValue !== value) {
      /**把上一次的组件进行更新*/
      this.notice(preValue)
      /**更新当前选中组件*/
      this.notice(value)
    }
  }

  /**把对应更新单个组件的方法进行存储*/
  register(path: string, menuItem: MenuItemInstanceBase, isSubMenu: boolean = false) {
    if (isSubMenu) {
      this.subMenuComponentMap.set(path, menuItem)
    } else {
      this.menuComponentMap.set(path, menuItem)
    }
    if (path === this.value && !isSubMenu) {
      this.valueItem = menuItem.item
    }
    return () => {
      if (isSubMenu) {
        this.subMenuComponentMap.delete(path)
      } else {
        this.menuComponentMap.delete(path)
      }
    }
  }

  /**获取值*/
  getValue() {
    return {
      value: this.value,
      item: this.valueItem
    }
  }

  /**更新值*/
  updateValue(value: string | undefined) {
    /**值相等不用刷新*/
    if (this.value === value) {
      return
    }

    const prevPath = this.value
    this.value = value
    const item = this.menuComponentMap.get(value)
    this.valueItem = item?.item
    this.callBack.onChange?.(value, item?.item)
    /**把上一次的组件进行更新*/
    this.notice(prevPath)
    /**更新当前选中组件*/
    this.notice(value)
  }

  /**通知对应组件更新*/
  notice(path: string) {
    const item = this.menuComponentMap.get(path)
    if (item) {
      item.updated?.current?.({})
    }
  }

  //=============================展开数据===================================
  toggles = (path: string) => {
    if (this.isExpandData(path)) {
      this.removeExpandData(path)
    } else {
      this.addExpandData(path)
    }
  }

  /**通知展开隐藏*/
  noticeExpand = (path: string) => {
    const menuItemInstance = this.subMenuComponentMap.get(path)
    if (menuItemInstance) {
      /**更新当前的组件高度，并返回当前组件高度*/
      const preHeight = menuItemInstance.updatedHeight();
      /**判断展开还是隐藏*/
      const isExpand = this.isExpandData(path)
      /**获取父级数据*/
      const parentPath = (menuItemInstance.parentPath || []).filter(it => it !== path).reverse()
      /**循环父级数据并，更新每一个父级高度值*/
      for (let index = 0; index < parentPath.length; index++) {
        const itemPath = parentPath[index];
        const parentInstance = this.subMenuComponentMap.get(itemPath)
        if (parentInstance)
          parentInstance.updatedHeight(preHeight, isExpand);
      }
    }
  }

  /**添加展开数据*/
  addExpandData = (path: string) => {
    const value = this.expandData.get(path)
    if (!value) {
      this.expandData.set(path, true)
      this.noticeExpand(path)
      this.notice(path)
    }
  }

  /**移除展开数据*/
  removeExpandData = (path: string) => {
    this.expandData.delete(path)
    this.noticeExpand(path)
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

  /**设置回调函数*/
  setCallBack = (callBack: CallBackType) => {
    this.callBack = callBack
  }

  /**销毁数据*/
  destroy = () => {
    this.menuComponentMap.clear();
    this.subMenuComponentMap.clear();
    this.expandData.clear();
    this.subMenuLevelMap.clear();
    this.value = undefined
    this.valueItem = undefined
  }

  /**延迟时间下一步执行*/
  public nextTime = (fun: Function, time: number = 200) => {
    const newTime = typeof time === 'number' ? time : 200
    return new Promise((resolve) => {
      fun()
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(true)
      }, newTime)
    })
  }

  /**展开所有*/
  expandAll = async (time: number = 200) => {
    if (this.status !== "none") {
      return
    }
    this.status = 'expandLoading'
    const levels = [...this.subMenuLevelMap.keys()].map((i) => Number(i)).sort()
    for (let index = 0; index < levels.length; index++) {
      const level = levels[index];
      const subMenus = [...this.subMenuComponentMap.values()].filter((it) => it.level === level)
      for (let c = 0; c < subMenus.length; c++) {
        const menuItem = subMenus[c];
        await this.nextTime(() => this.addExpandData(menuItem.path), time);
      }
    }
    this.status = 'none'
  }

  /**隐藏所有*/
  removeExpandAll = async (time: number = 200) => {
    if (this.status !== "none") {
      return
    }
    this.status = "removeLoading"
    const subMenus = [...this.subMenuComponentMap.values()]
    for (let c = 0; c < subMenus.length; c++) {
      const menuItem = subMenus[c];
      await this.nextTime(() => this.removeExpandData(menuItem.path), time);
    }
    this.status = "none"
  }

}

export const useMenuInstance = (menu?: MenuInstanceBase) => {
  const ref = useRef<MenuInstanceBase>()
  if (!ref.current) {
    if (menu) {
      ref.current = menu
    } else {
      ref.current = new MenuInstanceBase()
    }
  }
  return [ref.current]
}
