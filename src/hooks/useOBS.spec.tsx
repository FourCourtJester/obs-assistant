import { act, renderHook } from '@testing-library/react'
import * as React from 'react'

import useOBS from './obs'

describe('useOBS', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useOBS())

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
})
