import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createElement } from 'react'
import use, { Adapter } from './index'

interface DarkModeState {
  isDark: boolean
  toggle: () => void
}

const asDarkMode: Adapter<string, DarkModeState> = (value = 'light', set) => ({
  value,
  isDark: value === 'dark',
  toggle: () => {
    set(value === 'light' ? 'dark' : 'light')
  },
})

const TestComponent = ({ onClick }) => {
  const darkMode = use<string, DarkModeState>(asDarkMode)()

  const handleClick = (e) => {
    onClick(e)
    darkMode.toggle()
  }

  return createElement('div', null, [
    createElement('span', { 'data-testid': 'value' }, darkMode.value),
    createElement('span', { 'data-testid': 'isDark' }, String(darkMode.isDark)),
    createElement('button', { 'data-testid': 'toggle', onClick: handleClick }, 'toggle'),
  ])
}

describe('use()', () => {
  it('works as expected', () => {
    const onClick = jest.fn()
    const utils = render(createElement(TestComponent, { onClick }))
    const valueSpan = utils.getByTestId('value')
    const isDarkSpan = utils.getByTestId('isDark')
    const toggleButton = utils.getByTestId('toggle')
    expect(valueSpan).toHaveTextContent('light')
    expect(isDarkSpan).toHaveTextContent('false')


    userEvent.click(toggleButton)
    expect(onClick).toBeCalled()
    expect(valueSpan).toHaveTextContent('dark')
    expect(isDarkSpan).toHaveTextContent('true')
  })
})
