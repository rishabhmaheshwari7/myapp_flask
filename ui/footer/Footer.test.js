import { render, screen } from "@testing-library/react"

import { MemoryRouter } from "react-router-dom"
import Footer from "./Footer.component"

describe('Footer Component', () => {
  
    it('Should render the footer text correctly', () => {
        render(<MemoryRouter><Footer /></MemoryRouter>)

        expect(screen.getAllByRole("footer")).toMatchSnapshot()
    })
  })