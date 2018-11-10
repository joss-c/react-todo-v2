import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Container, Row, Col, Input, CustomInput, Button, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { MoonLoader } from 'react-spinners'
import Notifications, { notify } from 'react-notify-toast'
import TextareaAutosize from 'react-autosize-textarea'
import uuid from 'uuid'
import { convertDate, articulateDateDue, arrayMove } from './functions'
import { randomMessage } from './randomMessage'
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

const Task = ({ settings, task, index, toggleEditItem, handleTextChange, editText, children }) =>
    <div
        className={(task.active) ? "task" : "task animate-background"}
        onClick={() => toggleEditItem(index)}
        style={{
            backgroundColor:
                (!task.active) ?
                    "#e5e5e5" :
                    (task.priority === 3) ?
                        settings.style.colorLow :
                        (task.priority === 2) ?
                            settings.style.colorMedium :
                            settings.style.colorHigh
        }}>
        <span
            style={{
                textDecorationLine:
                    (task.active) ?
                        "none" :
                        "line-through"
            }}>
            {(task.editPanelHidden) ?
                <Row>
                    <Col>
                        {task.text}
                        <span className="instance">
                            {(task.instance > 1) ?
                                ` (${task.instance})` :
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
                                defaultValue={task.text}
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

const TaskDetails = ({ task, articulateDateDue }) =>
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
                            //unmountOnExit
                            >
                                <span className="star x-small" >
                                    {"★"}
                                </span>
                            </CSSTransition>
                            <CSSTransition
                                in={!task.active}
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

const ItemButtons = ({ task, index, markComplete, sortItems }) =>
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
            color={(task.active) ? "success" : "danger"}
            onClick={() => markComplete(index)}>
            {(task.active) ? "✓" : "✕"}
        </Button>
    </div>

const ItemEditBox = ({ task, index, markComplete, children }) =>
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
                onClick={() => markComplete(index, true)}>
                Undo "Mark Complete"
            </Button>
        </div>
    </div>

const Settings = ({ settings, settingsHidden, selectedStyle, changeStyle, changeColor, toggleInactiveTasks }) =>
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
                        value={settings.style.colorHigh}
                        onChange={(event) => changeColor(event, "colorHigh")}>
                    </input>
                    <label>High Priority</label>
                </div>
                <div>
                    <input
                        className="change-color"
                        type="color"
                        value={settings.style.colorMedium}
                        onChange={(event) => changeColor(event, "colorMedium")}>
                    </input>
                    <label>Medium Priority</label>
                </div>
                <div>
                    <input
                        className="change-color"
                        type="color"
                        value={settings.style.colorLow}
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
                            checked={!settings.hideInactive}
                            onChange={toggleInactiveTasks} />
                    </Col>
                </Row>
                <div>-----------</div>
            </React.Fragment>
        </fieldset>
    </React.Fragment>

const ListItem = (props) =>
    <React.Fragment>
        <Row className="no-gutters">
            <Col xs="9">
                <Task
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
                </Task>
            </Col>
            <Col xs="3">
                <TransitionGroup>
                    <CSSTransition
                        key={props.task.id}
                        timeout={500}
                        classNames="fade">
                        <ItemButtons
                            task={props.task}
                            index={props.index}
                            markComplete={props.markComplete}
                            sortItems={props.sortItems}
                        />
                    </CSSTransition>
                </TransitionGroup>
            </Col>
        </Row>
        <ItemEditBox
            task={props.task}
            index={props.index}
            markComplete={props.markComplete}>
            <Row>
                <Col>
                    <Calendar
                        value={props.convertDate(props.task.dateDue, "ISO")}
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
        </ItemEditBox>
    </React.Fragment>

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentWillMount() {
        this.setState({
            loading: true
        })
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        const { stats, statsHidden } = this.props
        const { loading } = this.state
        const tasksCompleted = stats.tasksCompleted
        const totalTasksCompleted = Object.keys(tasksCompleted).length
        const oneWeekAgo = Date.now() - (60 * 60 * 24 * 7 * 1000)
        const totalTasksCompletedOneWeek =
            Object.keys(tasksCompleted)
                .reduce((total, id) => {
                    if (tasksCompleted[id].timeCompleted > oneWeekAgo) {
                        total++
                    }
                    return total
                }, 0)
        return (
            (loading) ?
                <div className="align-center">
                    <MoonLoader
                        color={'#007bff'}
                        sizeUnit={"px"}
                        size={100}
                        loading={loading}
                    />
                </div>
                :
                <div
                    className="align-center"
                    hidden={statsHidden}
                >
                    <div className="star-big">
                        {"★"}
                    </div>
                    <h1>{`${totalTasksCompleted + stats.bonusStars - stats.starsUsed} stars earned!`}</h1>
                    <div>
                        {`Tasks completed: ${totalTasksCompleted}`}
                    </div>
                    <div>
                        {`This week: ${totalTasksCompletedOneWeek}`}
                    </div>
                </div>
        )
    }
}

class AddTask extends Component {
    constructor(props) {
        super(props)
        this.inputElement = React.createRef()
    }
    createItem = (event) => {
        const { tasks, selectedPriority, addItem, convertPriority, convertDate, selectedDate, selectedTag } = this.props
        const inputElementValue = this.inputElement.current.value
        const itemInstances = tasks.reduce(function (total, task) {
            return total + (inputElementValue === task.text ? 1 : 0)
        }, 1)
        const newItem = {
            active: true,
            id: uuid().substring(0, 12),
            hidden: false,
            text: inputElementValue,
            priority: convertPriority(selectedPriority),
            timeCreated: Date.now(),
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
            tasks: (this.props.tasks) ? JSON.parse(this.props.tasks) :
                [{
                    active: true,
                    hidden: false,
                    id: uuid().substring(0, 10),
                    text: "Sample Task ✨",
                    priority: 3,
                    time: Date.now(),
                    instance: 1,
                    editPanelHidden: true,
                    dateDue: convertDate(convertDate(Date.now(), "ISO"), "timestamp"),
                    tag: null
                }],
            settings: (this.props.settings) ? JSON.parse(this.props.settings) :
                {
                    style: {
                        colorHigh: "#f5c6cb",
                        colorMedium: "#ffeeba",
                        colorLow: "#bee5eb",
                        backgroundColor: "#ffffff",
                        font: ""
                    },
                    hideInactive: false
                },
            stats: (this.props.stats) ? JSON.parse(this.props.stats) :
                {
                    tasksCompleted: {},
                    bonusStars: 0,
                    starsUsed: 0,
                },
            tags: (this.props.tags) ? JSON.parse(this.props.tags) : ["None"],
            buttonDisabled: true,
            selectedPriority: "Low",
            selectedSort: "None",
            selectedDate: this.props.convertDate(Date.now(), "ISO"),
            settingsHidden: true,
            statsHidden: true,
            selectedStyle: "None",
            selectedTag: "None",
            editTaskText: "",
            showModal: false
        }
        this.selectSortBy = React.createRef()
        this.notify = notify.createShowQueue()
        this.styles = {
            Default: ["#bee5eb", "#ffeeba", "#f5c6cb", "#ffffff"],
            Marie: ["#fce8f7", "#f2b5e2", "#f46ed0", "#ffffff"],
            Halloween: ["#feeeb8", "#ffa100", "#e76427", "#000000"]
        }
        this.notifyStyle = { background: "#007bff", text: "#ffffff" }
    }

    componentDidUpdate(prevProps, prevState) {
        const { tasks, settings, stats, tags } = this.state
        const { saveData } = this.props
        if (prevState.tasks !== tasks) {
            saveData(tasks, "tasks")
        }
        if (prevState.settings !== settings) {
            saveData(settings, "settings")
        }
        if (prevState.stats !== stats) {
            saveData(stats, "stats_5")
        }
        if (prevState.tags !== tags) {
            saveData(tags, "tags")
        }
        // Uncredit bonus stars on "mark uncomplete"
        const prevTasksCompleted = Object.keys(prevState.stats.tasksCompleted).length
        const tasksCompleted = Object.keys(stats.tasksCompleted).length
        if (tasksCompleted < prevTasksCompleted) {
            if (prevTasksCompleted % 10 === 0) {
                let revisedStats = this.clone(stats)
                revisedStats.bonusStars -= 2
                console.log("Stars are being removed..")
                this.setState({
                    stats: revisedStats
                })
            }
        }
    }

    componentDidMount() {
        this.hideEditPanels()
        this.sortItems()
        console.log(this.state)
        this.notify("You got this! 😊", "custom", 2000, this.notifyStyle)
    }

    clone = (object) => {
        return JSON.parse(JSON.stringify(object))
    }

    addItem = (newItem) => {
        const { selectedSort } = this.state
        let tasks = this.clone(this.state.tasks)
        tasks = [...tasks, newItem]
        tasks = this.sortItemsBy(tasks, selectedSort)
        this.setState({
            tasks: tasks,
            buttonDisabled: true
        })
    }

    markComplete = (index, undo) => {
        let tasks = this.clone(this.state.tasks)
        let stats = this.clone(this.state.stats)
        const task = tasks[index]
        if (tasks.length === 0) {
            console.log("List is empty")
        } else {
            try {
                const itemIsActive = task.active
                if (itemIsActive) {
                    task.active = false
                    stats.tasksCompleted[task.id] = {
                        timeCreated: task.timeCreated,
                        timeCompleted: Date.now()
                    }
                    this.setState({
                        tasks: tasks,
                        stats: stats
                    })
                    const tasksCompleted = Object.keys(stats.tasksCompleted).length
                    if (tasksCompleted % 5 === 0) {
                        setTimeout(() => {
                            this.notify(randomMessage(), "custom", 2000, this.notifyStyle)
                        }, 500)
                    }
                    if (tasksCompleted % 10 === 0) {
                        setTimeout(() => {
                            this.notify("⭐+2 STARS BONUS⭐", "custom", 2000, { background: "#fff5be", text: "#000000" })
                            stats.bonusStars += 2
                            this.setState({
                                stats: stats
                            })
                        }, 500)
                    }
                } else if (undo) {
                    task.editPanelHidden = true
                    task.active = true
                    delete stats.tasksCompleted[task.id]
                    this.setState({
                        tasks: tasks,
                        stats: stats
                    })
                } else {
                    this.deleteItem(index)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    deleteItem = (key) => {
        let tasks = this.clone(this.state.tasks)
        tasks = tasks.filter((item, index) =>
            index !== key
        )
        this.setState({
            tasks: tasks
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
        let tasks = this.clone(this.state.tasks)
        const task = tasks[index]
        const selectedPriority = event.target.value
        task.priority = this.convertPriority(selectedPriority)
        task.editPanelHidden = true
        tasks = this.sortItemsBy(tasks, selectedSort)
        this.setState({
            tasks: tasks
        })
    }

    editDate = (event, index) => {
        const { selectedSort } = this.state
        let tasks = this.clone(this.state.tasks)
        const newDate = event.target.value
        tasks[index].dateDue = convertDate(newDate, "timestamp")
        tasks[index].editPanelHidden = true
        tasks = this.sortItemsBy(tasks, selectedSort)
        this.setState({
            tasks: tasks
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

    toggleItems = (tasks, type, tag) => {
        let tasksCopy = this.clone(tasks)
        if (type === "selected tag") {
            tasksCopy.forEach(task => (task.tag !== tag) && (task.hidden = true))
        } else if (type === "tags only") {
            tasksCopy.forEach(task => (task.tag === null) && (task.hidden = true))
        } else if (type === "show all") {
            tasksCopy.forEach(task => (task.hidden === true) && (task.hidden = false))
        }
        return tasksCopy
    }

    sortItemsBy = (tasks, selectedSort, moveFrom) => {
        const showAll = this.toggleItems(tasks, "show all")
        if (selectedSort === "Manual") {
            const moveTo = moveFrom - 1
            return tasks = this.props.arrayMove(tasks, moveFrom, moveTo)
            //return tasks.sort(firstBy("active", -1))
        }
        if (selectedSort === "None") {
            return showAll
        } else if (selectedSort === "Priority") {
            tasks = showAll
            return tasks.sort(
                firstBy("active", -1)
                    .thenBy("priority")
                    .thenBy("dateDue")
                    .thenBy("task")
            )
        } else if (selectedSort === "Date Due") {
            tasks = showAll
            return tasks.sort(
                firstBy("active", -1)
                    .thenBy("dateDue")
                    .thenBy("priority")
                    .thenBy("task")
            )
        } else if (selectedSort === "A-Z") {
            tasks = showAll
            return tasks.sort(
                firstBy("active", -1)
                    .thenBy("task")
            )
        } else if (selectedSort === "Tags") {
            tasks = showAll
            tasks = this.toggleItems(tasks, "tags only")
            return tasks.sort(
                firstBy("tag")
                    .thenBy("priority")
                    .thenBy("dateDue")
                    .thenBy("task")
            )
        } else if (selectedSort === "Selected Tag") {
            tasks = this.toggleItems(tasks, "selected tag", this.state.selectedTag)
            return tasks.sort(
                firstBy("tag")
                    .thenBy("priority")
                    .thenBy("dateDue")
                    .thenBy("task")
            )
        } else if (selectedSort === "toggle inactive") {
            return tasks.sort(firstBy("active", -1))
        }
    }

    sortItems = (index, manual) => {
        let tasks = this.clone(this.state.tasks)
        const selectedSort = this.selectSortBy.current.value
        if (manual) {
            if (selectedSort === "None") {
                tasks = this.sortItemsBy(tasks, "Manual", index)
                this.setState({
                    tasks: tasks
                })
            } else {
                tasks = this.sortItemsBy(tasks, "Manual", index)
                this.setState({
                    tasks: tasks,
                    selectedSort: "None"
                })
            }
        } else {
            if (selectedSort === "None") {
                tasks = this.sortItemsBy(tasks, selectedSort)
                this.setState({
                    tasks: tasks,
                    selectedSort: selectedSort
                })
            } else {
                tasks = this.sortItemsBy(tasks, selectedSort)
                this.setState({
                    tasks: tasks,
                    selectedSort: selectedSort
                })
            }
        }
    }

    toggleEditItem = (index) => {
        let tasks = this.clone(this.state.tasks)
        const targetTask = tasks[index]
        const targetPanelState = targetTask.editPanelHidden
        tasks.forEach((task) => {
            if (task.editPanelHidden === false && task !== targetTask) {
                task.editPanelHidden = true
            }
        })
        tasks[index].editPanelHidden = !targetPanelState
        this.setState({
            tasks: tasks,
            editTaskText: targetTask.text
        })
    }

    changeDate = (event) => {
        const updateDate = event.target.value
        this.setState({
            selectedDate: updateDate
        })
    }

    changeColor = (event, selectedColor) => {
        let settings = this.clone(this.state.settings)
        settings.style[selectedColor] = event.target.value
        this.setState({
            settings: settings,
            selectedStyle: "None"
        })
    }

    toggleSettings = () => {
        this.setState(state => ({
            settingsHidden: false,
            showModal: !state.showModal
        }))
    }

    toggleStats = () => {
        this.setState(state => ({
            statsHidden: false,
            showModal: !state.showModal
        }))
    }

    changeStyle = (event) => {
        let settings = this.clone(this.state.settings)
        const selectedStyle = event.target.value
        const style = settings.style
        if (style === "None") {
            this.setState({
                selectedStyle: selectedStyle
            })
        } else {
            style.colorLow = this.styles[selectedStyle][0]
            style.colorMedium = this.styles[selectedStyle][1]
            style.colorHigh = this.styles[selectedStyle][2]
            style.backgroundColor = this.styles[selectedStyle][3]
            this.setState({
                settings: settings,
                selectedStyle: selectedStyle
            })
        }
    }

    changeTag = (event) => {
        const { selectedSort } = this.state
        let tasks = this.clone(this.state.tasks)
        const tag = event.target.value
        if (selectedSort === "Selected Tag") {
            this.toggleItems(tasks, "show all")
            this.toggleItems(tasks, "selected tag", tag)
            this.setState({
                tasks: tasks,
                selectedTag: tag
            })
        } else {
            this.setState({
                selectedTag: tag
            })
        }
    }

    addTag = () => {
        let tags = this.clone(this.state.tags)
        const newTag = prompt("Enter a new tag")
        if (newTag === "" || tags.includes(newTag)) {
            alert("Invalid tag or duplicate")
        } else {
            tags = [...tags, newTag]
            this.setState({
                tags: tags,
                selectedTag: newTag
            })
        }
    }

    removeTag = () => {
        const { selectedTag } = this.state
        let tags = this.clone(this.state.tags)
        tags = tags.filter(tag => tag !== selectedTag || tag === "None")
        this.setState({
            tags: tags,
            selectedTag: "None"
        })
    }

    editText = (event, index) => {
        event.stopPropagation()
        let tasks = this.clone(this.state.tasks)
        tasks[index].text = this.state.editTaskText
        tasks[index].editPanelHidden = true
        this.setState({
            tasks: tasks
        })
    }

    handleTextChange = (event) => {
        const currentText = event.target.value
        this.setState({
            editTaskText: currentText
        })
    }

    hideEditPanels = () => {
        const { tasks } = this.state
        tasks.forEach(task => (task.editPanelHidden === false) && (task.editPanelHidden = true))
    }

    toggleInactiveTasks = () => {
        let tasks = this.clone(this.state.tasks)
        let settings = this.clone(this.state.settings)
        settings.hideInactive = !settings.hideInactive
        tasks = this.sortItemsBy(tasks, "toggle inactive")
        this.setState({
            tasks: tasks,
            settings: settings
        })
    }

    toggleModal = () => {
        this.setState(state => ({
            showModal: !state.showModal,
            settingsHidden: true,
            statsHidden: true
        }))
    }

    render() {
        const { tasks, settings, stats, tags, buttonDisabled, selectedPriority, selectedDate, selectedTag, selectedSort, settingsHidden, statsHidden, selectedStyle, showModal } = this.state
        const { convertDate, articulateDateDue } = this.props
        document.body.style.backgroundColor = settings.style.backgroundColor
        return (
            <Container>
                <Notifications />
                <Modal isOpen={showModal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        {(settingsHidden) ? "Stats" : "Settings"}
                    </ModalHeader>
                    <ModalBody>
                        <Settings
                            settings={settings}
                            settingsHidden={settingsHidden}
                            selectedStyle={selectedStyle}
                            changeStyle={this.changeStyle}
                            changeColor={this.changeColor}
                            toggleInactiveTasks={this.toggleInactiveTasks}
                        />
                        <Stats
                            stats={stats}
                            statsHidden={statsHidden}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>OK</Button>
                    </ModalFooter>
                </Modal>
                <Row>
                    <Col className="todo" sm="10" md="7" lg="5" xl="5">
                        <AddTask
                            tasks={tasks}
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
                                    {tags.map((tag, index) =>
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
                                {tasks.map((task, index) =>
                                    (task.hidden) ?
                                        null :
                                        (!task.active && settings.hideInactive) ?
                                            null :
                                            <CSSTransition
                                                key={task.id}
                                                timeout={500}
                                                classNames="fade">
                                                <ListItem
                                                    tasks={tasks}
                                                    settings={settings}
                                                    task={task}
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
                                outline
                                color="secondary"
                                onClick={this.toggleSettings}
                            >
                                {"⚙"}
                            </Button>
                            <Button
                                className="stats-button"
                                outline
                                color="secondary"
                                onClick={this.toggleStats}
                            >
                                {"★"}
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