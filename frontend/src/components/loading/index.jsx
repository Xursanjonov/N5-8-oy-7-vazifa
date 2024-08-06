import React, { memo } from 'react'
import './loading.css'

const Loading = () => {
    return (
        <div className="loading">
            <span class="loader"></span>
        </div>
    )
}

export default memo(Loading)