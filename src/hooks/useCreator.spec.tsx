import { act, renderHook } from '@testing-library/react'
import * as React from 'react'

import useCreator from './useCreator'

describe('useCreator', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useCreator())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
