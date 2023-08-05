import { useMemo } from "react"
import { Provider } from "./hooks"
import { MenuProps } from "./interface"
import { MenuChild } from "./MenuChild"
import { MenuBase } from "./styles"
import { useMenuStore } from "./store"
export type { MenuProps }

const SimpleMenu = (props: MenuProps) => {
  const { items = [], className = '', ...rest } = props

  const menuRender = useMemo(() => {
    return <MenuChild children={items} />
  }, [items])

  return <Provider {...rest}>
    <MenuBase className={`carefrees-menu ${className}`}>
      {menuRender}
    </MenuBase>
  </Provider>
}

SimpleMenu.useMenuStore = useMenuStore

export default SimpleMenu