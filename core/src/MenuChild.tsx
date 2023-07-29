
import { useCallback } from "react"
import { MenuChildProps, MenuItemOtherProps } from "./interface"
import { SubMenu } from "./SubMenu"
import { MenuItem } from "./MenuItem"
import { MenuChildBase } from "./styles"

export const MenuChild = (props: MenuChildProps & MenuItemOtherProps) => {
  const { children = [], level = 0, parentPath = [], prevClassName = '' } = props

  const getParentPath = useCallback((path: string) => {
    return (parentPath || []).concat([path])
  }, [parentPath])

  return <MenuChildBase className={`carefrees-menus ${prevClassName}`} >
    {children.map((item, index) => {
      const parentPath = getParentPath(item.path)
      const newLevel = level + 1
      if (item && Array.isArray(item.children) && item.children.length) {
        return <SubMenu key={index} {...item} level={newLevel} parentPath={parentPath} />
      }
      return <MenuItem key={index} {...item} level={newLevel} parentPath={parentPath} />
    })}
  </MenuChildBase>
}