import React, { memo } from 'react'
import { useDeleteUserMutation } from '../../context/api/userApi'
import './delete-user.css'

const DeleteUser = ({ user, close }) => {
    const [removed, { data }] = useDeleteUserMutation()
    const handleDelete = () => {
        removed(user?._id)
        close(p => !p)
    }
    console.log(data)

    return (
        <div className='delete__user'>
            <h1>{`${user.fname} ${user.lname}`} bu foydalanuvchi malumotlarini o`chirmoqchimisiz ?</h1>
            <div className="delete__btns">
                <button onClick={() => close(p => !p)} className='edit__btn'>Yo`q</button>
                <button onClick={handleDelete} className='delete__btn'>Ha</button>
            </div>
        </div>
    )
}

export default memo(DeleteUser)