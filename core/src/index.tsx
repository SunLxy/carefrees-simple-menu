
import { Provider } from "./hooks"
import { MenuProps } from "./interface"
import { MenuChild } from "./MenuChild"
import { MenuBase } from "./styles"

const Menu = (props: MenuProps) => {
  const { items = [], className = '', ...rest } = props
  return <Provider {...rest}>
    <MenuBase className={`carefrees-menu ${className}`}>
      <MenuChild children={items} />
    </MenuBase>
  </Provider>
}
export default Menu