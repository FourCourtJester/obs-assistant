import { render } from '@testing-library/react'

import Creator from './Editor'

describe('Creator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Creator />)
    expect(baseElement).toBeTruthy()
  })
})
