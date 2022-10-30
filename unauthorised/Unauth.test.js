import { render, screen } from "@testing-library/react"

import { MemoryRouter } from "react-router-dom"

import Unauth from "./Unauth.component"

describe('Unauthorization Component', () => {

    it('Should render the unauthorization error correctly', () => {
        render(<MemoryRouter><Unauth /></MemoryRouter>)

        expect(screen.getAllByRole("unauth")).toMatchSnapshot()
    })

})