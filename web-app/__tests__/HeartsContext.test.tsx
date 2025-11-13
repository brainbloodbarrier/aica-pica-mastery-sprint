import React from 'react'
import { render, act, waitFor } from '@testing-library/react'
import { HeartsProvider, useHearts } from '@/context/HeartsContext'

// Test component to access context
function TestComponent() {
  const { hearts, maxHearts, useHeart, refillHeart, timeUntilRefill } = useHearts()

  return (
    <div>
      <div data-testid="hearts">{hearts}</div>
      <div data-testid="max-hearts">{maxHearts}</div>
      <div data-testid="time-until-refill">{timeUntilRefill}</div>
      <button onClick={useHeart} data-testid="use-heart">Use Heart</button>
      <button onClick={refillHeart} data-testid="refill-heart">Refill Heart</button>
    </div>
  )
}

describe('HeartsContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('provides initial hearts state', () => {
    const { getByTestId } = render(
      <HeartsProvider>
        <TestComponent />
      </HeartsProvider>
    )

    expect(getByTestId('hearts').textContent).toBe('5')
    expect(getByTestId('max-hearts').textContent).toBe('5')
  })

  it('uses a heart when useHeart is called', () => {
    const { getByTestId } = render(
      <HeartsProvider>
        <TestComponent />
      </HeartsProvider>
    )

    const useButton = getByTestId('use-heart')

    act(() => {
      useButton.click()
    })

    expect(getByTestId('hearts').textContent).toBe('4')
  })

  it('does not go below 0 hearts', () => {
    const { getByTestId } = render(
      <HeartsProvider>
        <TestComponent />
      </HeartsProvider>
    )

    const useButton = getByTestId('use-heart')

    // Use all hearts
    for (let i = 0; i < 6; i++) {
      act(() => {
        useButton.click()
      })
    }

    expect(getByTestId('hearts').textContent).toBe('0')
  })

  it('refills a heart when refillHeart is called', () => {
    const { getByTestId } = render(
      <HeartsProvider>
        <TestComponent />
      </HeartsProvider>
    )

    const useButton = getByTestId('use-heart')
    const refillButton = getByTestId('refill-heart')

    // Use a heart
    act(() => {
      useButton.click()
    })

    expect(getByTestId('hearts').textContent).toBe('4')

    // Refill
    act(() => {
      refillButton.click()
    })

    expect(getByTestId('hearts').textContent).toBe('5')
  })

  it('persists hearts state in localStorage', async () => {
    const { getByTestId, unmount } = render(
      <HeartsProvider>
        <TestComponent />
      </HeartsProvider>
    )

    const useButton = getByTestId('use-heart')

    act(() => {
      useButton.click()
      useButton.click()
    })

    await waitFor(() => {
      const stored = localStorage.getItem('aica_pica_hearts')
      expect(stored).toBeTruthy()
      const parsed = JSON.parse(stored!)
      expect(parsed.currentHearts).toBe(3)
    })
  })

  it('loads hearts state from localStorage', () => {
    // Set up localStorage with previous state
    const previousState = {
      currentHearts: 3,
      maxHearts: 5,
      lastRefillTime: new Date().toISOString(),
      refillIntervalHours: 4,
      freezesAvailable: 0,
    }
    localStorage.setItem('aica_pica_hearts', JSON.stringify(previousState))

    const { getByTestId } = render(
      <HeartsProvider>
        <TestComponent />
      </HeartsProvider>
    )

    expect(getByTestId('hearts').textContent).toBe('3')
  })
})
