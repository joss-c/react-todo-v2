import React from 'react'
import { Input, Button } from 'reactstrap'

export const Tags = (props) => {
    const { tags, selectedTag, changeTag, addTag, removeTag, showButtons } = props
    return (
        <React.Fragment>
            <Input 
                type='select'
                className='select-tag'
                value={selectedTag}
                onChange={changeTag}
            >
                {tags.map((tag, index) => <option key={index} value={tag}>
                    {(tag === 'None') ? 'Tag: None' : tag}
                </option>)}
            </Input>
            {(!showButtons) ? null :
                <React.Fragment>
                    <Button
                        outline
                        color='secondary'
                        size='sm'
                        onClick={removeTag}
                    >
                        {"-"}
                    </Button>
                    <Button
                        outline
                        color='secondary'
                        size='sm'
                        onClick={addTag}
                    >
                        {"+"}
                    </Button>
                </React.Fragment>
            }
        </React.Fragment>
    )
}