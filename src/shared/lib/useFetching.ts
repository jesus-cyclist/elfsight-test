import { useState } from 'react'

type TUseFetching = {
    cb: Function
}

type TUseFetchingResult = [Function, boolean, boolean, boolean]

export const useFetching = ({ cb }: TUseFetching): TUseFetchingResult => {
    const [isSuccessfull, setIsSuccessfull] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const fetching = async (...args: any) => {
        try {
            setIsLoading(true)
            await cb(...args)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
            setIsSuccessfull(true)
        }
    }

    return [fetching, isLoading, isError, isSuccessfull]
}
