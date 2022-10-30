import { render, screen,fireEvent, act } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ThemeProvider } from "@backyard/react"
import Header from "./Header.component"
import * as router from "react-router"

let noMockFun = null;
let navigate = null;

beforeEach(() => {
    navigate = jest.fn();
    noMockFun = jest.fn();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('to check navigation button', () => {
    it('when navigate btn is clicked', async () => {
        await act(() => {
            render(<MemoryRouter><ThemeProvider><Header /></ThemeProvider></MemoryRouter>)
        })
        
        fireEvent.click(screen.getByTestId('a1'));
    
        expect(navigate).toHaveBeenCalledTimes(1);
    })
})


describe('Header Component', () => {

    it('Should render the header text correctly', () => {
        render(<MemoryRouter><Header /></MemoryRouter>)

        expect(screen.getByTestId("header")).toBeVisible()
        
    })
})