import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Notifications, { notify } from 'react-notify-toast'
import uuid from 'uuid'
import { convertDate, getDate, countDays, articulateDateDue, arrayMove } from './functions'
import { randomMessage } from './randomMessage'
import { firstBy } from './thenBy.min.js'
import { Container, Row, Col, Input, Button } from 'reactstrap'
import { Stats } from './Stats'
import { Calendar } from './Calendar'
import { Shop } from './Shop'
import { AddTask } from './AddTask'
import { CustomModal } from './CustomModal'
import { Priority } from './Priority'
import { List } from './List'
import { Settings } from './Settings'
import { Task } from './Task'
import { Tags } from './Tags'

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
                    dateDue: getDate('today'),
                    tag: 'None'
                }],
            inventory: (this.props.inventory) ? JSON.parse(this.props.inventory) :
                {
                    catGifs: []
                },
            settings: (this.props.settings) ? JSON.parse(this.props.settings) :
                {
                    style: {
                        colorHigh: '#f5c6cb',
                        colorMedium: '#ffeeba',
                        colorLow: '#bee5eb',
                        backgroundColor: '#ffffff',
                        font: ''
                    },
                    hideInactive: false
                },
            stats: (this.props.stats) ? JSON.parse(this.props.stats) :
                {
                    tasksCompleted: {},
                    bonusStars: 0,
                    starsUsed: 0,
                    daysAppUsed: [],
                    consecutiveDaysUsed: 0,
                },
            modals: {
                settingsModal: false,
                statsModal: false,
                shopModal: false
            },
            tags: (this.props.tags) ? JSON.parse(this.props.tags) : ['None'],
            buttonDisabled: true,
            selectedPriority: 'Low',
            selectedSort: 'None',
            selectedDate: this.props.convertDate(Date.now(), 'ISO'),
            selectedStyle: 'None',
            selectedTag: 'None',
            editTaskText: '',
        }
        this.selectSortBy = React.createRef()
        this.notify = notify.createShowQueue()
        this.styles = {
            Default: ['#bee5eb', '#ffeeba', '#f5c6cb', '#ffffff'],
            Marie: ['#fce8f7', '#f2b5e2', '#f46ed0', '#ffffff'],
            Halloween: ['#feeeb8', '#ffa100', '#e76427', '#000000']
        }
        this.notifyStyle = { background: '#007bff', text: '#ffffff' }
    }

    componentDidMount() {
        this.hideEditPanels()
        this.sortItems()
        console.log(this.state)
        this.notify("You got this! 😊", 'custom', 2000, this.notifyStyle)
    }

    componentDidUpdate(prevProps, prevState) {
        const { tasks, inventory, settings, stats, tags } = this.state
        const { saveData } = this.props
        console.log(this.state)
        if (prevState.tasks !== tasks) {
            saveData(tasks, 'tasks')
        }
        if (prevState.inventory !== inventory) {
            saveData(inventory, 'inventory_3')
        }
        if (prevState.settings !== settings) {
            saveData(settings, 'settings')
        }
        if (prevState.stats !== stats) {
            saveData(stats, 'stats_9')
        }
        if (prevState.tags !== tags) {
            saveData(tags, 'tags_2')
        }
        // Uncredit bonus stars on 'mark uncomplete'
        const prevTasksCompleted = Object.keys(prevState.stats.tasksCompleted).length
        const tasksCompleted = Object.keys(stats.tasksCompleted).length
        if (tasksCompleted < prevTasksCompleted) {
            if (prevTasksCompleted % 10 === 0) {
                let revisedStats = this.clone(stats)
                revisedStats.bonusStars -= 2
                console.log("Stars are being removed..")
                this.setState({ stats: revisedStats })
            }
        }
        // Log current day in stats as timestamp
        const logAppUsage = (() => {
            const today = this.props.getDate("today")
            let stats = this.clone(this.state.stats)
            let { daysAppUsed } = stats
            const lastLoggedDay = daysAppUsed[daysAppUsed.length-1]
            if (lastLoggedDay !== today) {
                daysAppUsed.push(today)
                // Count consecutive days app used
                stats.consecutiveDaysUsed = this.props.countDays(daysAppUsed, daysAppUsed.length-1, 0) + 1
                console.log("Logging present-day timestamp to stats")
                this.setState({ stats: stats })
            }
        })()
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
            console.log('List is empty')
        } else {
            try {
                const itemIsActive = task.active
                if (itemIsActive) {
                    task.active = false
                    stats.tasksCompleted[task.id] = {
                        timeCreated: task.timeCreated,
                        timeCompleted: Date.now()
                    }
                    if (this.state.settings.hideInactive) {
                        tasks = this.sortItemsBy(tasks, 'active')
                    }
                    this.setState({
                        tasks: tasks,
                        stats: stats
                    })
                    // Stars stuff
                    const tasksCompleted = Object.keys(stats.tasksCompleted).length
                    if (tasksCompleted % 5 === 0) {
                        setTimeout(() => {
                            this.notify(randomMessage(), 'custom', 2000, this.notifyStyle)
                        }, 500)
                    }
                    if (tasksCompleted % 10 === 0) {
                        setTimeout(() => {
                            this.notify(
                                '⭐+2 STARS BONUS⭐', 
                                'custom', 
                                2000, 
                                { background: '#fff5be', text: '#000000' }
                            )
                            stats.bonusStars += 2
                            this.setState({ stats: stats })
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
        tasks = tasks.filter((item, index) => index !== key)
        this.setState({ tasks: tasks })
    }

    changePriority = (event) => {
        const selectedPriority = event.target.value
        this.setState({ selectedPriority: selectedPriority })
    }

    convertPriority = (priority) => {
        if (typeof priority === 'string') {
            return (priority === 'Low') ? 3
                : (priority === 'Medium') ? 2
                    : 1
        } else {
            return (priority === 3) ? 'Low'
                : (priority === 2) ? 'Medium'
                    : 'High'
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
        this.setState({ tasks: tasks })
    }

    editDate = (event, index) => {
        const { selectedSort } = this.state
        let tasks = this.clone(this.state.tasks)
        const newDate = event.target.value
        tasks[index].dateDue = convertDate(newDate, 'timestamp')
        tasks[index].editPanelHidden = true
        tasks = this.sortItemsBy(tasks, selectedSort)
        this.setState({ tasks: tasks })
    }

    inputChange = (event) => {
        const currentText = event.target.value
        if (currentText === '') {
            this.setState({ buttonDisabled: true })
        } else {
            this.setState({ buttonDisabled: false })
        }
    }

    toggleItems = (tasks, type, tag) => {
        let tasksCopy = this.clone(tasks)
        if (type === 'selected tag') {
            tasksCopy.forEach(task => (task.tag !== tag || task.tag === 'None') && (task.hidden = true))
        } else if (type === 'tags only') {
            tasksCopy.forEach(task => (task.tag === 'None') && (task.hidden = true))
        } else if (type === 'show all') {
            tasksCopy.forEach(task => (task.hidden === true) && (task.hidden = false))
        }
        return tasksCopy
    }

    sortItemsBy = (tasks, selectedSort, moveFrom) => {
        const showAll = this.toggleItems(tasks, 'show all')
        if (selectedSort === 'Manual') {
            const moveTo = moveFrom - 1
            tasks = this.props.arrayMove(tasks, moveFrom, moveTo)
            if (this.state.settings.hideInactive) {
                tasks = this.sortItemsBy(tasks, 'active')
            }
            return tasks
        }
        if (selectedSort === 'None') {
            return showAll
        } else if (selectedSort === 'Priority') {
            tasks = showAll
            return tasks.sort(
                firstBy('active', -1)
                    .thenBy('priority')
                    .thenBy('dateDue')
                    .thenBy('text')
            )
        } else if (selectedSort === 'Date Due') {
            tasks = showAll
            return tasks.sort(
                firstBy('active', -1)
                    .thenBy('dateDue')
                    .thenBy('priority')
                    .thenBy('text')
            )
        } else if (selectedSort === 'A-Z') {
            tasks = showAll
            return tasks.sort(
                firstBy('active', -1)
                    .thenBy('text')
            )
        } else if (selectedSort === 'Tags') {
            tasks = showAll
            tasks = this.toggleItems(tasks, 'tags only')
            return tasks.sort(
                firstBy('tag')
                    .thenBy('priority')
                    .thenBy('dateDue')
                    .thenBy('text')
            )
        } else if (selectedSort === 'Selected Tag') {
            tasks = this.toggleItems(tasks, 'selected tag', this.state.selectedTag)
            return tasks.sort(
                firstBy('tag')
                    .thenBy('priority')
                    .thenBy('dateDue')
                    .thenBy('text')
            )
        } else if (selectedSort === 'active') {
            return tasks.sort(firstBy('active', -1))
        }
    }

    sortItems = (index, manual) => {
        let tasks = this.clone(this.state.tasks)
        const selectedSort = this.selectSortBy.current.value
        if (manual) {
            if (selectedSort === 'None') {
                console.log("correct")
                tasks = this.sortItemsBy(tasks, 'Manual', index)
                this.setState({ tasks: tasks })
            } else {
                tasks = this.sortItemsBy(tasks, 'Manual', index)
                this.setState({
                    tasks: tasks,
                    selectedSort: 'None'
                })
            }
        } else {
            if (selectedSort === 'None') {
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
        this.setState({ selectedDate: updateDate })
    }

    changeColor = (event, selectedColor) => {
        let settings = this.clone(this.state.settings)
        settings.style[selectedColor] = event.target.value
        this.setState({
            settings: settings,
            selectedStyle: 'None'
        })
    }

    changeStyle = (event) => {
        let settings = this.clone(this.state.settings)
        const selectedStyle = event.target.value
        const style = settings.style
        if (style === 'None') {
            this.setState({ selectedStyle: selectedStyle })
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
        if (selectedSort === 'Selected Tag') {
            tasks = this.toggleItems(tasks, 'show all')
            tasks = this.toggleItems(tasks, 'selected tag', tag)
            this.setState({
                tasks: tasks,
                selectedTag: tag
            })
        } else {
            this.setState({ selectedTag: tag })
        }
    }

    addTag = () => {
        let tags = this.clone(this.state.tags)
        const newTag = prompt("Enter a new tag")
        if (newTag === '' || tags.includes(newTag)) {
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
        tags = tags.filter(tag => tag !== selectedTag || tag === 'None')
        this.setState({
            tags: tags,
            selectedTag: 'None'
        })
    }

    editTaskTag = (event, index) => {
        const { selectedSort } = this.state
        let tasks = this.clone(this.state.tasks)
        let task = tasks[index]
        task.tag = event.target.value
        task.editPanelHidden = true
        tasks = this.sortItemsBy(tasks, selectedSort)
        this.setState({ tasks: tasks })
    }

    editText = (event, index) => {
        event.stopPropagation()
        let tasks = this.clone(this.state.tasks)
        tasks[index].text = this.state.editTaskText
        tasks[index].editPanelHidden = true
        this.setState({ tasks: tasks })
    }

    handleTextChange = (event) => {
        const currentText = event.target.value
        this.setState({ editTaskText: currentText })
    }

    hideEditPanels = () => {
        const { tasks } = this.state
        tasks.forEach(task => (task.editPanelHidden === false) && (task.editPanelHidden = true))
    }

    toggleInactiveTasks = () => {
        let tasks = this.clone(this.state.tasks)
        let settings = this.clone(this.state.settings)
        settings.hideInactive = !settings.hideInactive
        tasks = this.sortItemsBy(tasks, 'active')
        this.setState({
            tasks: tasks,
            settings: settings
        })
    }

    toggleModal = (modalType) => {
        let modals = this.clone(this.state.modals)
        modals[modalType] = !modals[modalType]
        this.setState({ modals: modals })
    }

    deductStars = (stars) => {
        let stats = this.clone(this.state.stats)
        stats.starsUsed += stars
        this.setState({ stats: stats })
    }

    saveKitty = (kitty) => {
        let inventory = this.clone(this.state.inventory)
        inventory.catGifs = [...inventory.catGifs, kitty]
        this.setState({ inventory: inventory })
    }

    deleteKitty = (kitty) => {
        let inventory = this.clone(this.state.inventory)
        inventory.catGifs = inventory.catGifs.filter((item, index) => index !== kitty)
        this.setState({ inventory: inventory })
    }

    render() {
        const {
            tasks,
            inventory,
            settings,
            stats,
            tags,
            buttonDisabled,
            selectedPriority,
            selectedDate,
            selectedTag,
            selectedSort,
            selectedStyle,
            modals
        } = this.state
        const {
            convertDate,
            articulateDateDue
        } = this.props
        document.body.style.backgroundColor = settings.style.backgroundColor
        return (
            <Container>
                <Notifications />
                <Row>
                    <Col className='todo' sm='10' md='7' lg='5' xl='5'>
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
                        <Row className='row-1 no-gutters'>
                            <Col>
                                <div className='calendar'>
                                    <Calendar
                                        value={selectedDate}
                                        handleOnChange={this.changeDate}
                                        convertDate={convertDate} />
                                </div>
                            </Col>
                            <Col>
                                <div className='priority--top'>
                                    <Priority
                                        value={selectedPriority}
                                        handleOnChange={this.changePriority} />
                                </div>
                            </Col>
                        </Row>
                        <Row className='row-2 no-gutters'>
                            <Col
                                className='sort padding-right'
                                xs='5'>
                                <Input
                                    type='select'
                                    className='select-sort'
                                    value={selectedSort}
                                    innerRef={this.selectSortBy}
                                    onChange={this.sortItems}
                                >
                                    <option value='None'>Sort: None</option>
                                    <option value='Priority'>Priority</option>
                                    <option value='Date Due'>Date Due</option>
                                    <option value='A-Z'>A-Z</option>
                                    <option value='Tags'>Tags</option>
                                    <option value='Selected Tag'>Selected Tag</option>
                                </Input>
                            </Col>
                            <Col
                                className='manage-tags'
                                xs='7'
                            >
                                <Tags
                                    tags={tags}
                                    selectedTag={selectedTag}
                                    changeTag={this.changeTag}
                                    addTag={this.addTag}
                                    removeTag={this.removeTag}
                                    showButtons
                                />
                            </Col>
                        </Row>
                        <List className='list'>
                            <TransitionGroup>
                                {tasks.map((task, index) =>
                                    (task.hidden) ?
                                        null :
                                        (!task.active && settings.hideInactive) ?
                                            null :
                                            <CSSTransition
                                                key={task.id}
                                                timeout={500}
                                                classNames='fade'
                                            >
                                                <Task
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
                                                    editPriority={this.editPriority}
                                                    tags={tags}
                                                    editTaskTag={this.editTaskTag}
                                                    addTag={this.addTag}
                                                    removeTag={this.removeTag}
                                                />
                                            </CSSTransition>
                                )}
                            </TransitionGroup>
                        </List>
                        <Row className='row-3 no-gutters'>
                            <Button
                                className='settings-button'
                                outline
                                color='secondary'
                                onClick={() => this.toggleModal('settingsModal')}
                            >
                                {"⚙"}
                            </Button>
                            <Button
                                className='stats-button'
                                outline
                                color='secondary'
                                onClick={() => this.toggleModal('statsModal')}
                            >
                                {"⭐"}
                            </Button>
                            <Button
                                className='cat-button'
                                outline
                                color='secondary'
                                onClick={() => this.toggleModal('shopModal')}
                            >
                                {"🐱"}
                            </Button>
                        </Row>
                        <Row className='settings no-gutters'>
                        </Row>
                    </Col>
                </Row>
                <CustomModal
                    isOpen={modals.settingsModal}
                    modalType='settingsModal'
                    header="Settings"
                    toggleModal={this.toggleModal}
                >
                    <Settings
                        settings={settings}
                        selectedStyle={selectedStyle}
                        changeStyle={this.changeStyle}
                        changeColor={this.changeColor}
                        toggleInactiveTasks={this.toggleInactiveTasks}
                    />
                </CustomModal>
                <CustomModal
                    className='rainbow-background'
                    isOpen={modals.statsModal}
                    modalType='statsModal'
                    header="Stats"
                    toggleModal={this.toggleModal}
                >
                    <Stats
                        stats={stats}
                    />
                </CustomModal>
                <CustomModal
                    isOpen={modals.shopModal}
                    modalType='shopModal'
                    header="Le Catte Gif Shoppe"
                    toggleModal={this.toggleModal}
                >
                    <Shop
                        stats={stats}
                        inventory={inventory}
                        saveKitty={this.saveKitty}
                        deleteKitty={this.deleteKitty}
                        deductStars={this.deductStars}
                    />
                </CustomModal>
            </Container>
        )
    }
}

ToDo.defaultProps = {
    convertDate: convertDate,
    getDate: getDate,
    countDays: countDays,
    articulateDateDue: articulateDateDue,
    arrayMove: arrayMove
}

export default ToDo