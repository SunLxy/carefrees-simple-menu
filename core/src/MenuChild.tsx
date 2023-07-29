
import { useCallback } from "react"
import { MenuChildProps, MenuItemOtherProps } from "./interface"
import { SubMenu } from "./SubMenu"
import { MenuItem } from "./MenuItem"

export const MenuChild = (props: MenuChildProps & MenuItemOtherProps) => {
  const { children = [], level = 0, parentPath = [], prevClassName = '' } = props

  const getParentPath = useCallback((path: string) => {
    return (parentPath || []).concat([path])
  }, [parentPath])

  return <div className={`carefrees-menus ${prevClassName}`} >
    {children.map((item) => {
      const parentPath = getParentPath(item.path)
      const newLevel = level + 1
      if (item && Array.isArray(item.children) && item.children.length) {
        return <SubMenu {...item} level={newLevel} parentPath={parentPath} />
      }
      return <MenuItem {...item} level={newLevel} parentPath={parentPath} />
    })}
  </div>
}