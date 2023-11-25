
import { useCallback, useMemo } from "react"
import { MenuChildProps, MenuItemOtherProps } from "./interface"
import { SubMenu } from "./SubMenu"
import { MenuItem } from "./MenuItem"
import { MenuChildBase } from "./styles"
import { useMenu } from "./hooks"

export const MenuChild = (props: MenuChildProps & MenuItemOtherProps) => {
  const { children = [], level = 0, parentPath = [], prevClassName = '' } = props
  const { valueKey = "path", sortKey } = useMenu()

  const getParentPath = useCallback((path: string) => {
    return (parentPath || []).concat([path])
  }, [parentPath])

  const child = useMemo(() => {
    const newChildData = sortKey ? (children || []).sort((a, b) => a?.[sortKey] - b?.[sortKey]) : children
    return newChildData.map((item, index) => {
      const parentPath = getParentPath(item[valueKey])
      const newLevel = level + 1
      if (item && Array.isArray(item.children) && item.children.length) {
        return <SubMenu key={index} {...item} level={newLevel} parentPath={parentPath} />
      }
      return <MenuItem key={index} {...item} level={newLevel} parentPath={parentPath} />
    })
  }, [children])
  return <MenuChildBase className={`carefrees-menus ${prevClassName}`} >
    {child}
  </MenuChildBase>
}