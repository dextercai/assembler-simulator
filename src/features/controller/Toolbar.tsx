import { useState, useCallback, useMemo } from 'react'
import { MenuContext } from './Menu'
import FileMenu from './FileMenu'
import ViewMenu from './ViewMenu'
import ConfigurationMenu from './ConfigurationMenu'
import ControlButtons from './ControlButtons'
import HelpMenu from './HelpMenu'
import Anchor from '@/common/components/Anchor'
import { Github } from '@/common/components/icons'
import { useOutsideClick } from '@/common/hooks'

const ToolBar = (): JSX.Element => {
  const [openMenu, __setOpenMenu] = useState<HTMLDivElement | null>(null)

  const setOpenMenu = (element: HTMLDivElement | null): void => {
    __setOpenMenu(element)
    outsideClickRef(element)
  }

  const menuContextValue = useMemo(() => {
    return {
      currentOpen: openMenu,
      setCurrentOpen: setOpenMenu
    }
  }, [openMenu])

  const handleOutsideClick = useCallback(() => {
    setOpenMenu(null)
  }, [])

  const outsideClickRef = useOutsideClick(handleOutsideClick)

  return (
    <header className="border-y flex flex-row-reverse min-w-max bg-gray-100 h-8 w-full z-10 fixed items-center justify-between">
      <div className="flex space-x-2 py-1 px-2 items-center">
        <h1>Assembler Simulator</h1>
        <Anchor href="https://github.com/exuanbo/assembler-simulator">
          <Github width="1.125rem" />
        </Anchor>
      </div>
      <div className="divide-x border-r flex">
        <MenuContext.Provider value={menuContextValue}>
          <FileMenu />
          <ViewMenu />
          <ConfigurationMenu />
          <ControlButtons />
          <HelpMenu />
        </MenuContext.Provider>
      </div>
    </header>
  )
}

export default ToolBar
