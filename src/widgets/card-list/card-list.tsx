import { Card } from '@/enteties'
import { SortDropdown } from '@/features'
import {
    ApiRoutes,
    Loader,
    Modal,
    Pagination,
    TCharacter,
    TResponseAllCharacters,
    useFetching
} from '@/shared'
import axios from 'axios'
import {
    CSSProperties,
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react'
import { FixedSizeList } from 'react-window'
import styled from 'styled-components'
import { useSortedList } from './lib'

const sortOptions = [
    {
        label: 'Name',
        value: 'name'
    },
    {
        label: 'Status',
        value: 'status'
    },
    {
        label: 'Species',
        value: 'species'
    },
    {
        label: 'Type',
        value: 'type'
    },
    {
        label: 'Gender',
        value: 'gender'
    }
]

const StyledWidgetButton = styled.button`
    border: 1px solid var(--highlight-color);
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.2;
    height: calc(2.2rem - 1px);
    border-radius: 10px;
    padding-block: 0;
    padding-inline: 0;
    padding: 0.5rem;
    background: var(--accent-color);
    transition: background 0.2s ease;

    &:active {
        background: var(--primary-colo);
        transition: background 0.2s ease;
    }
`

const StyledSearchPanelWrapper = styled.div`
    height: 2rem;
    display: flex;
    gap: 0.5rem;
    margin: 0 auto;
`

const StyledContainer = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: 3rem 1fr 2rem;
    grid-row-gap: 0.5rem;
`

const StyledSection = styled.section`
    height: 100%;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

const StyledCardWrapper = styled.div`
    height: fit-content;
    padding: 5px;
`
export type TQueryParams = 'name' | 'status' | 'species' | 'type' | 'gender'

type TParams = {
    url: string
    page: number
    limit: number
}

type TItemProps = {
    index: number
    style: CSSProperties
}

export const CardList = memo(() => {
    const [isWidgetOpen, setIsWidgetOpen] = useState(false)
    const [sortQuery, setSortQuery] = useState<TQueryParams>('name')
    const [list, setList] = useState<Array<TCharacter>>([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit] = useState(20)
    const [listParams, setListParams] = useState({
        height: 0,
        itemSize: 0,
        width: 0
    })
    const listRef = useRef<HTMLDivElement | null>(null)
    const sortedList = useSortedList({ list: list, query: sortQuery })
    const [fetching, isLoading] = useFetching({
        cb: async ({ url, page, limit }: TParams) => {
            await axios
                .get(url, {
                    params: {
                        page,
                        limit
                    }
                })
                .then(({ data }: { data: TResponseAllCharacters }) => {
                    setTotalPage(data.info.pages)
                    setList(data.results)
                })
        }
    })

    useEffect(() => {
        const widget = localStorage.getItem('widget')
        if (widget) {
            setIsWidgetOpen(true)
        }
    }, [])

    useEffect(() => {
        setListParams(prev => ({
            ...prev,
            itemSize: window.innerWidth > 768 ? 310 : 510
        }))
        fetching({ url: ApiRoutes.BASE_URL, page, limit })
    }, [page])

    const updateListParams = useCallback(() => {
        if (listRef.current) {
            const height = listRef.current.offsetHeight
            const width = listRef.current.offsetWidth
            setListParams(prev => ({ ...prev, height, width }))
        }
    }, [listRef])

    useLayoutEffect(updateListParams, [updateListParams])

    const isItemLoaded = (index: number) => Boolean(sortedList[index])

    const Item = memo(({ index, style }: TItemProps) => {
        let content
        if (!isItemLoaded(index)) {
            content = <h3>Loading</h3>
        } else {
            const element = sortedList[index]

            content = (
                <StyledCardWrapper>
                    <Card data={element} />
                </StyledCardWrapper>
            )
        }

        return <div style={style}>{content}</div>
    })

    Item.displayName = 'Item'

    return (
        <StyledContainer>
            <StyledSearchPanelWrapper>
                <SortDropdown
                    options={sortOptions}
                    cb={(value: TQueryParams) => setSortQuery(value)}
                />
                <StyledWidgetButton
                    onClick={() => {
                        setIsWidgetOpen(true)
                        localStorage.setItem('widget', 'true')
                    }}
                >
                    Show widget
                </StyledWidgetButton>
            </StyledSearchPanelWrapper>
            <StyledSection ref={listRef}>
                <FixedSizeList
                    height={listParams.height}
                    itemCount={limit}
                    itemSize={listParams.itemSize}
                    width={listParams.width}
                    style={{
                        overflowY: 'scroll',
                        scrollbarWidth: 'thin',
                        scrollbarColor:
                            'var(--primary-color) var(--secondary-color)'
                    }}
                >
                    {Item}
                </FixedSizeList>
            </StyledSection>
            <Pagination
                currentPage={page}
                totalPages={totalPage}
                onPageChange={(n: number) => setPage(n)}
            />
            {isLoading && <Loader />}
            {isWidgetOpen && (
                <Modal
                    close={() => {
                        setIsWidgetOpen(false)
                        localStorage.removeItem('widget')
                    }}
                >
                    <div
                        className='elfsight-app-b7833668-2ae7-41dd-9eff-73b47a20605e'
                        data-elfsight-app-lazy
                    ></div>
                </Modal>
            )}
        </StyledContainer>
    )
})

CardList.displayName = 'CardList'
