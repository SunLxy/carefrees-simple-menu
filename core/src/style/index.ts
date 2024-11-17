import styled, { css } from "styled-components"
import { ReactComponent as RightSvg } from "./right.svg"

// ================================menu-item====================================

export const MenuItemBase = styled.div<{ $level: number, $isHover?: boolean, $size?: "small" | 'middle' | "large" }>`
  box-sizing: border-box;
  font-size: 14px;
  padding: 5px 5px;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  height: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-direction: row;
  ${props => {
    if (props.$size === 'small') {
      return css`
        height: 35px;
      `
    }
    if (props.$size === 'large') {
      return css`
        height: 55px;
      `
    }
    if (props.$size === 'middle') {
      return css`
        height: 45px;
      `
    }
    return ''
  }}

  ${props => {
    const { $level, $isHover } = props
    if ($isHover) {
      return ``
    }
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
  width: 100%;
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
  position: relative;
`

export const SubMenuItemBodyBase = styled.div<{ $parentIsExpand: boolean, $isHover?: boolean }>`
  transition: height 300ms;
  ${props => {
    if (props.$parentIsExpand && !props.$isHover) {
      return css`
        height: 0px;
        overflow: hidden;
      `
    }
    return ''
  }}
  ${props => {
    if (props.$isHover) {
      return css`
        border-top: 1px solid #efefef;
        position:absolute;
        display: none;
        min-width: 200px;
        top: 0px;
        bottom: 0px;
        right: 0px;
        width: 0px;
      `
    }
    return ""
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