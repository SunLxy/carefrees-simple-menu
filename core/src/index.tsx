
import { Provider } from "./hooks"
import { MenuProps } from "./interface"
import { MenuChild } from "./MenuChild"
import "./styles/index.css"


const Menu = (props: MenuProps) => {
  const { items = [], ...rest } = props
  return <Provider {...rest}>
    <div className="carefrees-menu">
      <MenuChild children={items} />
    </div>
  </Provider>
}
export default Menu