import React from 'react'
import { Button } from 'reactstrap'

export const TaskButtons = ({ task, index, markComplete, sortItems }) => {
    return (
        <div className='item-buttons'>
            <Button
                className='sort-button'
                size='sm'
                outline color='secondary'
                onClick={() => sortItems(index, true)}
            >
                {"↑"}
            </Button>
            <Button
                className='delete-item-button'
                size='sm'
                outline
                color={(task.active) ? 'success' : 'danger'}
                onClick={() => markComplete(index)}
            >
                {(task.active) ? "✓" : "✕"}
            </Button>
        </div>
    )
}

