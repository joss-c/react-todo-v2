import React, { Component } from 'react';
import { convertDate, articulateDateDue, arrayMove } from './functions'
import ToDo from './ToDo'
import './App.css';

class App extends Component {
    render() {
        const tasks = localStorage.getItem('tasks_3b')
        const inventory = localStorage.getItem('inventory_3')
        const settings = localStorage.getItem('settings_2')
        const stats = localStorage.getItem('stats_10')
        const tags = localStorage.getItem('tags_2')
        const saveData = (data, fileName) => localStorage.setItem(fileName, JSON.stringify(data))
        return (
            <ToDo
                tasks={tasks}
                inventory={inventory}
                settings={settings}
                stats={stats}
                tags={tags}
                saveData={saveData}
                convertDate={convertDate}
                articulateDateDue={articulateDateDue}
                arrayMove={arrayMove}
            />
        )
    }
}

export default App;
