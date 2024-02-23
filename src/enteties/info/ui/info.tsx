import { ApiRoutes, Loader, TCharacter, useFetching } from '@/shared'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const CardContainer = styled.div`
    width: 300px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Image = styled.img`
    width: 100%;
    height: auto;
    animation: ${fadeIn} 0.5s ease;
`

const Content = styled.div`
    padding: 20px;
`

const Name = styled.h2`
    margin: 0 0 10px;
    font-size: 20px;
    color: #333;
`

const Status = styled.p<{ $status: string }>`
    margin: 0 0 10px;
    font-size: 16px;
    color: ${({ $status }) => ($status === 'Alive' ? 'green' : 'red')};
`

const Species = styled.p`
    margin: 0 0 10px;
    font-size: 16px;
    color: #333;
`

const Location = styled.p`
    margin: 0;
    font-size: 16px;
    color: #333;
`

export const Info = () => {
    const [data, setData] = useState<null | TCharacter>(null)
    const params = useParams()
    const [fetching] = useFetching({
        cb: async ({ url }: { url: string }) => {
            await axios.get(url).then(({ data }: { data: TCharacter }) => {
                setData(data)
            })
        }
    })

    useEffect(() => {
        fetching({ url: `${ApiRoutes.BASE_URL}${params.id}` })
    }, [])

    return (
        <div>
            {data ? (
                <CardContainer>
                    <Image src={data.image} alt={data.name} />
                    <Content>
                        <Name>{data.name}</Name>
                        <Status $status={data.status}>{data.status}</Status>
                        <Species>{data.species}</Species>
                        <Location>Location: {data.location.name}</Location>
                    </Content>
                </CardContainer>
            ) : (
                <Loader />
            )}
        </div>
    )
}
