import { render } from '@testing-library/react'

import New from './New'

describe('New', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<New />)
    expect(baseElement).toBeTruthy()
  })
})
