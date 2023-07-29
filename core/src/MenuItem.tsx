/*
 * @Description: 菜单的 每一项
 */

import { MenuItemProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"

export const MenuItem = (props: MenuItemProps & MenuItemChangeProps & MenuItemOtherProps) => {
  const { title, prevClassName = '' } = props

  return <div className={`carefrees-menu-item ${prevClassName}`} ><span>{title}</span></div>
}