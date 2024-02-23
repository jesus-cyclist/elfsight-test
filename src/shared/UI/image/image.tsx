import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledImage = styled.img`
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
`

type TImageProps = {
    src: string
    fallback: string
    alt?: string
    height?: string
    width?: string
}

export const ImageUI = (props: TImageProps) => {
    const { src, fallback, alt, ...size } = props
    const [failed, setFailed] = useState(false)
    const [imageSrc, setImageSrc] = useState(fallback)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            setImageSrc(src)
        }
    }, [isLoading])

    const setFallback = () => {
        if (fallback) {
            setFailed(true)
            setIsLoading(false)
        }
    }

    const handleLoad = () => {
        setIsLoading(false)
    }

    if (failed) {
        return <StyledImage src={fallback} alt={alt} {...size} />
    } else {
        return (
            <StyledImage
                src={imageSrc}
                alt={alt}
                onError={setFallback}
                onLoad={handleLoad}
                {...size}
            />
        )
    }
}
