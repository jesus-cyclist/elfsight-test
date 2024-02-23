import { CardList } from '@/widgets'
import styled from 'styled-components'

const MainDiv = styled.main`
    width: 100%;
    height: 100%;
    padding: 2rem;
`

const MainPage = () => {
    return (
        <MainDiv>
            <CardList />
        </MainDiv>
    )
}

export default MainPage
