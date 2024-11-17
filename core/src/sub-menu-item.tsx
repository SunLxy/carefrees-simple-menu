import { SubMenuItemBase, SubMenuItemBodyBase } from "./style"
import { MenuItemType } from "./interface"
import { useMenuInstanceStore, } from "./instance/hooks"
import { MenuItemInstanceBase } from "./instance/instance"
import { useEffect, useMemo, useState } from "react"
import { LoopMenuItem } from "./loop-menu-item"
import { MenuItem } from "./menu-item"
import { useRef } from "react"

interface SubMenuItemProps {
  parentPath: string[]
  level?: number
  item: MenuItemType
  prevClassName?: string
}

export const SubMenuItem = (props: SubMenuItemProps) => {
  const { item, parentPath, level = 0, prevClassName = '' } = props
  const { valueKey, menuInstance, isExpand: parentIsExpand, isHover = false } = useMenuInstanceStore()
  const path = item[valueKey]
  const [menuItemInstance] = useState(new MenuItemInstanceBase());
  menuItemInstance.level = level;
  menuItemInstance.isHover = isHover;

  useMemo(() => menuItemInstance.ctor(path, menuInstance, parentPath, item), [item, path, parentPath])

  menuInstance.setMaxLevel(level);

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

  return (<SubMenuItemBase
    ref={menuItemInstance.subMenuWarp}
    className={`carefrees-sub-menu-item ${prevClassName}`}
    onMouseMove={menuItemInstance.onMouseMove}
    onMouseLeave={menuItemInstance.onMouseLeave}
  >
    {titleItem}
    {item?.children && <SubMenuItemBodyBase
      $parentIsExpand={parentIsExpand && !isHover}
      className="carefrees-sub-menu-item-body"
      ref={menuItemInstance.subMenu}
      $isHover={isHover}
    >
      {body}
    </SubMenuItemBodyBase>}
  </SubMenuItemBase>)
}