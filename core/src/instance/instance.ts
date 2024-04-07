import { useRef } from "react"
import { MenuItemType } from "./../interface"

export class MenuItemInstanceBase {
  /**当前路径*/
  path: string
  /**更新当前组件方法*/
  updated: React.MutableRefObject<Function>;
  /**父级路径*/
  parentPath: string[]
  /**当前对象*/
  item: MenuItemType
  /**节点*/
  subMenu?: React.MutableRefObject<HTMLDivElement>;
  /**节点实例*/
  menuInstance: MenuInstanceBase;
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
}

interface CallBackType {
  onChange?: (value: string, valueItem: MenuItemType) => void
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

  private callBack: CallBackType

  /**初始化*/
  ctor = (value?: string | undefined) => {
    this.value = value
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
    const prevPath = this.value
    this.value = value
    const item = this.menuComponentMap.get(value)
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
      const preHeight = menuItemInstance.updatedHeight();
      const isExpand = this.isExpandData(path)
      const parentPath = (menuItemInstance.parentPath || []).filter(it => it !== path).reverse()
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
    this.expandData.set(path, true)
    this.noticeExpand(path)
    this.notice(path)
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
