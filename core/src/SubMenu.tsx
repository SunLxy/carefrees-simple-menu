import { SubMenuProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"
import { MenuItem } from "./MenuItem"
import { MenuChild } from "./MenuChild"
import { SubMenuBase, SubMenuBodyBase } from "./styles"
import { useMemo } from "react"

export const SubMenu = (props: SubMenuProps & MenuItemChangeProps & MenuItemOtherProps) => {
  const { children = [], level = 0, parentPath = [], prevClassName = '', ...rest } = props

  const titleItem = useMemo(() => {
    return <MenuItem {...rest} isSubMenu={true} level={level} parentPath={parentPath} />
  }, [rest])

  const body = useMemo(() => {
    return <SubMenuBodyBase className="carefrees-sub-body-menu-item" >
      <MenuChild children={children} level={level} parentPath={parentPath} />
    </SubMenuBodyBase>
  }, [children])

  return <SubMenuBase className={`carefrees-sub-menu-item ${prevClassName}`} >
    {titleItem}
    {body}
  </SubMenuBase>
}