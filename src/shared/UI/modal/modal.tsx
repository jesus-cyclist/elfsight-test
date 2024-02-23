import { ReactNode, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StyledModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    animation: ${fadeIn} 0.3s ease-in-out;
`

const StyledModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.6;
`

const StyledModal = styled.div`
    display: block;
    width: fit-content;
    height: fit-content;
    background-color: var(--content-color);
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    z-index: 10;
`

type TModalProps = {
    children: ReactNode
    close: () => void
}

const modal = document.getElementById('modal')

export const Modal = (props: TModalProps) => {
    const { children, close } = props
    const modalRef = useRef<null | HTMLDivElement>(null)

    return createPortal(
        <StyledModalWrapper ref={modalRef}>
            <StyledModalOverlay onClick={close} />
            <StyledModal>{children}</StyledModal>
        </StyledModalWrapper>,
        modal
    )
}
