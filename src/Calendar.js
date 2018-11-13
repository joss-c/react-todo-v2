import React from 'react'
import { Input } from 'reactstrap'

export const Calendar = ({ handleOnChange, value, convertDate }) => {
    return (
        <React.Fragment>
            <Input 
                className="calendar-element"
                onChange={handleOnChange} type="date"
                value={value}
                min={convertDate(Date.now(), "ISO")}
                max="2019-12-31" />
        </React.Fragment>
    )
}
