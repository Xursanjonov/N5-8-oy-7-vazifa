import React, { memo, useState } from 'react'
import { useSignUpMutation } from '../../context/api/userApi'
import { useNavigate } from 'react-router-dom'
const empty = 'https://thumbs.dreamstime.com/b/laptop-computer-user-icon-vector-isolated-white-person-work-online-pictogram-business-worker-analyst-student-coder-customer-316853739.jpg'

const initailState = {
    fname: '',
    lname: '',
    username: '',
    password: '',
    age: 0,
    url: [],
    gender: '',
    email: '',
    budget: 0,
    role: 'user'
}

const CreateUser = () => {
    const navigate = useNavigate()
    const [radio, setRadio] = useState('Female')
    const [newUser, setNewUser] = useState(initailState)
    const [createUser, { data }] = useSignUpMutation()

    const handleCreateUser = (e) => {
        e.preventDefault()
        newUser.gender = radio
        createUser({ body: { ...newUser, gender: radio } })
        console.log(newUser)
        navigate('/')
    }
    console.log(data)

    return (
        <section className="create-user">
            <h2 className='modal__title'>Create User</h2>
            <form onSubmit={handleCreateUser} className="user__form">
                <input required value={newUser.fname} onChange={(e) => setNewUser(p => ({ ...p, fname: e.target.value }))}
                    type="text" placeholder="First Name" />
                <input value={newUser.lname} onChange={(e) => setNewUser(p => ({ ...p, lname: e.target.value }))}
                    type="text" placeholder="Last Name" />
                <input value={newUser.username} onChange={(e) => setNewUser(p => ({ ...p, username: e.target.value }))}
                    type="text" placeholder="Username" />
                <input value={newUser.password} onChange={(e) => setNewUser(p => ({ ...p, password: e.target.value }))}
                    type="password" placeholder="Password" />
                <input value={newUser.age} onChange={(e) => setNewUser(p => ({ ...p, age: e.target.value }))}
                    type="number" placeholder="Age" />
                <input value={newUser.url} onChange={(e) => setNewUser(p => ({ ...p, url: [e.target.value] }))}
                    type="text" placeholder="Image url" />
                <label className='radio__label'>
                    <input value="Male" onChange={(e) => setRadio(e.target.value)}
                        className='radio__input' type="radio" name="gender" />
                    <span>Male</span>
                    <input value="Female" onChange={(e) => setRadio(e.target.value)}
                        className='radio__input' type="radio" name="gender" />
                    <span>Female</span>
                </label>
                <input value={newUser.email} onChange={(e) => setNewUser(p => ({ ...p, email: e.target.value }))}
                    type="email" placeholder="Email" />
                <input value={newUser.budget} onChange={(e) => setNewUser(p => ({ ...p, budget: e.target.value }))}
                    type="number" placeholder="Budget" />
                <button type="submit" className="form__btn">Create</button>
            </form>
        </section>
    )
}

export default memo(CreateUser)