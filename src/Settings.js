import React from 'react'
import { Row, Col, Input, CustomInput } from 'reactstrap'

export const Settings = ({ settings, selectedStyle, changeStyle, changeColor, toggleInactiveTasks, toggleAddTasksToTop }) => {
    return (
        <React.Fragment>
            <fieldset>
                <div>
                    <legend>Choose your colours</legend>
                    <div>
                        <Input
                            className='select-style'
                            type='select'
                            value={selectedStyle}
                            onChange={changeStyle}>
                            <option value='None'>None</option>
                            <option value='Default'>Default</option>
                            <option value='Marie'>Marie</option>
                            <option value='Halloween'>Halloween</option>
                        </Input>
                    </div>
                    <div>
                        <input
                            className='change-color'
                            type='color'
                            value={settings.style.colorHigh}
                            onChange={(event) => changeColor(event, 'colorHigh')}>
                        </input>
                        <label>High Priority</label>
                    </div>
                    <div>
                        <input
                            className='change-color'
                            type='color'
                            value={settings.style.colorMedium}
                            onChange={(event) => changeColor(event, 'colorMedium')}>
                        </input>
                        <label>Medium Priority</label>
                    </div>
                    <div>
                        <input
                            className='change-color'
                            type='color'
                            value={settings.style.colorLow}
                            onChange={(event) => this.changeColor(event, 'colorLow')}>
                        </input>
                        <label>Low Priority</label>
                    </div>
                </div>
                <React.Fragment>
                    <div>-----------</div>
                    <Row>
                        <Col>
                            <CustomInput
                                type='checkbox'
                                id='hidInactive'
                                label="Show completed tasks"
                                checked={!settings.hideInactive}
                                onChange={toggleInactiveTasks} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CustomInput
                                type='checkbox'
                                id='addTasksToTop'
                                label="Add tasks to top of list"
                                checked={settings.addTasksToTop}
                                onChange={toggleAddTasksToTop} />
                        </Col>
                    </Row>
                    <div>-----------</div>
                </React.Fragment>
            </fieldset>
        </React.Fragment>
    )
}