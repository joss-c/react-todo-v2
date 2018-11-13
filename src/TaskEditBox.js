import React from 'react'
import { Button } from 'reactstrap'

export const TaskEditBox = ({ task, index, markComplete, children }) => {
    return (
        <div className="edit-task" hidden={task.editPanelHidden}>
            <span hidden={!task.active}>
                {children}
            </span>
            <div className="undo">
                <Button 
                    hidden={task.active}
                    className="undo-button"
                    outline
                    color="secondary"
                    onClick={() => markComplete(index, true)}
                >
                    {`Undo "Mark Complete"`}
                </Button>
            </div>
        </div>
    )
}