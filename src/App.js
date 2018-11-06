import React, { Component } from 'react';
import { convertDate, articulateDateDue, arrayMove } from './functions'
import ToDo from './ToDo'
import './App.css';

class App extends Component {
    render() {
        const data = localStorage.getItem("data_9")
        const stats = localStorage.getItem("stats_3")
        const saveData = (data, fileName) => localStorage.setItem(fileName, JSON.stringify(data))
        return (
            <ToDo
                data={data}
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
