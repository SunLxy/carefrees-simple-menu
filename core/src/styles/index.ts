import styled, { css } from "styled-components"


export const MenuChildBase = styled.div`

`

export const SubMenuBodyBase = styled.div`

`

export const MenuItemBase = styled.div<{ $level: number }>`
  box-sizing: border-box;
  font-size: 14px;
  padding: 5px 5px;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  ${props => {
    const { $level } = props
    return css`
    box-sizing: border-box;
    padding-left: ${$level * 10}px;
  `
  }}
`

export const MenuItemTitleBase = styled.span<{ $active?: boolean }>`
  position: relative;
  transition:all 300ms;

  ${props => {
    const { $active } = props
    return css`
    ${$active && css`
      color:purple;
      position: relative;
      padding-left: 8px;
      &::before{
        position: absolute;
        content: " ";
        background-color: purple;
        top: 0;
        left: 0;
        bottom: 0;
        width: 3px;
      }
    `}
  `
  }}
`
export const SubMenuBase = styled.div`

`

export const MenuBase = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #efefef;
`
