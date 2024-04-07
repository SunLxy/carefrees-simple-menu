import { createContext, useContext, useMemo, useState, useRef } from "react"
import { MenuInstanceBase, useMenuInstance, } from "./instance"
import { MenuItemType } from "../interface"

interface ContextType {
  /**实例*/
  menuInstance: MenuInstanceBase;
  /**选中值*/
  value?: string
  /**
 * @default title
*/
  labelKey?: string
  /**
   * @default path
  */
  valueKey?: string
  sortKey?: string
  /**
   * 是否需要点击项展开,默认不需要(false)
   * @default false
  */
  isExpand?: boolean
}

const Context = createContext<ContextType>({ menuInstance: new MenuInstanceBase(), labelKey: 'title', valueKey: 'path' });

export const useMenuInstanceStore = () => useContext(Context)

export interface ProviderProps extends Omit<ContextType, 'menuInstance'> {
  /**实例*/
  menu?: MenuInstanceBase
  /**值更新*/
  onChange?: (value: string, valueItem: MenuItemType) => void
  children?: React.ReactNode
}

export const Provider = (props: ProviderProps) => {
  const { menu, value, onChange, children, labelKey = 'title', valueKey = 'path', sortKey, isExpand } = props
  const [menuInstance] = useMenuInstance(menu)
  useMemo(() => { menuInstance.ctor(value) }, [value])
  menuInstance.setCallBack({ onChange })
  return <Context.Provider value={{ value, menuInstance, labelKey, valueKey, sortKey, isExpand }}>
    {children}
  </Context.Provider>
}

export const useUpdata = () => {
  const [_, _update] = useState({})
  const ref = useRef(_update)
  ref.current = _update;
  return ref
}
