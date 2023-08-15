import React from "react";

import type { Store } from "./store"

export interface ReducerStoreType {
  value?: string
  menuStore?: Store
}

export interface MenuItemChangeProps {
  /**当前所在层级*/
  level?: number
  /**父级路径*/
  parentPath?: string[]
}

export interface MenuItemOtherProps {
  prevClassName?: string
  isSubMenu?: boolean
}

/**每一项渲染*/
export interface MenuItemProps {
  /**标题*/
  title?: React.ReactNode
  /**路径或者唯一值*/
  path?: string
  /**禁用*/
  disabled?: boolean
  /**子集数据*/
  children?: MenuItemProps[]
  [x: string]: any
}

/**每一项渲染*/
export interface MenuChildProps extends MenuItemChangeProps {
  /**子集数据*/
  children?: MenuItemProps[]
}

/**如果是父子集渲染*/
export interface SubMenuProps extends MenuItemProps {

}

/**菜单*/
export interface MenuProps {
  /**选中哪一项的数据*/
  onChange?: (item: MenuItemProps & MenuItemChangeProps) => void
  /**
   * 是否需要点击项展开,默认不需要(false)
   * @default false
  */
  isExpand?: boolean
  /**菜单渲染数据*/
  items?: MenuItemProps[]
  /**初始选中项*/
  initialValue?: string
  /**
   * 默认选中项，
   * 如果存在 value 值，则默认值不生效
  */
  defaultValue?: string
  /** 组件className*/
  className?: string
  /**
   * 标题取值字段
   * @default title
  */
  labelKey?: string
  /**
   * 唯一值取值字段
   * @default path
  */
  valueKey?: string
  menu?: Store
}

export interface MenuProvider extends Omit<MenuProps, "items" | "className"> {
  children?: React.ReactNode
}
