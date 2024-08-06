import React, { Fragment, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    return (
        <Fragment>
            <header className="header">
                <nav className="header__nav">
                    <Link className="header__logo" to="/">
                        <h3>Header</h3>
                    </Link>
                    <ul className="header__ul">
                        <Link to={'/'}>Home</Link>
                        <li onClick={() => navigate('/create')} className="add__user">Create User</li>
                        {/* <li onClick={() => navigate("/create-product")} className="add__user">Create Product</li> */}
                    </ul>
                </nav>
            </header>
        </Fragment>
    )
}

export default memo(Header)