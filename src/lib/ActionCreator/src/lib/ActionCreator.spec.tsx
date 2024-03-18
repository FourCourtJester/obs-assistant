import { render } from '@testing-library/react'

import ActionCreator from './ActionCreator'

describe('ActionCreator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ActionCreator />)
    expect(baseElement).toBeTruthy()
  })
})
