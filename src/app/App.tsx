import { Loader } from '@/shared'
import global from '@/shared/styles/global.css'
import reset from '@/shared/styles/minireset.css'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { AppRouter } from './app-router'

const MiniresetCss = createGlobalStyle`
  ${reset}
`

const GlobalRootCss = createGlobalStyle`
  ${global}
`

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100vh;
    padding: 0;
    margin: 0;
    font-family: consolas, sans-serif;
    font-size: 18px;
    line-height: 1.2;
    background: var(--primary-color);
    user-select: none;
  };

`

const theme = {
    colors: {},
    media: {
        tablet: '(min-width: 768px)'
    }
}

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalRootCss />
            <MiniresetCss />
            <GlobalStyles />
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
                    <AppRouter />
                </Suspense>
            </BrowserRouter>
        </ThemeProvider>
    )
}
