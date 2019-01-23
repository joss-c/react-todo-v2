import React, { Component } from 'react'
import uuid from 'uuid'
import { Row, Col, Input, Button, Form, FormGroup } from 'reactstrap'

export class AddTask extends Component {
    constructor(props) {
        super(props)
        this.inputElement = React.createRef()
    }
    createItem = (event) => {
        const { 
            tasks,
            selectedPriority,
            addTask,
            convertPriority,
            convertDate,
            selectedDate,
            selectedTag
        } = this.props
        const inputElementValue = this.inputElement.current.value
        const itemInstances = tasks.reduce(function (total, task) {
            return total + (inputElementValue === task.text ? 1 : 0)
        }, 1)
        const newTask = {
            active: true,
            id: uuid().substring(0, 12),
            hidden: false,
            text: inputElementValue,
            priority: convertPriority(selectedPriority),
            timeCreated: Date.now(),
            dateDue: convertDate(selectedDate, 'timestamp'),
            instance: itemInstances,
            editPanelHidden: true,
            settingsHidden: true,
            tag: (selectedTag === 'None') ? 'None' : selectedTag,
            checklist: []
        }
        addTask(newTask)
        this.inputElement.current.value = ""
        event.preventDefault()
    }
    render() {
        const { inputChange, buttonDisabled } = this.props
        return (
            <Form onSubmit={this.createItem}>
                <FormGroup>
                    <Row className='row-0 no-gutters'>
                        <Col className='padding-right' xs='9'>
                            <Input 
                                type='text'
                                className='input--add-task'
                                onChange={inputChange}
                                innerRef={this.inputElement}
                                placeholder='Enter Task'>
                            </Input>
                        </Col>
                        <Col xs='3'>
                            <Button
                                className='add-button'
                                outline color='primary'
                                disabled={buttonDisabled}
                                type='submit'
                            >
                                {"Add"}
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        )
    }
}