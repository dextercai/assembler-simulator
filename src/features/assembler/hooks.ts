import { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { setInput as setEditorInput } from '../editor/editorSlice'
import { assemble } from './core'
import { setState as setAssemblerState } from './assemblerSlice'
import { setData as setMemoryData } from '../memory/memorySlice'
import { AssemblerError } from '../../common/exceptions'

export const useAssembler = (input: string): void => {
  const dispatch = useAppDispatch()

  const handleInputChange = (): void => {
    dispatch(setEditorInput(input))
    try {
      const [addressToOpcodeMap, addressToStatementMap] = assemble(input)
      dispatch(setAssemblerState({ addressToStatementMap, error: null }))
      dispatch(setMemoryData(addressToOpcodeMap))
    } catch (err) {
      if (err instanceof AssemblerError) {
        dispatch(setAssemblerState({ addressToStatementMap: {}, error: { ...err } }))
      } else {
        throw err
      }
    }
  }

  useEffect(() => {
    const timeoutID = setTimeout(handleInputChange, 200)
    return () => {
      clearTimeout(timeoutID)
    }
  }, [input])
}