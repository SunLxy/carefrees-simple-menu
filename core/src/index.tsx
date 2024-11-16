import { Provider } from "./instance/hooks"
import { LoopMenuItem } from "./loop-menu-item"
import { MenuBase } from "./style"
import { useMenuInstance, MenuInstanceBase } from "./instance/instance"
import { MenuProps } from "./interface"
import { forwardRef } from "react"
export * from "./interface";
export * from "./instance/hooks";
export * from "./instance/instance";

const SimpleMenuBase = forwardRef((props: MenuProps, ref: React.ForwardedRef<MenuInstanceBase>) => {
  const { items = [], className = '', ...rest } = props

  return <Provider {...rest} items={items} ref={ref}>
    <MenuBase className={`carefrees-menu ${className}`}>
      <LoopMenuItem items={items} />
    </MenuBase>
  </Provider>
})

const SimpleMenu = SimpleMenuBase as typeof SimpleMenuBase & {
  useMenuStore: typeof useMenuInstance
  useMenuInstance: typeof useMenuInstance
}
SimpleMenu.useMenuStore = useMenuInstance
SimpleMenu.useMenuInstance = useMenuInstance

export default SimpleMenu