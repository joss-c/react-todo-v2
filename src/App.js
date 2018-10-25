import React, { Component } from 'react';
import { convertDate, articulateDateDue, arrayMove } from './functions'
import ToDo from './ToDo'
import './App.css';

class App extends Component {
    render() {
        const dataFile = "data_3"
        const data = localStorage.getItem(dataFile)
        const saveData = (data) => localStorage.setItem(dataFile, JSON.stringify(data))
        return (
            <ToDo
                data={data}
                saveData={saveData}
                convertDate={convertDate}
                articulateDateDue={articulateDateDue}
                arrayMove={arrayMove}
            />
        )
    }
}

export default App;
