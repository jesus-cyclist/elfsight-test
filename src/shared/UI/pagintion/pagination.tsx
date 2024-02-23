import styled from 'styled-components'

const StyledPaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.2rem;
`

const StyledPageButton = styled.button<{ $active: boolean }>`
    border: none;
    background: ${({ $active }) =>
        $active ? 'var(--secondary-color)' : 'var(--content-color)'};
    transition: background 0.5s ease;
    padding: 0.5rem;

    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: ${({ $active }) =>
            $active ? 'var(--primary-color)' : 'var(--content-color)'};
        transition: background 0.5s ease;
    }
`

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange
}: PaginationProps) => {
    const getPageButtons = () => {
        const buttons = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <StyledPageButton
                        key={i}
                        $active={currentPage === i}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </StyledPageButton>
                )
            }
        } else {
            const halfMax = Math.floor(maxPagesToShow / 2)
            let startPage = currentPage - halfMax
            let endPage = currentPage + halfMax

            if (currentPage <= halfMax) {
                startPage = 1
                endPage = maxPagesToShow
            } else if (currentPage >= totalPages - halfMax) {
                startPage = totalPages - maxPagesToShow + 1
                endPage = totalPages
            }

            if (startPage > 1) {
                buttons.push(
                    <StyledPageButton
                        key={1}
                        $active={currentPage === 1}
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </StyledPageButton>
                )
                if (startPage > 2) {
                    buttons.push(<span key='startEllipsis'>...</span>)
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <StyledPageButton
                        key={i}
                        $active={currentPage === i}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </StyledPageButton>
                )
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    buttons.push(<span key='endEllipsis'>...</span>)
                }
                buttons.push(
                    <StyledPageButton
                        key={totalPages}
                        $active={currentPage === totalPages}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </StyledPageButton>
                )
            }
        }

        return buttons
    }

    return <StyledPaginationWrapper>{getPageButtons()}</StyledPaginationWrapper>
}
