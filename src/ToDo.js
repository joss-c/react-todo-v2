import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Container, Row, Col, Input, CustomInput, Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
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
        <Input 
            type="select" 
            className="priority-element" 
            value={value} 
            onChange={handleOnChange}
        >
            <option value="Low">Priority: Low</option>
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
                    toggleEditItem={props.toggleEditItem}
                >
                    <TaskDetails
                        item={props.item}
                        articulateDateDue={props.articulateDateDue} 
                    />
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
                            sortItems={props.sortItems}
                        />
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
                        convertDate={props.convertDate}
                    />
                </Col>
                <Col>
                    <Priority
                        value={props.convertPriority(props.item.priority)}
                        handleOnChange={(event) => props.editPriority(event, props.index)}
                    />
                </Col>
            </Row>
        </ItemEditBox>
    </React.Fragment>

const Task = ({ data, item, index, toggleEditItem, handleTextChange, editText, children }) =>
    <div
        className={(item.active) ? "task" : "task task-complete animate-background"}
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
                        <span className="instance">
                            {(item.instance > 1) ?
                                ` (${item.instance})` :
                                null}
                        </span>
                    </Col>
                </Row> :
                <span>
                    <Row className="edit-text no-gutters">
                        <Col xs="10">
                            <TextareaAutosize
                                className="edit-text-element"
                                onChange={(event) => handleTextChange(event)}
                                onClick={(event) => event.stopPropagation()}
                                defaultValue={item.task}
                            />
                        </Col>
                        <Col xs="2">
                            <Button
                                className="edit-text-button"
                                color="secondary"
                                size="sm"
                                onClick={(event) => editText(event, index)}
                            >
                                {"OK"}
                            </Button>
                        </Col>
                    </Row>
                </span>
            }
        </span>
        {children}
    </div>

const TaskDetails = ({ item, articulateDateDue }) =>
    <Row>
        <Col className="task-details">
            <TransitionGroup>
                <div className="date-due x-small">
                    {(item.tag === null) ?
                        null :
                        <span className="tag">{item.tag}</span>}
                    {(item.active) ?
                        `Due: ${articulateDateDue(item.dateDue)}` :
                        <React.Fragment>
                            <span className="x-small">
                                {"Complete "}
                            </span>
                            <CSSTransition
                                in={!item.active}
                                timeout={1000}
                                classNames="star"
                                //unmountOnExit
                            >
                                <span className="star x-small" >
                                    {"★"}
                                </span>
                            </CSSTransition>
                            <CSSTransition
                                in={!item.active}
                                timeout={1000}
                                classNames="plus-one"
                                //unmountOnExit
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


const ItemButtons = ({ item, index, markComplete, sortItems }) =>
    <div className="item-buttons">
        <Button
            className="sort-button"
            size="sm"
            outline
            color="secondary"
            onClick={() => sortItems(index, true)}>
            ↑
        </Button>
        <Button
            className="delete-item-button"
            size="sm"
            outline
            color={(item.active) ? "success" : "danger"}
            onClick={() => markComplete(index)}>
            {(item.active) ? "✓" : "✕"}
        </Button>
    </div>

const ItemEditBox = ({ item, index, markComplete, children }) =>
    <div className="edit-task" hidden={item.editPanelHidden}>
        <span hidden={!item.active}>
            {children}
        </span>
        <div className="undo">
            <Button
                hidden={item.active}
                className="undo-button"
                outline
                color="secondary"
                onClick={() => markComplete(index, true)}>
                Undo "Mark Complete"
            </Button>
        </div>
    </div>

const Settings = ({ data, settingsHidden, selectedStyle, changeStyle, changeColor, toggleInactiveTasks }) =>
    <React.Fragment>
        <fieldset hidden={settingsHidden}>
            <div>
                <legend>Choose your colours</legend>
                <div>
                    <Input
                        className="select-style"
                        type="select"
                        value={selectedStyle}
                        onChange={changeStyle}>
                        <option value="None">None</option>
                        <option value="Default">Default</option>
                        <option value="Marie">Marie</option>
                        <option value="Halloween">Halloween</option>
                    </Input>
                </div>
                <div>
                    <input
                        className="change-color"
                        type="color"
                        value={data.settings.style.colorHigh}
                        onChange={(event) => changeColor(event, "colorHigh")}>
                    </input>
                    <label>High Priority</label>
                </div>
                <div>
                    <input
                        className="change-color"
                        type="color"
                        value={data.settings.style.colorMedium}
                        onChange={(event) => changeColor(event, "colorMedium")}>
                    </input>
                    <label>Medium Priority</label>
                </div>
                <div>
                    <input
                        className="change-color"
                        type="color"
                        value={data.settings.style.colorLow}
                        onChange={(event) => this.changeColor(event, "colorLow")}>
                    </input>
                    <label>Low Priority</label>
                </div>
            </div>
            <React.Fragment>
                <div>-----------</div>
                <Row>
                    <Col>
                        <CustomInput
                            type="checkbox"
                            id="checkbox"
                            label="Show completed tasks"
                            checked={!data.settings.hideInactive}
                            onChange={toggleInactiveTasks} />
                    </Col>
                </Row>
                <div>-----------</div>
            </React.Fragment>
        </fieldset>
    </React.Fragment>

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
            tag: (selectedTag === "None") ? null : selectedTag,
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
                            <Input
                                type="text"
                                className="input--add-task"
                                onChange={inputChange}
                                innerRef={this.inputElement}
                                placeholder="Enter Task">
                            </Input>
                        </Col>
                        <Col xs="3">
                            <Button
                                className="add-button"
                                outline
                                color="primary"
                                disabled={buttonDisabled}
                                type="submit">
                                Add
                            </Button>
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
                            hidden: false,
                            id: uuid().substring(0, 10),
                            task: "Sample Task ✨",
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
                            colorHigh: "#f5c6cb",
                            colorMedium: "#ffeeba",
                            colorLow: "#bee5eb"
                        },
                        hideInactive: false
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
            editTaskText: "",
            modal: false
        }
        this.selectSortBy = React.createRef()
    }

    componentDidUpdate() {
        const { data } = this.state
        const { saveData } = this.props
        saveData(data)
    }

    componentDidMount() {
        this.hideEditPanels()
        this.sortItems()
        console.log(this.state.data.listItems)
    }

    clone = (object) => {
        return JSON.parse(JSON.stringify(object))
    }

    addItem = (newItem) => {
        const { selectedSort } = this.state
        const data = this.clone(this.state.data)
        data.listItems = [...data.listItems, newItem]
        data.listItems = this.sortItemsBy(data.listItems, selectedSort)
        this.setState({
            data: data,
            buttonDisabled: true
        })
    }

    markComplete = (index, undo) => {
        const data = this.clone(this.state.data)
        const item = data.listItems[index]
        if (data.listItems.length === 0) {
            console.log("List is empty")
        } else {
            const itemIsActive = item.active
            if (itemIsActive) {
                item.active = false
                this.setState({
                    data: data
                })
            } else if (undo) {
                item.editPanelHidden = true
                item.active = true
                this.setState({
                    data: data
                })
            } else {
                this.deleteItem(index)
            }
        }
    }

    deleteItem = (key) => {
        const data = this.clone(this.state.data)
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
        const { selectedSort } = this.state
        const data = this.clone(this.state.data)
        const item = data.listItems[index]
        const selectedPriority = event.target.value
        item.priority = this.convertPriority(selectedPriority)
        item.editPanelHidden = true
        data.listItems = this.sortItemsBy(data.listItems, selectedSort)
        this.setState({
            data: data
        })
    }

    editDate = (event, index) => {
        const { selectedSort } = this.state
        const data = this.clone(this.state.data)
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
        const listItemsCopy = this.clone(listItems)
        if (type === "selected tag") {
            listItemsCopy.forEach(item => (item.tag !== tag) && (item.hidden = true))
        } else if (type === "tags only") {
            listItemsCopy.forEach(item => (item.tag === null) && (item.hidden = true))
        } else if (type === "show all") {
            listItemsCopy.forEach(item => (item.hidden === true) && (item.hidden = false))
        }
        return listItemsCopy
    }

    sortItemsBy = (listItems, selectedSort, moveFrom) => {
        const showAll = this.toggleItems(listItems, "show all")
        if (selectedSort === "Manual") {
            const moveTo = moveFrom - 1
            return listItems = this.props.arrayMove(listItems, moveFrom, moveTo)
            //return listItems.sort(firstBy("active", -1))
        }
        if (selectedSort === "None") {
            return showAll
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
        } else if (selectedSort === "toggle inactive") {
            return listItems.sort(firstBy("active", -1))
        }
    }

    sortItems = (index, manual) => {
        const data = this.clone(this.state.data)
        const selectedSort = this.selectSortBy.current.value
        if (manual) {
            if (selectedSort === "None") {
                data.listItems = this.sortItemsBy(data.listItems, "Manual", index)
                this.setState({
                    data: data
                })
            } else {
                data.listItems = this.sortItemsBy(data.listItems, "Manual", index)
                this.setState({
                    data: data,
                    selectedSort: "None"
                })
            }
        } else {
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
    }

    toggleEditItem = (index) => {
        const data = this.clone(this.state.data)
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
        const data = this.clone(this.state.data)
        data.settings.style[selectedColor] = event.target.value
        this.setState({
            data: data,
            selectedStyle: "None"
        })
    }

    toggleSettings = () => {
        this.setState(state => ({
            settingsHidden: false,
            modal: !state.modal
        }))
    }

    changeStyle = (event) => {
        const data = this.clone(this.state.data)
        const style = event.target.value
        const colors = data.settings.style
        if (style === "None") {
            this.setState({
                selectedStyle: style
            })
        } else if (style === "Default") {
            colors.colorHigh = "#f5c6cb"
            colors.colorMedium = "#ffeeba"
            colors.colorLow = "#bee5eb"
            this.setState({
                data: data,
                selectedStyle: style
            })
        } else if (style === "Marie") {
            colors.colorHigh = "#f46ed0"
            colors.colorMedium = "#f2b5e2"
            colors.colorLow = "#fce8f7"
            this.setState({
                data: data,
                selectedStyle: style
            })
        } else if (style === "Halloween") {
            colors.colorHigh = "#e76427"
            colors.colorMedium = "#ffa100"
            colors.colorLow = "#feeeb8"
            this.setState({
                data: data,
                selectedStyle: style
            })
        }
    }

    changeTag = (event) => {
        const { selectedSort } = this.state
        const data = this.clone(this.state.data)
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
        const data = this.clone(this.state.data)
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
        const { selectedTag } = this.state
        const data = this.clone(this.state.data)
        data.tags = data.tags.filter(tag => tag !== selectedTag || tag === "None")
        this.setState({
            data: data,
            selectedTag: "None"
        })
    }

    editText = (event, index) => {
        event.stopPropagation()
        const { editTaskText } = this.state
        const data = this.clone(this.state.data)
        data.listItems[index].task = editTaskText
        data.listItems[index].editPanelHidden = true
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

    hideEditPanels = () => {
        const { data } = this.state
        data.listItems.forEach(item => (item.editPanelHidden === false) && (item.editPanelHidden = true))
    }

    toggleInactiveTasks = () => {
        const data = this.clone(this.state.data)
        data.settings.hideInactive = !data.settings.hideInactive
        data.listItems = this.sortItemsBy(data.listItems, "toggle inactive")
        this.setState({
            data: data
        })
    }

    toggleModal = () => {
        this.setState(state => ({
            modal: !state.modal,
            settingsHidden: true
        }))
    }

    render() {
        const { data, buttonDisabled, selectedPriority, selectedDate, selectedTag, selectedSort, settingsHidden, selectedStyle, modal } = this.state
        const { convertDate, articulateDateDue } = this.props
        return (
            <Container style={{ backgroundColor: (selectedStyle === "Halloween") ? "black" : "white" }}>
                <Modal isOpen={modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                    {"Settings"}
                    </ModalHeader>
                    <ModalBody>
                        <Settings
                            data={data}
                            settingsHidden={settingsHidden}
                            selectedStyle={selectedStyle}
                            changeStyle={this.changeStyle}
                            changeColor={this.changeColor}
                            toggleInactiveTasks={this.toggleInactiveTasks}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>OK</Button>
                    </ModalFooter>
                </Modal>
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
                        <Row className="row-1 no-gutters">
                            <Col>
                                <div className="calendar">
                                    <Calendar
                                        value={selectedDate}
                                        handleOnChange={this.changeDate}
                                        convertDate={convertDate} />
                                </div>
                            </Col>
                            <Col>
                                <div className="priority--top">
                                    <Priority
                                        value={selectedPriority}
                                        handleOnChange={this.changePriority} />
                                </div>
                            </Col>
                        </Row>
                        <Row className="row-2 no-gutters">
                            <Col
                                className="sort padding-right"
                                xs="5">
                                <Input
                                    type="select"
                                    className="select-sort"
                                    value={selectedSort}
                                    innerRef={this.selectSortBy}
                                    onChange={this.sortItems}>
                                    <option value="None">Sort: None</option>
                                    <option value="Priority">Priority</option>
                                    <option value="Date Due">Date Due</option>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Tags">Tags</option>
                                    <option value="Selected Tag">Selected Tag</option>
                                </Input>
                            </Col>
                            <Col
                                className="manage-tags"
                                xs="7">
                                <Input
                                    type="select"
                                    className="select-tag"
                                    value={selectedTag}
                                    onChange={this.changeTag}>
                                    {this.state.data.tags.map((tag, index) =>
                                        <option
                                            key={index}
                                            value={tag}>
                                            {(tag === "None") ? "Tag: None" : tag}
                                        </option>
                                    )}
                                </Input>
                                <Button
                                    outline
                                    color="secondary"
                                    size="sm"
                                    onClick={this.removeTag}>
                                    -
                                </Button>
                                <Button
                                    outline
                                    color="secondary"
                                    size="sm"
                                    onClick={this.addTag}>
                                    +
                                </Button>
                            </Col>
                        </Row>
                        <List className="list">
                            <TransitionGroup>
                                {data.listItems.map((item, index) =>
                                    (item.hidden) ?
                                        null :
                                        (!item.active && data.settings.hideInactive) ?
                                            null :
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
                        <Row className="row-3 no-gutters">
                            <Button
                                className="settings-button"
                                outline color="secondary"
                                onClick={this.toggleSettings}>
                                ⚙
                        </Button>
                        </Row>
                        <Row className="settings no-gutters">
                        </Row>
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