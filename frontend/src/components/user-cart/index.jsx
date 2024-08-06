import React, { Fragment, memo, useState } from 'react'
import DeleteUser from './DeleteUser'
import Modal from '../modal'
const empty = 'https://thumbs.dreamstime.com/b/laptop-computer-user-icon-vector-isolated-white-person-work-online-pictogram-business-worker-analyst-student-coder-customer-316853739.jpg'

const UserCart = ({ user }) => {
    const [show, setShow] = useState(false)

    return (
        <Fragment>
            <div className='user__cart'>
                <img className="user__img" src={user?.url[0] ?? empty} alt="" />
                <div className="user__info">
                    <li> <span>First Name:</span> <p>{user?.fname}</p></li>
                    <li> <span>Last Name:</span> <p>{user?.lname}</p></li>
                    <li> <span>Age:</span> {user?.age}</li>
                    <li> <span>Gander:</span> {user?.gander}</li>
                    <li> <span>Username:</span> {user?.username}</li>
                    <li> <span>Email:</span> {user?.email}</li>
                    <li> <span>Budget:</span> {user?.budget}$</li>
                </div>
                <div className="cart__btns">
                    <button className="edit__btn" >Edit</button>
                    <button onClick={() => setShow(!show)} className="delete__btn" >Delete</button>
                </div>
            </div>
            {
                show && <Modal close={() => setShow(!show)}><DeleteUser user={user} close={setShow} /></Modal>

            }
        </Fragment>
    )
}

export default memo(UserCart)