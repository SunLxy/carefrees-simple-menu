import { createContext, useContext, createElement, useMemo } from "react"
import { MenuProvider, MenuProps, ReducerStoreType, MenuItemProps, MenuItemChangeProps, MenuItemOtherProps } from "../interface"
import { useMenuStore } from "../store"
export * from "./update"

const Context = createContext<MenuProps & ReducerStoreType>({
  /**点击菜单触发*/
  onChange: () => void 0,
  /**是否需要点击项展开,默认不需要(false)*/
  isExpand: false,
  /**选中数据*/
  value: undefined,
  /**展开数据*/
  expandData: []
})

export const Provider = (props: MenuProvider) => {

  const { children, initialValue, onChange, valueKey = "path", menu, isExpand, ...rest } = props

  const [menuStore] = useMenuStore(menu)

  useMemo(() => {
    menuStore.init(initialValue)
  }, [])

  const onValuesChange = (item: MenuItemProps & MenuItemChangeProps & MenuItemOtherProps) => {
    const newValue = item[valueKey]
    /** 如果 onChange 是一个函数的时候 */
    if (typeof onChange === "function") {
      onChange(item)
    }

    /**点击父级的标题不做数据更新*/
    if (item?.isSubMenu) {
      if (isExpand)
        menuStore.toggles(`${newValue}_sub`)
      return
    }
    menuStore.updateValue(newValue)
  }

  return createElement(Context.Provider, {
    value: { ...rest, isExpand, valueKey, menuStore, onChange: onValuesChange, },
    children
  })
}

export const useMenu = () => useContext(Context)