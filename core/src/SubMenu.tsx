import { useMemo } from "react"
import { SubMenuProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"
import { MenuItem } from "./MenuItem"
import { MenuChild } from "./MenuChild"
import { Toggles } from "./toggles"
import { SubMenuBase, SubMenuBodyBase } from "./styles"
import { useMenu, useUpdata } from "./hooks"

export const SubMenu = (props: SubMenuProps & MenuItemChangeProps & MenuItemOtherProps) => {
  const { children = [], level = 0, parentPath = [], prevClassName = '', ...rest } = props
  const { valueKey = "path", menuStore, isExpand: parentIsExpand } = useMenu()

  const path = props[valueKey]
  const isExpand = menuStore.isExpandData(`${path}_sub`)
  const _update = useUpdata()
  const ref = Toggles({ path: parentPath, isExpand, parentIsExpand })

  /**注册数据更新*/
  useMemo(() => {
    menuStore.register(`${path}_sub`, _update)
  }, [path])

  const titleItem = useMemo(() => {
    return <MenuItem {...rest} isSubMenu={true} level={level} parentPath={parentPath} />
  }, [rest])

  const body = useMemo(() => {
    return <MenuChild children={children} level={level} parentPath={parentPath} />
  }, [children])

  return <SubMenuBase className={`carefrees-sub-menu-item ${prevClassName}`} >
    {titleItem}
    <SubMenuBodyBase ref={ref} $isExpand={isExpand} $parentIsExpand={parentIsExpand} $height={ref?.current?.scrollHeight || 0} className="carefrees-sub-body-menu-item" >
      {body}
    </SubMenuBodyBase>
  </SubMenuBase>
}