import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Row, Col } from 'reactstrap'

export const TaskDetails = ({ task, articulateDateDue }) => 
    <Row>
        <Col className="task-details">
            <TransitionGroup>
                <div className="date-due x-small">
                    {(task.tag === null) ?
                        null :
                        <span className="tag">{task.tag}</span>}
                    {(task.active) ?
                        `Due: ${articulateDateDue(task.dateDue)}` :
                        <React.Fragment>
                            <span className="x-small">
                                {"Complete "}
                            </span>
                            <CSSTransition
                                in={!task.active}
                                timeout={1000}
                                classNames="star"
                            >
                                <span className="star x-small">
                                    {"★"}
                                </span>
                            </CSSTransition>
                            <CSSTransition
                                in={!task.active}
                                timeout={1000}
                                classNames="plus-one"
                            >
                                <span className="plus-one x-small">
                                    {" +1"}
                                </span>
                            </CSSTransition>
                        </React.Fragment>}
                </div>
            </TransitionGroup>
        </Col>
    </Row>