import React from 'react'
import { Input } from 'reactstrap'

export const Priority = ({ handleOnChange, value }) => {
    return (
        <React.Fragment>
            <Input
                type='select'
                className='priority-element'
                value={value}
                onChange={handleOnChange}
            >
                <option value='Low'>Priority: Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
            </Input>
        </React.Fragment>
    )
}