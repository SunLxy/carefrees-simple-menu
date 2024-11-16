import { MenuInstanceBase } from "../instance/instance"
/**每一项渲染*/
export interface MenuItemType {
  /**标题*/
  title?: React.ReactNode
  /**路径或者唯一值*/
  path?: string
  /**禁用*/
  disabled?: boolean
  /**子集数据*/
  children?: MenuItemType[]
  [x: string]: any
}

export interface CallBackType {
  onChange?: (value: string, valueItem: MenuItemType) => void
}

export interface ContextType {
  /**实例*/
  menuInstance: MenuInstanceBase;
  /**选中值*/
  value?: string
  /**
 * @default title
*/
  labelKey?: string
  /**
   * @default path
  */
  valueKey?: string
  sortKey?: string
  /**
   * 是否需要点击项展开,默认不需要(false)
   * @default false
  */
  isExpand?: boolean
}

export interface ProviderProps extends Omit<ContextType, 'menuInstance'> {
  /**实例*/
  menu?: MenuInstanceBase
  /**值更新*/
  onChange?: (value: string, valueItem: MenuItemType) => void
  children?: React.ReactNode
  items?: MenuItemType[]
}

export interface MenuProps extends Omit<ProviderProps, 'children'> {
  items?: MenuItemType[]
  className?: string
}