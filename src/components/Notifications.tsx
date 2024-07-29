import React, { MouseEventHandler } from 'react'

const Notifications: React.FC<{name: string, onClickHandler: MouseEventHandler<HTMLDivElement>, read: boolean}> = ({
    name, onClickHandler, read
}) => {
    return <div className={`notifications-item${read ? ' read' : ''}`} title='click to unread' onClick={onClickHandler}>
        {name}
    </div>
}
export default Notifications