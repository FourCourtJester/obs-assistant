import { act, renderHook } from '@testing-library/react'
import * as React from 'react'

import useChannel from './useChannel'

describe('useChannel', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useChannel())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
