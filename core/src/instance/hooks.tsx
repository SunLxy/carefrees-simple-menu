import { createContext, useContext, useMemo, useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react"
import { MenuInstanceBase, useMenuInstance, } from "./instance"
import { ContextType, ProviderProps } from "../interface"

const Context = createContext<ContextType>({ menuInstance: new MenuInstanceBase(), labelKey: 'title', valueKey: 'path' });

export const useMenuInstanceStore = () => useContext(Context)

export const Provider = forwardRef((props: ProviderProps, ref: React.ForwardedRef<MenuInstanceBase>) => {
  const { items, menu, value, onChange, children, labelKey = 'title', valueKey = 'path', sortKey, isExpand } = props
  const [menuInstance] = useMenuInstance(menu)
  useMemo(() => menuInstance.ctor(value), [value])
  menuInstance.setCallBack({ onChange })
  menuInstance.items = items;
  useImperativeHandle(ref, () => menuInstance);

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
