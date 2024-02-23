import styled, { keyframes } from 'styled-components'

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const LoaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #000000;
    opacity: 0.6;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

const StyledLoader = styled.div`
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid var(--primary-color);
    border-radius: 50%;
    border-top-color: var(--highlight-color);
    animation: ${spinAnimation} 1s ease-in-out infinite;
`

export const Loader = () => {
    return (
        <LoaderWrapper>
            <StyledLoader />
        </LoaderWrapper>
    )
}
