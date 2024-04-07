import { createContext, useContext, useMemo, useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react"
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

export const Provider = forwardRef((props: ProviderProps, ref: React.ForwardedRef<MenuInstanceBase>) => {
  const { menu, value, onChange, children, labelKey = 'title', valueKey = 'path', sortKey, isExpand } = props
  const [menuInstance] = useMenuInstance(menu)
  useMemo(() => menuInstance.ctor(value), [value])
  menuInstance.setCallBack({ onChange })
  useImperativeHandle(ref, () => menuInstance)

  return <Context.Provider value={{ value, menuInstance, labelKey, valueKey, sortKey, isExpand }}>
    {children}
  </Context.Provider>
})

export const useUpdata = () => {
  const [_, _update] = useState({})
  const isMount = useRef(false)
  const ref = useRef(_update)
  ref.current = () => {
    if (isMount.current)
      _update({})
  };
  useEffect(() => {
    isMount.current = true
    return () => {
      isMount.current = false
    }
  }, [])

  return ref
}
