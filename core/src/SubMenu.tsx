import { SubMenuProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"
import { MenuItem } from "./MenuItem"
import { MenuChild } from "./MenuChild"

export const SubMenu = (props: SubMenuProps & MenuItemChangeProps & MenuItemOtherProps) => {
  const { children = [], level = 0, parentPath = [], prevClassName = '', ...rest } = props

  return <div className={`carefrees-sub-menu-item ${prevClassName}`} >
    <MenuItem {...rest} level={level} parentPath={parentPath} />
    <div className="carefrees-sub-body-menu-item" >
      <MenuChild children={children} level={level} parentPath={parentPath} />
    </div>
  </div>
}