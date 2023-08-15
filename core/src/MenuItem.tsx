/*
 * @Description: 菜单的 每一项
 */
import { useMemo, Fragment } from "react"
import { MenuItemProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"
import { MenuItemBase, MenuItemTitleBase, MenuItemBodyBase, IconBase, RightSvgBase } from "./styles"
import { useMenu, useUpdata } from "./hooks"

export const MenuItem = (props: MenuItemProps & MenuItemChangeProps & MenuItemOtherProps) => {
  const { prevClassName = '', level = 0, isSubMenu } = props
  const _update = useUpdata()
  const { onChange, labelKey = "title", valueKey = "path", menuStore } = useMenu()
  const path = props[valueKey]
  const value = menuStore.getValue()
  const isExpand = menuStore.isExpandData(`${path}_sub`)
  /**注册数据更新*/
  useMemo(() => { menuStore.register(path, _update) }, [path])

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onChange(props)
  }

  return <MenuItemBase onClick={onClick} $level={level} className={`carefrees-menu-item ${prevClassName}`}>
    <MenuItemBodyBase $active={path && value && value === path}>
      {isSubMenu && <IconBase $active={isExpand} ><RightSvgBase /></IconBase> || <Fragment />}
      <MenuItemTitleBase className="carefrees-menu-item-title" >{props[labelKey]}</MenuItemTitleBase>
    </MenuItemBodyBase>
  </MenuItemBase>
}