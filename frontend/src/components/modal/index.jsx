import React, { Fragment, memo } from 'react'

const Modal = ({ close, children }) => {

    return (
        <Fragment>
            <div onClick={() => close(null)} className="overlay"></div>
            <div className="modal"> {children} </div>
        </Fragment>
    )
}

export default memo(Modal)