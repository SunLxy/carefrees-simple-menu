import styled, { css } from "styled-components"
import { ReactComponent as RightSvg } from "./right.svg"

// ================================menu-item====================================

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

export const MenuItemBodyBase = styled.div<{ $active: boolean }>`
  position: relative;
  box-sizing: border-box;
  transition: padding-left 300ms;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;

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

export const MenuItemIconBase = styled.div<{ $active: boolean }>`
  transition: transform 300ms;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: -8px;
  ${props => props.$active && css`
      transform: rotate(90deg);
  `}
`

export const MenuItemIconRightSvgBase = styled(RightSvg)`

`


export const MenuItemTextBase = styled.div`
  flex: 1;
`


// ================================sub-menu-item====================================


export const SubMenuItemBase = styled.div`

`

export const SubMenuItemBodyBase = styled.div<{ $parentIsExpand: boolean }>`
 transition: height 300ms;
  ${props => {
    if (props.$parentIsExpand) {
      return css`
        height: 0px;
        overflow: hidden;
      `
    }
    return ''
  }}
`

// ================================loop-menu-item====================================

export const LoopMenuItemBase = styled.div`

`


// ================================menu====================================

export const MenuBase = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #efefef;
`