import {Button} from 'react-bootstrap';
import React, { MouseEventHandler } from 'react'
const ButtonComponent: React.FC<{
    title: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    className: string,
    isLoading: boolean
}> = ({title, onClick, className, isLoading}) => {
    return <Button disabled={isLoading} className={className} onClick={onClick}>
        {title}
    </Button>
}

export default ButtonComponent;