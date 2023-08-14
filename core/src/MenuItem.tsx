/*
 * @Description: 菜单的 每一项
 */
import { useMemo } from "react"
import { MenuItemProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"
import { MenuItemBase, MenuItemTitleBase } from "./styles"
import { useMenu, useUpdata } from "./hooks"

export const MenuItem = (props: MenuItemProps & MenuItemChangeProps & MenuItemOtherProps) => {
  const { prevClassName = '', level = 0 } = props
  const _update = useUpdata()
  const { onChange, labelKey = "title", valueKey = "path", menuStore } = useMenu()
  const path = props[valueKey]
  const value = menuStore.getValue()
  /**注册数据更新*/
  useMemo(() => { menuStore.register(path, _update) }, [path])

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onChange(props)
  }

  return <MenuItemBase onClick={onClick} $level={level} className={`carefrees-menu-item ${prevClassName}`}>
    <MenuItemTitleBase $active={path && value && value === path} className="carefrees-menu-item-title" >{props[labelKey]}</MenuItemTitleBase>
  </MenuItemBase>
}