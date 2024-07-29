import React, { MouseEventHandler } from 'react'

const Notifications: React.FC<{name: string, onClickHandler: MouseEventHandler<HTMLDivElement>}> = ({
    name, onClickHandler
}) => {
    return <div className='notifications-item' title='click to unread' onClick={onClickHandler}>
        {name}
    </div>
}
export default Notifications