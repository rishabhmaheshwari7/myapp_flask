import { render, screen } from "@testing-library/react"
import MockAdapter from 'axios-mock-adapter'
import axios from "axios";
import { MemoryRouter } from "react-router-dom"
import AdminDash from "./AdminDash"
import { ThemeProvider } from "@backyard/react";
import { Provider } from "react-redux";
import userstore from "../../configurations/reduxFile";
import Nav from "../ui/nav/Nav.component";

jest.mock('../ui/nav/Nav.component')

let mockAxios;
mockAxios = new MockAdapter(axios);

describe('Admin dashboard Component', () => { 
    it('Should render the admin dashboard correctly', () => {

        mockAxios
        .onGet("http://localhost:8080/api/test/user")
        .reply(200)

        Nav.mockImplementation(() => <div data-testid="output">Add questions</div>)
        render(
            <ThemeProvider>
            <Provider store={userstore}>
                <MemoryRouter>
                    <AdminDash/>
                </MemoryRouter>
            </Provider>
        </ThemeProvider>
        )

        expect(screen.getByTestId("output")).toHaveTextContent(/^Add questions$/) 

    })
  })
