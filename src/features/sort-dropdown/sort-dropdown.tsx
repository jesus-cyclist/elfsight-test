import { useClickOutside } from '@/shared'
import { useRef, useState } from 'react'
import styled from 'styled-components'

const StyledDropdownWrapper = styled.div`
    position: relative;
    width: 150px;
    height: fit-content;
    cursor: pointer;
`

const StyledChoosenValue = styled.div`
    position: relative;
    padding: 0.5rem;
    background: var(--secondary-color);
    border-radius: 10px;
    z-index: 2;
`

const StyledList = styled.ul<{ $isOpen: boolean }>`
    background: var(--secondary-color);
    position: absolute;
    top: calc(1rem * 1.2);
    left: 0;
    right: 0;
    padding-top: 1rem;
    transform: ${props => (props.$isOpen ? 'scaleY(1)' : 'scaleY(0)')};
    transition: transform 0.2s ease;
    transform-origin: top;
    z-index: 1;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
`

const StyledListItem = styled.li`
    padding: 0.5rem;

    background: var(--secondary-color);
    transition: background 0.4s ease;
    &:hover {
        background: var(--primary-color);
        transition: background 0.4s ease;
    }
`

type TSortDropdownProps = {
    options: Array<{ value: string; label: string }>
    cb: (value: string) => void
}

export const SortDropdown = (props: TSortDropdownProps) => {
    const { options, cb } = props
    const [selectedValue, setSelectedValue] = useState('Default')
    const [isOpen, setIsOpen] = useState(false)
    const listRef = useRef<null | HTMLDivElement>(null)

    useClickOutside({
        ref: listRef,
        cb: (e: Event) => {
            if (listRef.current.contains(e.target as Node)) {
                return
            }

            setIsOpen(false)
        }
    })

    return (
        <StyledDropdownWrapper ref={listRef}>
            <StyledChoosenValue onClick={() => setIsOpen(prev => !prev)}>
                {selectedValue}
            </StyledChoosenValue>
            <StyledList $isOpen={isOpen}>
                {options.map(item => (
                    <StyledListItem
                        key={item.label}
                        onClick={() => {
                            setSelectedValue(item.label)
                            cb(item.value)
                            setIsOpen(false)
                        }}
                    >
                        {item.label}
                    </StyledListItem>
                ))}
            </StyledList>
        </StyledDropdownWrapper>
    )
}
