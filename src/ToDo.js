import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Container, Row, Col, Input, Button, Form, FormGroup } from 'reactstrap'
import TextareaAutosize from 'react-autosize-textarea'
import uuid from 'uuid'
import { convertDate, articulateDateDue, arrayMove } from './functions'
import { firstBy } from './thenBy.min.js'

const Calendar = ({ handleOnChange, value, convertDate }) =>
    <React.Fragment>
        <Input
            className="calendar-element"
            onChange={handleOnChange}
            type="date"
            value={value}
            min={convertDate(Date.now(), "ISO")}
            max="2019-12-31"
        />
    </React.Fragment>

const Priority = ({ handleOnChange, value }) =>
    <React.Fragment>
        <Input type="select" className="priority-element" value={value} onChange={handleOnChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </Input>
    </React.Fragment>

const List = (props) =>
    <div className="list">
        {props.children}
    </div>

const ListItem = (props) =>
    <React.Fragment>
        <Row className="no-gutters">
            <Col xs="9">
                <Task
                    data={props.data}
                    item={props.item}
                    index={props.index}
                    handleTextChange={props.handleTextChange}
                    editText={props.editText}
                    toggleEditItem={props.toggleEditItem}>
                    <TaskDetails
                        item={props.item}
                        articulateDateDue={props.articulateDateDue} />
                </Task>
            </Col>
            <Col xs="3">
                <TransitionGroup>
                    <CSSTransition
                        key={props.item.id}
                        timeout={500}
                        classNames="fade">
                        <ItemButtons
                            item={props.item}
                            index={props.index}
                            markComplete={props.markComplete}
                            sortItems={props.sortItems} />
                    </CSSTransition>
                </TransitionGroup>
            </Col>
        </Row>
        <ItemEditBox
            item={props.item}
            index={props.index}
            markComplete={props.markComplete}>
            <Row>
                <Col>
                    <Calendar
                        value={props.convertDate(props.item.dateDue, "ISO")}
                        handleOnChange={(event) => props.editDate(event, props.index)}
                        convertDate={props.convertDate} />
                </Col>
                <Col>
                    <Priority
                        value={props.convertPriority(props.item.priority)}
                        handleOnChange={(event) => props.editPriority(event, props.index)} />
                </Col>
            </Row>
        </ItemEditBox>
    </React.Fragment>



const Task = ({ data, item, index, toggleEditItem, handleTextChange, editText, children }) =>
    <div
        className="task"
        onClick={() => toggleEditItem(index)}
        style={{
            backgroundColor:
                (!item.active) ?
                    "#e5e5e5" :
                    (item.priority === 3) ?
                        data.settings.style.colorLow :
                        (item.priority === 2) ?
                            data.settings.style.colorMedium :
                            data.settings.style.colorHigh
        }}>
        <span
            style={{
                textDecorationLine:
                    (item.active) ?
                        "none" :
                        "line-through"
            }}>
            {(item.editPanelHidden) ?
                <Row>
                    <Col>
                        {item.task}
                    </Col>
                </Row> :
                <span>
                    <Row className="edit-text no-gutters">
                        <Col xs="10">
                            <TextareaAutosize
                                className="edit-text-element"
                                onChange={(event) => handleTextChange(event)}
                                onClick={(event) => event.stopPropagation()}
                                defaultValue={item.task} />
                        </Col>
                        <Col xs="2">
                            <Button
                                className="edit-text-button"
                                color="secondary"
                                size="sm"
                                onClick={() => editText(index)}
                            >OK</Button>
                        </Col>
                    </Row>
                </span>
            }
        </span>
        <span className="instance">
            {(item.instance > 1) ?
                ` (${item.instance})` :
                null}
        </span>
        {children}
    </div>

const TaskDetails = ({ item, articulateDateDue }) =>
    <Row>
        <Col className="task-details">
            <span className="date-due">
                {(item.tag === null) ?
                    null :
                    <span className="tag">{item.tag}</span>}
                {(item.active) ?
                    `Due: ${articulateDateDue(item.dateDue)}` :
                    "Complete"}
            </span>
        </Col>
    </Row>


const ItemButtons = ({ item, index, markComplete, sortItems }) =>
    <div className="item-buttons">
        <Button className="sort-button" size="sm" outline color="secondary" onClick={() => sortItems(index, true)}>↑</Button>
        <Button className="delete-item-button" size="sm" outline color="success" onClick={() => markComplete(index)}>
            {(item.active) ? "✓" : "✕"}
        </Button>
    </div>

const ItemEditBox = ({ item, index, markComplete, children }) =>
    <div className="edit-task" hidden={item.editPanelHidden}>
        <span hidden={!item.active}>
            {children}
        </span>
        <div className="undo">
            <Button hidden={item.active} className="undo-button" outline color="secondary" onClick={() => markComplete(index, true)}>Undo "Mark Complete"</Button>
        </div>
    </div>

class AddTask extends Component {
    constructor(props) {
        super(props)
        this.inputElement = React.createRef()
    }
    createItem = (event) => {
        const { data, selectedPriority, addItem, convertPriority, convertDate, selectedDate, selectedTag } = this.props
        const inputElementValue = this.inputElement.current.value
        const itemInstances = data.listItems.reduce(function (total, item) {
            return total + (inputElementValue === item.task ? 1 : 0)
        }, 1)
        const newItem = {
            active: true,
            id: uuid().substring(0, 10),
            hidden: false,
            task: inputElementValue,
            priority: convertPriority(selectedPriority),
            time: Date.now(),
            dateDue: convertDate(selectedDate, "timestamp"),
            instance: itemInstances,
            editPanelHidden: true,
            settingsHidden: true,
            tag: (selectedTag === "None") ? null : selectedTag
        }
        addItem(newItem)
        this.inputElement.current.value = ""
        event.preventDefault()
    }

    render() {
        const { inputChange, buttonDisabled } = this.props
        return (
            <Form onSubmit={this.createItem}>
                <FormGroup>
                    <Row className="row-0 no-gutters">
                        <Col className="padding-right" xs="9">
                            <Input type="text" className="input--add-task" onChange={inputChange} innerRef={this.inputElement}
                                placeholder="Enter Task">
                            </Input>
                        </Col>
                        <Col xs="3">
                            <Button className="add-button" outline color="primary" disabled={buttonDisabled} type="submit">Add</Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        )
    }
}

class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: (this.props.data) ? JSON.parse(this.props.data) :
                {
                    listItems:
                        [{
                            active: true,
                            task: "Your First Task",
                            priority: 3,
                            time: Date.now(),
                            instance: 1,
                            editPanelHidden: true,
                            dateDue: Date.now(),
                            tag: null
                        }],
                    settings:
                    {
                        style: {
                            colorHigh: "#ff8680",
                            colorMedium: "#ffe84b",
                            colorLow: "#a8d7ea"
                        }
                    },
                    tags: ["None"]
                },
            buttonDisabled: true,
            selectedPriority: "Low",
            selectedSort: "None",
            selectedDate: this.props.convertDate(Date.now(), "ISO"),
            settingsHidden: true,
            selectedStyle: "None",
            selectedTag: "None",
            editTaskText: ""
        }
        this.selectSortBy = React.createRef()
    }

    componentDidUpdate() {
        const { data } = this.state
        const { saveData } = this.props
        saveData(data)
        console.log(data)
    }

    componentDidMount() {
        this.sortItems()
        console.log(this.state.data.listItems)
    }

    addItem = (newItem) => {
        const { data, selectedSort } = this.state
        data.listItems = [...data.listItems, newItem]
        data.listItems = this.sortItemsBy(data.listItems, selectedSort)
        this.setState({
            data: data,
            buttonDisabled: true
        })
    }

    markComplete = (index, undo) => {
        const { data } = this.state
        const itemIsActive = data.listItems[index].active
        if (itemIsActive) {
            data.listItems[index].active = false
            this.setState({
                data: data
            })
            this.sortItems()
        } else if (undo) {
            data.listItems[index].active = true
            this.setState({
                data: data
            })
            this.sortItems()
        } else {
            this.deleteItem(index)
        }
    }

    deleteItem = (key) => {
        const { data } = this.state
        data.listItems = data.listItems.filter((item, index) =>
            index !== key
        )
        this.setState({
            data: data
        })
    }

    changePriority = (event) => {
        const selectedPriority = event.target.value
        this.setState({ selectedPriority: selectedPriority })
    }

    convertPriority = (priority) => {
        if (typeof priority === 'string') {
            return (priority === "Low") ? 3
                : (priority === "Medium") ? 2
                    : 1
        } else {
            return (priority === 3) ? "Low"
                : (priority === 2) ? "Medium"
                    : "High"
        }
    }

    editPriority = (event, index) => {
        let { data } = this.state
        const { selectedSort } = this.state
        const selectedPriority = event.target.value
        data.listItems[index].priority = this.convertPriority(selectedPriority)
        data.listItems[index].editPanelHidden = true
        data.listItems = this.sortItemsBy(data.listItems, selectedSort)
        this.setState({
            data: data
        })
    }

    editDate = (event, index) => {
        let { data } = this.state
        const { selectedSort } = this.state
        const newDate = event.target.value
        data.listItems[index].dateDue = convertDate(newDate, "timestamp")
        data.listItems[index].editPanelHidden = true
        data.listItems = this.sortItemsBy(data.listItems, selectedSort)
        this.setState({
            data: data
        })
    }

    inputChange = (event) => {
        const currentText = event.target.value
        if (currentText === "") {
            this.setState({
                buttonDisabled: true
            })
        } else {
            this.setState({
                buttonDisabled: false
            })
        }
    }

    toggleItems = (listItems, type, tag) => {
        const updateList = listItems
        if (type === "selected tag") {
            updateList.forEach(item => (item.tag !== tag) && (item.hidden = true))
        } else if (type === "tags only") {
            updateList.forEach(item => (item.tag === null) && (item.hidden = true))
        } else if (type === "show all") {
            updateList.forEach(item => item.hidden = false)
        }
        return updateList
    }

    sortItemsBy = (listItems, selectedSort, moveFrom) => {
        const showAll = this.toggleItems(listItems, "show all")
        if (selectedSort === "Manual") {
            const moveTo = moveFrom - 1
            return this.props.arrayMove(listItems, moveFrom, moveTo)
        }
        if (selectedSort === "None") {
            listItems = showAll
            return listItems
        } else if (selectedSort === "Priority") {
            listItems = showAll
            return listItems.sort(
                firstBy("active", -1)
                    .thenBy("priority")
                    .thenBy("dateDue")
                    .thenBy("task")
            )
        } else if (selectedSort === "Date Due") {
            listItems = showAll
            return listItems.sort(
                firstBy("active", -1)
                    .thenBy("dateDue")
                    .thenBy("priority")
                    .thenBy("task")
            )
        } else if (selectedSort === "A-Z") {
            listItems = showAll
            return listItems.sort(
                firstBy("active", -1)
                    .thenBy("task")
            )
        } else if (selectedSort === "Tags") {
            listItems = showAll
            listItems = this.toggleItems(listItems, "tags only")
            return listItems.sort(
                firstBy("tag")
                    .thenBy("priority")
                    .thenBy("dateDue")
                    .thenBy("task")
            )
        } else if (selectedSort === "Selected Tag") {
            listItems = this.toggleItems(listItems, "selected tag", this.state.selectedTag)
            return listItems.sort(
                firstBy("tag")
                    .thenBy("priority")
                    .thenBy("dateDue")
                    .thenBy("task")
            )
        }
    }

    sortItems = (index, manual) => {
        const { data } = this.state
        const selectedSort = this.selectSortBy.current.value
        if (manual && selectedSort === "None") {
            data.listItems = this.sortItemsBy(data.listItems, "Manual", index)
            this.setState({
                data: data
            })
        }
        if (selectedSort === "None") {
            data.listItems = this.sortItemsBy(data.listItems, selectedSort)
            this.setState({
                data: data,
                selectedSort: selectedSort
            })
        } else {
            data.listItems = this.sortItemsBy(data.listItems, selectedSort)
            this.setState({
                data: data,
                selectedSort: selectedSort
            })
        }
    }

    toggleEditItem = (index) => {
        let { data } = this.state
        const targetItem = data.listItems[index]
        const targetPanelState = targetItem.editPanelHidden
        data.listItems.forEach(function (item, index) {
            if (item.editPanelHidden === false && item !== targetItem) {
                item.editPanelHidden = true
            }
        })
        data.listItems[index].editPanelHidden = !targetPanelState
        this.setState({
            data: data,
            editTaskText: targetItem.task
        })
    }

    changeDate = (event) => {
        const updateDate = event.target.value
        this.setState({
            selectedDate: updateDate
        })
    }

    changeColor = (event, selectedColor) => {
        const { data } = this.state
        data.settings.style[selectedColor] = event.target.value
        this.setState({
            data: data,
            selectedStyle: "None"
        })
    }

    toggleSettings = () => {
        this.setState(state => ({
            settingsHidden: !state.settingsHidden
        }))
    }

    changeStyle = (event) => {
        const { data } = this.state
        const style = event.target.value
        if (style === "None") {
            this.setState({
                selectedStyle: style
            })
        } else if (style === "Default") {
            data.settings.style.colorHigh = "#ff8680"
            data.settings.style.colorMedium = "#ffe84b"
            data.settings.style.colorLow = "#a8d7ea"
            this.setState({
                data: data,
                selectedStyle: style
            })
        } else if (style === "Marie") {
            data.settings.style.colorHigh = "#f46ed0"
            data.settings.style.colorMedium = "#f2b5e2"
            data.settings.style.colorLow = "#fce8f7"
            this.setState({
                data: data,
                selectedStyle: style
            })
        }
    }

    changeTag = (event) => {
        const { data, selectedSort } = this.state
        const tag = event.target.value
        if (selectedSort === "Selected Tag") {
            this.toggleItems(data.listItems, "show all")
            this.toggleItems(data.listItems, "selected tag", tag)
            this.setState({
                data: data,
                selectedTag: tag
            })
        } else {
            this.setState({
                selectedTag: tag
            })
        }
    }

    addTag = () => {
        const { data } = this.state
        const newTag = prompt("Enter a new tag")
        if (newTag === "" || data.tags.includes(newTag)) {
            alert("Invalid tag or duplicate")
        } else {
            data.tags = [...data.tags, newTag]
            this.setState({
                data: data,
                selectedTag: newTag
            })
        }
    }

    removeTag = () => {
        const { data, selectedTag } = this.state
        data.tags = data.tags.filter(tag => tag !== selectedTag || tag === "None")
        this.setState({
            data: data,
            selectedTag: "None"
        })
    }

    editText = (index) => {
        const { data, editTaskText } = this.state
        data.listItems[index].task = editTaskText
        this.setState({
            data: data
        })
    }

    handleTextChange = (event) => {
        const currentText = event.target.value
        this.setState({
            editTaskText: currentText
        })
    }

    render() {
        const { data, buttonDisabled, selectedPriority, selectedDate, selectedTag, selectedSort, settingsHidden, selectedStyle } = this.state
        const { convertDate, articulateDateDue } = this.props
        return (
            <Container>
                <Row>
                    <Col className="todo" sm="10" md="7" lg="5" xl="5">
                        <AddTask
                            data={data}
                            addItem={this.addItem}
                            inputChange={this.inputChange}
                            convertPriority={this.convertPriority}
                            convertDate={convertDate}
                            buttonDisabled={buttonDisabled}
                            selectedPriority={selectedPriority}
                            selectedDate={selectedDate}
                            selectedTag={selectedTag} />
                        <Row className="row-1">
                            <Col>
                                <div className="calendar">
                                    <Calendar value={selectedDate} handleOnChange={this.changeDate} convertDate={convertDate} />
                                </div>
                            </Col>
                            <Col>
                                <div className="priority--top">
                                    <Priority value={selectedPriority} handleOnChange={this.changePriority} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="row-2 no-gutters">
                            <Col className="sort padding-right" xs="auto">
                                <Input type="select" className="select-sort" value={selectedSort} innerRef={this.selectSortBy} onChange={this.sortItems}>
                                    <option value="None">Sort: None</option>
                                    <option value="Priority">Priority</option>
                                    <option value="Date Due">Date Due</option>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Tags">Tags</option>
                                    <option value="Selected Tag">Selected Tag</option>
                                </Input>
                            </Col>
                            <Col className="tag-select" xs="auto" sm={{ offset: 2 }} md={{ offset: 1 }} xl={{ offset: 3 }}>
                                <Input type="select" value={selectedTag} onChange={this.changeTag}>
                                    {this.state.data.tags.map((tag, index) =>
                                        <option key={index} value={tag}>{(tag === "None") ? "Tag: None" : tag}</option>
                                    )}
                                </Input>
                                <Button outline color="secondary" size="sm" onClick={this.removeTag}>-</Button>
                                <Button outline color="secondary" size="sm" onClick={this.addTag}>+</Button>
                            </Col>
                        </Row>
                        <List className="list">
                            <TransitionGroup>
                                {data.listItems.map((item, index) =>
                                    (item.hidden) ? null :
                                        <CSSTransition
                                            key={item.id}
                                            timeout={500}
                                            classNames="fade">
                                            <ListItem
                                                data={data}
                                                item={item}
                                                index={index}
                                                handleTextChange={this.handleTextChange}
                                                editText={this.editText}
                                                toggleEditItem={this.toggleEditItem}
                                                articulateDateDue={articulateDateDue}
                                                markComplete={this.markComplete}
                                                sortItems={this.sortItems}
                                                convertPriority={this.convertPriority}
                                                editDate={this.editDate}
                                                convertDate={convertDate}
                                                editPriority={this.editPriority} />
                                        </CSSTransition>
                                )}
                            </TransitionGroup>
                        </List>
                        <Button className="settings-button" outline color="secondary" onClick={this.toggleSettings}>⚙</Button>
                        <div className="settings">
                            <fieldset hidden={settingsHidden}>
                                <div>
                                    <div>
                                        <select className="select-style" value={selectedStyle} onChange={this.changeStyle}>
                                            <option value="None">None</option>
                                            <option value="Default">Default</option>
                                            <option value="Marie">Marie</option>
                                        </select>
                                    </div>
                                    <legend>Choose your colours</legend>
                                    <div>
                                        <input className="change-color" type="color" value={data.settings.style.colorHigh} onChange={(event) => this.changeColor(event, "colorHigh")}></input>
                                        <label>High Priority</label>
                                    </div>
                                    <div>
                                        <input className="change-color" type="color" value={data.settings.style.colorMedium} onChange={(event) => this.changeColor(event, "colorMedium")}></input>
                                        <label>Medium Priority</label>
                                    </div>
                                    <div>
                                        <input className="change-color" type="color" value={data.settings.style.colorLow} onChange={(event) => this.changeColor(event, "colorLow")}></input>
                                        <label>Low Priority</label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

ToDo.defaultProps = {
    convertDate: convertDate,
    articulateDateDue: articulateDateDue,
    arrayMove: arrayMove
}

export default ToDo