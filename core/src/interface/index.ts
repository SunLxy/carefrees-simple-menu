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
