import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import TextareaAutosize from 'react-autosize-textarea'
import uuid from 'uuid'
import { convertDate, articulateDateDue, arrayMove } from './functions'
import { firstBy } from './thenBy.min.js'

const Calendar = ({ handleOnChange, value, convertDate }) =>
    <span>
        <input
            className="calendar-element"
            onChange={handleOnChange}
            type="date"
            value={value}
            min={convertDate(Date.now(), "ISO")}
            max="2019-12-31"
        />
    </span>

const Priority = ({ handleOnChange, value }) =>
    <span>
        <select className="priority-element" value={value} onChange={handleOnChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
    </span>

const List = (props) =>
    <div className="list">
        <ul>
            {props.children}
        </ul>
    </div>

const ListItem = (props) =>
    <React.Fragment>
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
        <ItemButtons 
            item={props.item} 
            index={props.index} 
            markComplete={props.markComplete}
             sortItems={props.sortItems} />
        <ItemEditBox 
            item={props.item} 
            index={props.index}
            markComplete={props.markComplete}>
            <Calendar
                value={props.convertDate(props.item.dateDue, "ISO")}
                handleOnChange={(event) => props.editDate(event, props.index)} 
                convertDate={props.convertDate} />
            <div className="priority--edit">
                <Priority 
                    value={props.convertPriority(props.item.priority)} 
                    handleOnChange={(event) => props.editPriority(event, props.index)} />
            </div>
        </ItemEditBox>
    </React.Fragment>


const Task = ({ data, item, index, toggleEditItem, handleTextChange, editText, children }) =>
    <li
        onClick={() => toggleEditItem(index)}
        style={{
            backgroundColor:
                (!item.active) ?
                    "#e5e5e5" :
                    (item.priority === 3) ?
                        data.settings.style.colorLow :
                        (item.priority === 2) ?
                            data.settings.style.colorMedium :
                            data.settings.style.colorHigh }}>
        <span className="task"
            style={{
                textDecorationLine:
                    (item.active) ?
                        "none" :
                        "line-through" }}>
            {(item.editPanelHidden) ?
                item.task :
                <span className="edit-text">
                    <TextareaAutosize
                        className="edit-text-element"
                        onChange={(event) => handleTextChange(event)}
                        onClick={(event) => event.stopPropagation()}
                        defaultValue={item.task} />
                    <button className="edit-text-button" onClick={() => editText(index)}>OK</button>
                </span>
            }
        </span>
        <span className="instance">
            {(item.instance > 1) ?
                ` (${item.instance})` :
                null}
        </span>
        {children}
    </li>

const TaskDetails = ({ item, articulateDateDue }) =>
    <span className="date-due">
        {(item.tag === null) ?
            null :
            <span className="tag">{item.tag}</span>}
        {(item.active) ?
            `Due: ${articulateDateDue(item.dateDue)}` :
            "Complete"}
    </span>

const ItemButtons = ({ item, index, markComplete, sortItems }) =>
    <div className="item-buttons">
        <div className="deleteItem" onClick={() => markComplete(index)}>
            {(item.active) ? "✓" : "✕"}
        </div>
        <div className="sort-button" onClick={() => sortItems(index, true)}>↑</div>
    </div>

const ItemEditBox = ({ item, index, markComplete, children }) =>
    <li className="edit-task" hidden={item.editPanelHidden}>
        <span hidden={!item.active}>
            <label>Edit Date: </label>
            {children}
        </span>
        <div className="undo">
            <button hidden={item.active} className="undo-button" onClick={() => markComplete(index, true)}>Undo "Mark Complete"</button>
        </div>
    </li>

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
            id: uuid().substring(0, 8),
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
            <form onSubmit={this.createItem}>
                <input className="input--add-task" onChange={inputChange} ref={this.inputElement}
                    placeholder="Enter Task">
                </input>
                <button className="add-button" disabled={buttonDisabled} type="submit">Add</button>
            </form>
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
        this.dropdownSortBy = React.createRef()
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
        const selectedSort = this.dropdownSortBy.current.value
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
            <div className="todo">
                <div className="add-task">
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
                </div>
                <div className="row-1">
                    <div className="calendar">
                        <label>Due: </label>
                        <Calendar value={selectedDate} handleOnChange={this.changeDate} convertDate={convertDate} />
                    </div>
                    <div className="priority--top">
                        <label>Priority: </label>
                        <Priority value={selectedPriority} handleOnChange={this.changePriority} />
                    </div>
                </div>
                <div className="row-2">
                    <div className="sort">
                        <span>Sort by: </span>
                        <select value={selectedSort} ref={this.dropdownSortBy} onChange={this.sortItems}>
                            <option value="None">None</option>
                            <option value="Priority">Priority</option>
                            <option value="Date Due">Date Due</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Tags">Tags</option>
                            <option value="Selected Tag">Selected Tag</option>
                        </select>
                    </div>
                    <div className="settings-button">
                        <div onClick={this.toggleSettings}>⚙</div>
                    </div>
                    <div className="tag-dropdown">
                        <span>Tag: </span>
                        <select value={selectedTag} onChange={this.changeTag}>
                            {this.state.data.tags.map((tag, index) =>
                                <option key={index} value={tag}>{tag}</option>
                            )}
                        </select>
                        <button onClick={this.removeTag}>-</button>
                        <button onClick={this.addTag}>+</button>
                    </div>
                </div>
                <List>
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
            </div>
        )
    }
}

ToDo.defaultProps = {
    convertDate: convertDate,
    articulateDateDue: articulateDateDue,
    arrayMove: arrayMove
}

export default ToDo