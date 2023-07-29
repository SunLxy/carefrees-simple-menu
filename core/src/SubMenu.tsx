import { SubMenuProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"
import { MenuItem } from "./MenuItem"
import { MenuChild } from "./MenuChild"
import { SubMenuBase, SubMenuBodyBase } from "./styles"

export const SubMenu = (props: SubMenuProps & MenuItemChangeProps & MenuItemOtherProps) => {
  const { children = [], level = 0, parentPath = [], prevClassName = '', ...rest } = props

  return <SubMenuBase className={`carefrees-sub-menu-item ${prevClassName}`} >
    <MenuItem {...rest} isSubMenu={true} level={level} parentPath={parentPath} />
    <SubMenuBodyBase className="carefrees-sub-body-menu-item" >
      <MenuChild children={children} level={level} parentPath={parentPath} />
    </SubMenuBodyBase>
  </SubMenuBase>
}