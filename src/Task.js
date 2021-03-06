import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Row, Col, Button, Progress } from 'reactstrap'
import { TaskText } from './TaskText'
import { TaskDetails } from './TaskDetails'
import { TaskButtons } from './TaskButtons'
import { TaskEditBox } from './TaskEditBox'
import { Calendar } from './Calendar'
import { Priority } from './Priority'
import { Tags } from './Tags'
import { Checklist } from './Checklist'

export const Task = (props) => {

    // Count completed checklist tasks
    const totalTasks = props.task.checklist.length
    const tasksComplete = props.task.checklist.reduce((sum, task) => {
        return (task.complete) ? sum + 1 : sum
    }, 0)
    const percentageComplete = (100 / totalTasks) * tasksComplete

    return (
        <React.Fragment>
            <Row className='no-gutters'>
                <Col xs='9'>
                    <TaskText
                        settings={props.settings}
                        task={props.task}
                        index={props.index}
                        handleTextChange={props.handleTextChange}
                        editText={props.editText}
                        toggleEditItem={props.toggleEditItem}
                    >
                        <TaskDetails
                            task={props.task}
                            articulateDateDue={props.articulateDateDue}
                        />
                    </TaskText>
                    {(props.task.checklist.length > 0) &&
                            <Progress
                                striped
                                color={(percentageComplete === 100) && 'success'}
                                style={{ 
                                    height: '8px',
                                    position: 'relative',
                                    zIndex: '-100',
                                    marginTop: '-6px',
                                    marginBottom: '2px',
                                    borderRadius: '0.25rem',
                                    backgroundImage: 'linear-gradient(to bottom,#d6d6d6 0,#e8e8e8 100%)'
                                }}
                                value={percentageComplete}
                            />
                    }
                </Col>
                <Col xs='3'>
                    <TransitionGroup>
                        <CSSTransition
                            key={props.task.id}
                            timeout={500}
                            classNames='fade'>
                            <TaskButtons
                                task={props.task}
                                index={props.index}
                                markComplete={props.markComplete}
                                sortItems={props.sortItems}
                            />
                        </CSSTransition>
                    </TransitionGroup>
                </Col>
            </Row>
            <TaskEditBox
                task={props.task}
                index={props.index}
                markComplete={props.markComplete}>
                <Row>
                    <Col>
                        <Calendar
                            value={props.convertDate(props.task.dateDue, 'ISO')}
                            handleOnChange={(event) => props.editDate(event, props.index)}
                            convertDate={props.convertDate}
                        />
                    </Col>
                    <Col>
                        <Priority
                            value={props.convertPriority(props.task.priority)}
                            handleOnChange={(event) => props.editPriority(event, props.index)}
                        />
                    </Col>
                </Row>
                <Row className='margin-top-2'>
                    <Col>
                        <Button
                            color='link'
                            onClick={() => props.showChecklist(props.index)}
                            disabled={props.task.checklist.length > 0}
                        >
                            {"Add checklist ▾"}
                        </Button>
                    </Col>
                    <Col>
                        <Tags
                            tags={props.tags}
                            index={props.index}
                            selectedTag={props.task.tag}
                            changeTag={(event) => props.editTaskTag(event, props.index)}
                            addTag={props.addTag}
                            removeTag={props.removeTag}
                        />
                    </Col>
                </Row>
                <Checklist
                    task={props.task}
                    index={props.index}
                    settings={props.settings}
                    addTask={props.addChecklistTask}
                    deleteTask={props.deleteChecklistTask}
                    hide={props.hideEditPanels}
                    sortTask={props.sortChecklistTask}
                    editTask={props.editChecklistTask}
                    editText={props.editChecklistTaskText}
                    percentageComplete={percentageComplete}
                />
            </TaskEditBox>
        </React.Fragment>
    )
}