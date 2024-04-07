import { useMemo, useCallback } from "react"
import { MenuItemType } from "./interface"
import { useMenuInstanceStore } from "./instance/hooks"
import { SubMenuItem } from "./sub-menu-item"
import { MenuItem } from "./menu-item"
import { LoopMenuItemBase } from "./style"

interface LoopMenuItemProps {
  items?: MenuItemType[]
  parentPath?: string[]
  level?: number
  prevClassName?: string
}

export const LoopMenuItem = (props: LoopMenuItemProps) => {
  const { items, parentPath = [], level = 0, prevClassName = '' } = props
  const { sortKey, valueKey } = useMenuInstanceStore()

  const getParentPath = useCallback((path: string) => {
    return (parentPath || []).concat([path])
  }, [parentPath])

  const child = useMemo(() => {
    const newChildData = sortKey ? (items || []).sort((a, b) => a?.[sortKey] - b?.[sortKey]) : items
    return newChildData.map((item, index) => {
      const parentPath = getParentPath(item[valueKey])
      const newLevel = level + 1
      if (item && Array.isArray(item.children) && item.children.length) {
        return <SubMenuItem key={index} item={item} level={newLevel} parentPath={parentPath} />
      }
      return <MenuItem key={index} item={item} level={newLevel} parentPath={parentPath} />
    })
  }, [items])

  return (<LoopMenuItemBase className={`carefrees-menus-list ${prevClassName}`}>
    {child}
  </LoopMenuItemBase>)
}