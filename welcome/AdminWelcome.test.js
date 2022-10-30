import { render, screen } from "@testing-library/react"
import AdminWelcome from './AdminWelcome.component'
import { MemoryRouter } from "react-router-dom"
describe('Welcome Admin Component', () => {

    it('Should render the admin welcome text correctly', () => {
        render(<MemoryRouter><AdminWelcome /></MemoryRouter>)
        expect(screen.getAllByRole("welcome")).toMatchSnapshot()
        screen.debug()
    })
})