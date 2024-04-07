import { Provider, ProviderProps } from "./instance/hooks"
import { LoopMenuItem } from "./loop-menu-item"
import { MenuBase } from "./style"
import { useMenuInstance, MenuInstanceBase } from "./instance/instance"
import { MenuItemType } from "./interface"
import { forwardRef } from "react"

interface MenuProps extends Omit<ProviderProps, 'children'> {
  items?: MenuItemType[]
  className?: string
}

const SimpleMenuBase = forwardRef((props: MenuProps, ref: React.ForwardedRef<MenuInstanceBase>) => {
  const { items = [], className = '', ...rest } = props

  return <Provider {...rest} ref={ref}>
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