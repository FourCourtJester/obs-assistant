import { render } from '@testing-library/react'

import Credentials from './Credentials'

describe('Credentials', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Credentials />)
    expect(baseElement).toBeTruthy()
  })
})
