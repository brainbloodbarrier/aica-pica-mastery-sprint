describe('WS2 Core Features E2E Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage()
    cy.visit('/')
  })

  describe('Hearts System', () => {
    it('should display 5 hearts initially', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="hearts-display"]').should('contain', '5')
    })

    it('should deduct heart on wrong answer', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-wrong"]').first().click()
      cy.get('[data-testid="submit-answer"]').click()
      cy.get('[data-testid="hearts-display"]').should('contain', '4')
    })

    it('should show out of hearts modal when depleted', () => {
      cy.visit('/module/1')

      // Answer 5 questions wrong
      for (let i = 0; i < 5; i++) {
        cy.get('[data-testid="quiz-option-wrong"]').first().click()
        cy.get('[data-testid="submit-answer"]').click()
        if (i < 4) {
          cy.get('[data-testid="next-question"]').click()
        }
      }

      cy.get('[data-testid="out-of-hearts-modal"]').should('be.visible')
    })

    it('should show countdown timer for refill', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="hearts-refill-timer"]').should('be.visible')
    })
  })

  describe('Neurons Currency', () => {
    it('should earn neurons on correct answer', () => {
      cy.visit('/module/1')

      // Get initial neurons
      cy.get('[data-testid="neurons-display"]').then(($neurons) => {
        const initialNeurons = parseInt($neurons.text())

        // Answer correctly
        cy.get('[data-testid="quiz-option-correct"]').first().click()
        cy.get('[data-testid="submit-answer"]').click()

        // Check neurons increased
        cy.get('[data-testid="neurons-display"]').should(($newNeurons) => {
          expect(parseInt($newNeurons.text())).to.be.greaterThan(initialNeurons)
        })
      })
    })

    it('should show neurons earned popup', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-correct"]').first().click()
      cy.get('[data-testid="submit-answer"]').click()
      cy.get('[data-testid="neurons-earned-popup"]').should('be.visible')
    })

    it('should allow purchasing hearts with neurons', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="neurons-shop-button"]').click()
      cy.get('[data-testid="buy-heart-button"]').click()
      cy.get('[data-testid="purchase-success"]').should('be.visible')
    })
  })

  describe('Confidence Rating', () => {
    it('should show confidence rating after answer', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-0"]').click()
      cy.get('[data-testid="submit-answer"]').click()
      cy.get('[data-testid="confidence-rating"]').should('be.visible')
    })

    it('should allow selecting confidence level', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-0"]').click()
      cy.get('[data-testid="submit-answer"]').click()
      cy.get('[data-testid="confidence-level-3"]').click()
      cy.get('[data-testid="feedback"]').should('be.visible')
    })
  })

  describe('Daily Goals', () => {
    it('should display daily goals', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="daily-goals"]').should('be.visible')
    })

    it('should allow changing difficulty', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="goals-settings"]').click()
      cy.get('[data-testid="difficulty-medium"]').click()
      cy.get('[data-testid="goals-target"]').should('contain', '10')
    })

    it('should track progress', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-correct"]').first().click()
      cy.get('[data-testid="submit-answer"]').click()

      cy.visit('/dashboard')
      cy.get('[data-testid="goals-progress"]').should('not.contain', '0%')
    })

    it('should reward neurons on completion', () => {
      // Complete daily goals and check reward
      cy.visit('/dashboard')
      cy.get('[data-testid="claim-goal-reward"]').click()
      cy.get('[data-testid="neurons-display"]').should('be.visible')
    })
  })

  describe('Achievements', () => {
    it('should display achievements gallery', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="achievements-section"]').should('be.visible')
    })

    it('should unlock first achievement', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-correct"]').first().click()
      cy.get('[data-testid="submit-answer"]').click()
      cy.get('[data-testid="achievement-unlock-modal"]').should('be.visible')
    })

    it('should show achievement progress', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="achievement-progress"]').first().should('be.visible')
    })
  })

  describe('Streak System', () => {
    it('should display current streak', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="streak-counter"]').should('be.visible')
    })

    it('should show fire animation for active streak', () => {
      // Complete activity to maintain streak
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-correct"]').first().click()
      cy.get('[data-testid="submit-answer"]').click()

      cy.visit('/dashboard')
      cy.get('[data-testid="streak-fire"]').should('be.visible')
    })

    it('should allow buying streak freeze', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="streak-details"]').click()
      cy.get('[data-testid="buy-freeze-button"]').click()
      cy.get('[data-testid="freeze-purchased"]').should('be.visible')
    })
  })

  describe('Review Dashboard', () => {
    it('should display review dashboard', () => {
      cy.visit('/review')
      cy.get('[data-testid="review-dashboard"]').should('be.visible')
    })

    it('should show due questions', () => {
      cy.visit('/review')
      cy.get('[data-testid="due-questions-count"]').should('be.visible')
    })

    it('should display mastery levels', () => {
      cy.visit('/review')
      cy.get('[data-testid="module-mastery"]').should('have.length.at.least', 1)
    })

    it('should show calendar view', () => {
      cy.visit('/review')
      cy.get('[data-testid="review-calendar"]').should('be.visible')
      cy.get('[data-testid="calendar-day"]').should('have.length', 7)
    })
  })

  describe('Data Persistence', () => {
    it('should persist hearts state', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-wrong"]').first().click()
      cy.get('[data-testid="submit-answer"]').click()

      cy.reload()
      cy.get('[data-testid="hearts-display"]').should('contain', '4')
    })

    it('should persist neurons', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-correct"]').first().click()
      cy.get('[data-testid="submit-answer"]').click()

      cy.reload()
      cy.get('[data-testid="neurons-display"]').then(($neurons) => {
        expect(parseInt($neurons.text())).to.be.greaterThan(100)
      })
    })

    it('should persist daily goals progress', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-correct"]').first().click()
      cy.get('[data-testid="submit-answer"]').click()

      cy.reload()
      cy.visit('/dashboard')
      cy.get('[data-testid="goals-progress"]').should('not.contain', '0%')
    })
  })

  describe('Mobile Responsiveness', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    it('should display properly on mobile', () => {
      cy.visit('/dashboard')
      cy.get('[data-testid="mobile-menu"]').should('be.visible')
      cy.get('[data-testid="dashboard-content"]').should('be.visible')
    })

    it('should have touch-friendly buttons', () => {
      cy.visit('/module/1')
      cy.get('[data-testid="quiz-option-0"]').should('have.css', 'min-height', '44px')
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', () => {
      // Simulate localStorage being full
      cy.window().then((win) => {
        win.localStorage.setItem = () => {
          throw new Error('QuotaExceededError')
        }
      })

      cy.visit('/dashboard')
      cy.get('[data-testid="error-boundary"]').should('not.exist')
    })

    it('should handle network errors', () => {
      cy.intercept('GET', '/api/*', { forceNetworkError: true })
      cy.visit('/dashboard')
      cy.get('[data-testid="error-message"]').should('not.exist')
    })
  })
})
