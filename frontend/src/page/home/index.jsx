import { memo, useEffect, useState } from 'react'
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UserCart from '../../components/user-cart'
import Loading from '../../components/loading';
import { useGetUsersQuery } from '../../context/api/userApi';
import './home.css'

const Home = () => {
    const [page, setPage] = useState(1)
    const { data, isFetching } = useGetUsersQuery({ limit: 10, skip: page - 1 })
    const [users, setUsers] = useState(data)
    
    const lengthPage = React.useMemo(() => (Math.ceil(users?.total / 10)))
    const handleChange = (_, value) => {
        console.log(value)
        setPage(value)
    }


    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [isFetching])
    useEffect(() => {
        window.scroll(0, 0)
    }, [isFetching])

    return (
        <section>
            <div className="wrapper">
                {
                    isFetching ? <Loading /> :
                        data?.payload?.map(user => (
                            <UserCart key={user?.id} user={user} />
                        ))
                }
            </div>
            <Stack className="home__stack" key={'stack'} spacing={2}>
                <Pagination key={'pagination'} count={lengthPage} page={page} onChange={handleChange} />
            </Stack>
        </section>
    )
}

export default memo(Home)