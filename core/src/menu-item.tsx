import { MenuItemBase, MenuItemBodyBase, MenuItemTextBase, MenuItemIconBase, MenuItemIconRightSvgBase } from "./style"
import { MenuItemType } from "./interface"
import { useMenuInstanceStore, useUpdata } from "./instance/hooks"
import { MenuItemInstanceBase } from "./instance/instance"
import { useEffect, useMemo, useState, Fragment } from "react"

export interface MenuItemProps {
  item?: MenuItemType
  parentPath?: string[]
  level?: number
  prevClassName?: string
  isSubMenu?: boolean
}

export const MenuItem = (props: MenuItemProps) => {
  const { item, parentPath, prevClassName = '', level = 0, isSubMenu = false } = props
  const { labelKey, valueKey, menuInstance, isExpand: parentIsExpand } = useMenuInstanceStore()
  const newValueItem = menuInstance.getValue()
  const _updated = useUpdata()
  const path = item[valueKey]
  const label = item[labelKey]
  const isExpand = menuInstance.isExpandData(path)

  const [menuItemInstance] = useState(new MenuItemInstanceBase())
  useMemo(() => menuItemInstance.ctor(path, menuInstance, parentPath, item), [item, path, parentPath])
  menuItemInstance.updated = _updated;

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (isSubMenu) {
      menuInstance.toggles(path)
    } else {
      menuInstance.updateValue(path)
    }
  }

  useEffect(() => {
    const unMount = menuInstance.register(path, menuItemInstance, false)
    return () => unMount()
  }, [path])

  return (<MenuItemBase $level={level} onClick={onClick} className={`carefrees-menu-item ${prevClassName}`} >
    <MenuItemBodyBase className="carefrees-menu-item-body" $active={path && newValueItem.value && newValueItem.value === path}>
      {isSubMenu && parentIsExpand && <MenuItemIconBase className="carefrees-menu-item-icon-expand" $active={isExpand} ><MenuItemIconRightSvgBase /></MenuItemIconBase> || <Fragment />}
      <MenuItemTextBase className="carefrees-menu-item-title" >{label}</MenuItemTextBase>
    </MenuItemBodyBase>
  </MenuItemBase>)
}