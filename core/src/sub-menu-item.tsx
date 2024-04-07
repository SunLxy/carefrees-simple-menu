import { SubMenuItemBase, SubMenuItemBodyBase } from "./style"
import { MenuItemType } from "./interface"
import { useMenuInstanceStore, } from "./instance/hooks"
import { MenuItemInstanceBase } from "./instance/instance"
import { useEffect, useMemo, useState, useRef } from "react"
import { LoopMenuItem } from "./loop-menu-item"
import { MenuItem } from "./menu-item"

interface SubMenuItemProps {
  parentPath: string[]
  level?: number
  item: MenuItemType
  prevClassName?: string
}

export const SubMenuItem = (props: SubMenuItemProps) => {
  const { item, parentPath, level = 0, prevClassName = '' } = props
  const { valueKey, menuInstance, isExpand: parentIsExpand } = useMenuInstanceStore()
  const ref = useRef<HTMLDivElement>()
  const path = item[valueKey]
  const [menuItemInstance] = useState(new MenuItemInstanceBase())
  menuItemInstance.subMenu = ref
  useMemo(() => menuItemInstance.ctor(path, menuInstance, parentPath, item), [item, path, parentPath])

  useEffect(() => {
    const unMount = menuInstance.register(path, menuItemInstance, true)
    return () => unMount()
  }, [path])

  const titleItem = useMemo(() => {
    return <MenuItem isSubMenu item={item} level={level} parentPath={parentPath} />
  }, [item])

  const body = useMemo(() => {
    return <LoopMenuItem items={item.children} level={level} parentPath={parentPath} />
  }, [item.children])

  return (<SubMenuItemBase className={`carefrees-sub-menu-item ${prevClassName}`}>
    {titleItem}
    {item?.children && <SubMenuItemBodyBase
      $parentIsExpand={parentIsExpand}
      className="carefrees-sub-menu-item-body"
      ref={ref}
    >
      {body}
    </SubMenuItemBodyBase>}
  </SubMenuItemBase>)
}