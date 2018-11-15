import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { Row, Col, Button } from 'reactstrap'

export const TaskText = ({ settings, task, index, toggleEditItem, handleTextChange, editText, children }) => {
    return (
        <div
            className={(task.active) ? 'task' : 'task animate-background'}
            onClick={() => toggleEditItem(index)}
            style={{
                backgroundColor: (!task.active) ?
                    '#e5e5e5' :
                    (task.priority === 3) ?
                        settings.style.colorLow :
                        (task.priority === 2) ?
                            settings.style.colorMedium :
                            settings.style.colorHigh
            }}
        >
            <span 
                style={{
                textDecorationLine: (task.active) ?
                    'none' :
                    'line-through'
                }}
            >
                {(task.editPanelHidden) ?
                    <Row>
                        <Col>
                            {task.text}
                            <span className='instance'>
                                {(task.instance > 1) ?
                                    ` (${task.instance})` :
                                    null}
                            </span>
                        </Col>
                    </Row> :
                    <span>
                        <Row className='edit-text no-gutters'>
                            <Col xs='10'>
                                <TextareaAutosize
                                    className='edit-text-element'
                                    onChange={(event) => handleTextChange(event)}
                                    onClick={(event) => event.stopPropagation()}
                                    defaultValue={task.text}
                                />
                            </Col>
                            <Col xs='2'>
                                <Button
                                    className='edit-text-button'
                                    color='secondary'
                                    size='sm'
                                    onClick={(event) => editText(event, index)}
                                >
                                    {"OK"}
                                </Button>
                            </Col>
                        </Row>
                    </span>}
            </span>
            {children}
        </div>
    )
}
