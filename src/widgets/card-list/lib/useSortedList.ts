import { TCharacter } from '@/shared'
import { useMemo } from 'react'
import type { TQueryParams } from '../card-list'

export const useSortedList = ({
    list,
    query
}: {
    list: Array<TCharacter>
    query: TQueryParams
}) => {
    const sortedList = useMemo(() => {
        return [...list].sort((a, b) => a[query].localeCompare(b[query]))
    }, [list, query])

    return sortedList
}
