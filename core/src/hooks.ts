import { createContext, useContext, createElement, useReducer } from "react"
import { MenuProvider, MenuProps, ReducerStoreType, MenuItemProps, MenuItemChangeProps, MenuItemOtherProps } from "./interface"


const reducer = (prevState: Partial<ReducerStoreType>, nextState: Partial<ReducerStoreType>) => {
  return { ...prevState, ...nextState }
}

const Context = createContext<MenuProps & ReducerStoreType>({
  /**点击菜单触发*/
  onChange: () => void 0,
  /**是否需要点击项展开,默认不需要(false)*/
  isExpand: false,
  /**选中数据*/
  value: undefined,
})

export const Provider = (props: MenuProvider) => {
  const { children, value, onChange, isSubMenuSelect = false, ...rest } = props

  /**如果是展开项*/
  const [store, dispatch] = useReducer(reducer, { value })

  const onValuesChange = (item: MenuItemProps & MenuItemChangeProps & MenuItemOtherProps) => {
    /** 如果 onChange 是一个函数的时候 */
    if (typeof onChange === "function") {
      onChange(item)
    }
    /**点击父级的标题不做数据更新*/
    if (item?.isSubMenu && !isSubMenuSelect) {
      return
    }
    dispatch({ value: item.path })
  }

  return createElement(Context.Provider, {
    value: { ...rest, ...store, onChange: onValuesChange, },
    children
  })
}

export const useMenu = () => useContext(Context)