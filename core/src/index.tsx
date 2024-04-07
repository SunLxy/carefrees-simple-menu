import { Provider, ProviderProps } from "./instance/hooks"
import { LoopMenuItem } from "./loop-menu-item"
import { MenuBase } from "./style"
import { useMenuInstance } from "./instance/instance"
import { MenuItemType } from "./interface"

interface MenuProps extends Omit<ProviderProps, 'children'> {
  items?: MenuItemType[]
  className?: string
}

const SimpleMenu = (props: MenuProps) => {
  const { items = [], className = '', ...rest } = props

  return <Provider {...rest}>
    <MenuBase className={`carefrees-menu ${className}`}>
      <LoopMenuItem items={items} />
    </MenuBase>
  </Provider>
}

SimpleMenu.useMenuStore = useMenuInstance
SimpleMenu.useMenuInstance = useMenuInstance

export default SimpleMenu