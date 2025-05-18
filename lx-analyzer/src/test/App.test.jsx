import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

describe('App', () => {
  it('renders title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const titleElement = screen.getByText(/Lexi Logic/i)
    expect(titleElement).toBeInTheDocument()
  })
})
