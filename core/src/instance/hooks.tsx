import { createContext, useContext, useMemo, useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react"
import { MenuInstanceBase, useMenuInstance, } from "./instance"
import { ContextType, ProviderProps } from "../interface"

const Context = createContext<ContextType>({ menuInstance: new MenuInstanceBase(), labelKey: 'title', valueKey: 'path' });

export const useMenuInstanceStore = () => useContext(Context)

export const Provider = forwardRef((props: ProviderProps, ref: React.ForwardedRef<MenuInstanceBase>) => {
  const {
    items, menu, value, onChange, children, labelKey = 'title',
    valueKey = 'path', sortKey, isExpand, isHover = false, size = 'small'
  } = props
  const [menuInstance] = useMenuInstance(menu)
  useMemo(() => menuInstance.ctor(value), [value])
  menuInstance.setCallBack({ onChange })
  menuInstance.items = items;
  menuInstance.valueKey = valueKey;
  menuInstance.sortKey = sortKey;
  menuInstance.labelKey = labelKey;
  menuInstance.isHover = isHover;
  menuInstance.size = size;
  useImperativeHandle(ref, () => menuInstance);

  return <Context.Provider value={{ size, value, menuInstance, labelKey, valueKey, sortKey, isExpand, isHover }}>
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
