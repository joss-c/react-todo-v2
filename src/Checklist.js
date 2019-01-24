import React, { Component } from 'react'
import { Row, Col, Button, Input, Form, FormGroup, Progress } from 'reactstrap'
import { hexToRGB } from './functions'
import TextareaAutosize from 'react-autosize-textarea'

export class Checklist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addButtonDisabled: true,
            currentTaskText: '',
        }
        this.inputElement = React.createRef()
    }

    inputChange = () => {
        const inputValue = this.inputElement.current.value
        // Disable button when inputValue is empty
        const buttonDisabled = inputValue.length < 1
        this.setState({
            currentText: this.inputElement.current.value,
            addButtonDisabled: buttonDisabled
        })
    }

    addChecklistTask = (event, index) => {
        event.preventDefault()
        const inputValue = this.inputElement.current.value
        const task = {
            text: inputValue,
            complete: false,
            editTask: false
        }
        this.inputElement.current.value = ''
        this.props.addTask(task, index)
        this.setState({ addButtonDisabled: true })
    }

    styleChecklistTask = (complete) => {
        const props = this.props
        // Get priority color of parent task
        const priorityColor = ['colorHigh', 'colorMedium', 'colorLow'][props.task.priority - 1]
        return {
            backgroundColor: (complete)
                ? '#E5E5E577'
                : hexToRGB(props.settings.style[priorityColor], 0.5),
            padding: '2% 3% 3% 3%'
        }
    }

    handleTextChange = (event) => {
        this.setState({ currentTaskText: event.target.value })
    }

    handleTaskOnClick = (checklistTaskIndex, taskText) => {
        this.props.editTask(this.props.index, checklistTaskIndex)
        this.setState({ currentTaskText: taskText })
    }

    render() {
        const props = this.props
        const { addButtonDisabled } = this.state
        const totalTasks = props.task.checklist.length
        // Count completed checklist tasks
        const tasksComplete = props.task.checklist.reduce((sum, task) => {
            return (task.complete) ? sum + 1 : sum
        }, 0)
        const percentageComplete = (100 / totalTasks) * tasksComplete
        return (
            <React.Fragment>
                <Progress
                    hidden={(totalTasks < 1) ? true : false}
                    className='margin-top-2'
                    striped
                    animated={(percentageComplete === 100) ? false : true}
                    value={percentageComplete}
                    color={(percentageComplete === 100) ? 'success' : null}
                />
                <div className='margin-top-2'></div>
                {/* Checklist will show by default if list is not empty */}
                {(props.task.checklistHidden && props.task.checklist.length < 1)
                    ? null
                    :
                    <React.Fragment>
                        {props.task.checklist.map((task, index) =>
                            <Row className='no-gutters'>
                                <Col xs='8'>
                                    <div
                                        className='task'
                                        style={this.styleChecklistTask(task.complete)}
                                        onClick={() => this.handleTaskOnClick(index, task.text)}
                                    >
                                        {(task.editTask)
                                            ?
                                            <Row className='no-gutters' style={{ paddingTop: '3px' }}>
                                                <Col xs='10'>
                                                    <TextareaAutosize
                                                        className='edit-text-element'
                                                        onChange={(event) => this.handleTextChange(event)}
                                                        onClick={(event) => event.stopPropagation()}
                                                        defaultValue={task.text}
                                                    />
                                                </Col>
                                                <Col xs='2'>
                                                    <Button
                                                        className='edit-text-button'
                                                        style={{
                                                            padding: '0px',
                                                            width: '100%',
                                                            minHeight: '30px'
                                                        }}
                                                        color='secondary'
                                                        size='sm'
                                                        onClick={(event) => props.editText(event, props.index, index, this.state.currentTaskText)}
                                                    >
                                                        {"OK"}
                                                    </Button>
                                                </Col>
                                            </Row>
                                            :
                                            <span style={{ textDecorationLine: (task.complete) ? 'line-through' : 'none' }}>
                                                {task.text}
                                            </span>
                                        }
                                    </div>
                                </Col>
                                <Col xs='2'>
                                    <Button
                                        className='checklist-button'
                                        size='sm'
                                        outline
                                        color='secondary'
                                        onClick={() => props.sortTask(props.index, index)}
                                    >
                                        {"↑"}
                                    </Button>
                                </Col>
                                <Col xs='2'>
                                    <Button
                                        className='checklist-button'
                                        size='sm'
                                        outline
                                        color={(task.complete) ? 'danger' : 'success'}
                                        onClick={() => props.deleteTask(props.index, index)}
                                    >
                                        {(task.complete) ? "✕" : "✓"}
                                    </Button>
                                </Col>
                            </Row>
                        )}
                        <Form onSubmit={(event) => this.addChecklistTask(event, props.index)}>
                            <FormGroup style={{ marginBottom: 0 }}>
                                <Row className='margin-top-2 no-gutters'>
                                    <Col xs='10'>
                                        <Input
                                            type='text'
                                            innerRef={this.inputElement}
                                            onChange={this.inputChange}
                                        >
                                        </Input>
                                    </Col>
                                    <Col xs='2'>
                                        <Button
                                            type='submit'
                                            className='checklist-button'
                                            size='sm'
                                            outline
                                            color='primary'
                                            disabled={addButtonDisabled}
                                            style={{ height: 'calc(2.25rem + 2px)', maxHeight: 'calc(2.25rem + 2px)' }}
                                        >
                                            {"Add"}
                                        </Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                        <Row>
                            <Col>
                                <Button
                                    onClick={props.hide}
                                    color='secondary'
                                    outline
                                    style={{ width: '100%', marginTop: '5px' }}
                                >
                                    {"Hide"}
                                </Button>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}