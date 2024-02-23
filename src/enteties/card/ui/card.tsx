import styled, { keyframes } from 'styled-components'
import { TCharacter } from '@/shared'
import Planet from '@/shared/assets/svg/planet.svg'
import Skull from '@/shared/assets/svg/skull.svg'
import Heart from '@/shared/assets/svg/heart.svg'
import { ImageUI } from '@/shared/UI/image'
import Fallback from '@/shared/assets/image/fallback.gif'
import { NavLink, useLocation } from 'react-router-dom'
import { ClientRoutes } from '@/shared'

const rotate = keyframes`
0% {
    transform: rotate3d(0);
}
100% {
    transform:  rotate3d(0, 1, 0, 360deg);
}
`

const StyledCard = styled.article`
    margin: 0 auto;
    max-width: 400px;
    height: 500px;
    width: 100%;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    grid-template-rows: 70% 1fr;
    grid-template-columns: auto;
    background: rgb(60, 62, 68);
    box-shadow: none;
    transform: scale(1);
    transition:
        box-shadow 0.5s ease,
        transform 0.5s ease;

    &:hover {
        transform: scale(1.005);
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        transition:
            box-shadow 0.5s ease,
            transform 0.5s ease;
    }

    @media ${props => props.theme.media.tablet} {
        max-width: 1000px;
        height: 300px;
        grid-template-columns: minmax(170px, 30%) 1fr;
        grid-template-rows: auto;
    }
`

const StyledDescription = styled.div`
    height: 100%;
    min-height: 100%;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const StyledTitle = styled(NavLink)`
    font-size: 1rem;
    color: var(--link-color);
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
`

const StyledInfo = styled.div`
    display: grid;
    grid-template-columns: 20px 1fr;
    grid-column-gap: 0.5rem;
    justify-content: center;
    align-content: center;
    font-size: 0.8rem;
`

const StyledIcon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    animation: ${rotate} 1s infinite linear;
`

const StyledInfoText = styled.span`
    font-size: 1rem;
    color: var(--accent-color);
`

type TCardProps = {
    data: TCharacter
}

export const Card = (props: TCardProps) => {
    const { data } = props
    const location = useLocation()
    return (
        <StyledCard>
            <ImageUI
                src={data.image}
                alt={data.name}
                fallback={Fallback}
                height={'100%'}
            />
            <StyledDescription>
                <StyledTitle
                    to={`${ClientRoutes.CARD_INFO_PATH}${data.id}`}
                    state={{ card: location }}
                >
                    {data.name}
                </StyledTitle>

                <StyledInfo>
                    <StyledIcon>
                        <Planet
                            width={20}
                            height={20}
                            color={'var(--accent-color)'}
                        />
                    </StyledIcon>
                    <StyledInfoText>{data.location.name}</StyledInfoText>
                </StyledInfo>
                <StyledInfo>
                    <StyledIcon>
                        {data.status.toLowerCase() === 'alive' ? (
                            <Heart width={20} height={20} color='red' />
                        ) : (
                            <Skull width={20} height={20} />
                        )}
                    </StyledIcon>
                    <StyledInfoText>
                        {data.status} - {data.species}
                    </StyledInfoText>
                </StyledInfo>
            </StyledDescription>
        </StyledCard>
    )
}
