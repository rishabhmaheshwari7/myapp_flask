import { render, screen } from "@testing-library/react"

import { MemoryRouter } from "react-router-dom"

import Nav from "./Nav.component"


describe('Nav Component', () => {

    it('Should render the Nav text correctly', () => {
        render(<MemoryRouter><Nav /></MemoryRouter>)

        expect(screen.getAllByTestId("img")).toMatchSnapshot()

    })
})