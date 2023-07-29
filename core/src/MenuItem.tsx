/*
 * @Description: 菜单的 每一项
 */
import { MenuItemProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"
import { MenuItemBase, MenuItemTitleBase } from "./styles"
import { useMenu } from "./hooks"

export const MenuItem = (props: MenuItemProps & MenuItemChangeProps & MenuItemOtherProps) => {
  const { title, prevClassName = '', level = 0, path } = props
  const { onChange, value } = useMenu()

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    onChange(props)
  }

  return <MenuItemBase onClick={onClick} $level={level} className={`carefrees-menu-item ${prevClassName}`}>
    <MenuItemTitleBase $active={path && value && value === path} className="carefrees-menu-item-title" >{title}</MenuItemTitleBase>
  </MenuItemBase>
}