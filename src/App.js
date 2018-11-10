import React, { Component } from 'react';
import { convertDate, articulateDateDue, arrayMove } from './functions'
import ToDo from './ToDo'
import './App.css';

class App extends Component {
    render() {
        const tasks = localStorage.getItem("tasks")
        const settings = localStorage.getItem("settings")
        const stats = localStorage.getItem("stats_5")
        const saveData = (data, fileName) => localStorage.setItem(fileName, JSON.stringify(data))
        return (
            <ToDo
                tasks={tasks}
                settings={settings}
                stats={stats}
                saveData={saveData}
                convertDate={convertDate}
                articulateDateDue={articulateDateDue}
                arrayMove={arrayMove}
            />
        )
    }
}

export default App;
