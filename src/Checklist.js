import React, { Component } from 'react'
import { Row, Col, Button, Input, Form, FormGroup, Progress } from 'reactstrap'

export class Checklist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addButtonDisabled: true,
            currentText: ""
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
            complete: false
        }
        this.inputElement.current.value = ''
        this.props.addTask(task, index)
        this.setState({ addButtonDisabled: true })
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
                    animated={(percentageComplete == 100) ? false : true}
                    value={percentageComplete}
                    color={(percentageComplete == 100) ? 'success' : null}
                />
                <div className='margin-top-2'></div>
                {/* Checklist will show by default if list is not empty */}
                {(props.task.checklistHidden && props.task.checklist.length < 1)
                    ? null
                    :
                    <React.Fragment>
                        {props.task.checklist.map((task, index) =>
                            <Row className='no-gutters'>
                                <Col xs='10'>
                                    <div
                                        className='task'
                                        style={{
                                            backgroundColor: (task.complete)
                                                ? '#E5E5E577'
                                                : props.settings.style.colorLow + '77',
                                            padding: '2% 3% 3% 3%'
                                        }}
                                    >
                                        <span style={{ textDecorationLine: (task.complete) ? 'line-through' : 'none' }}>
                                            {task.text}
                                        </span>
                                    </div>
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
                                            style={{ height: 'calc(2.25rem + 2px)' }}
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