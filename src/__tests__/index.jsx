import React from 'react'
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'

function Counter() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  )
}

test('renders counter', async () => {
  render(<Counter />)
  const count = screen.getByText('0')
  const button = screen.getByText(/click me/i)
  userEvent.click(button)
  expect(count).toHaveTextContent('1')
})
