import { render, screen } from "@testing-library/react"
import ThankYou from './Thankyou.component'
import { MemoryRouter } from "react-router-dom"

describe('Thank You Component', () => {
  
    it('Should render the thank you conclusion text correctly', () => {
        render(<MemoryRouter><ThankYou /></MemoryRouter>)

        expect(screen.getAllByRole("thank-you")).toMatchSnapshot()

        screen.debug()
    })
  })