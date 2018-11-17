import React, { Component } from 'react'
import axios from 'axios'
import { Button, Card, CardTitle } from 'reactstrap'
import { ClipLoader } from 'react-spinners'

export class CatGif extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            loading: true,
            saveButtonClicked: false
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://api.thecatapi.com/v1/images/search?limit=1&mime_types=gif&format=json&order=RANDOM',
            headers: { 'x-api-key': 'f5568fae-d85b-4310-8e88-cb282e0e2bac' },
            timeout: 20000 
        })
            .then(response => {
                const gif = response.data
                console.log(gif[0].url)
                this.setState({
                    loading: false,
                    gif
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    handleSave = (kitty) => {
        this.props.saveKitty(kitty)
        this.setState({ saveButtonClicked: true })
    }

    render() {
        const { loading, gif, saveButtonClicked } = this.state
        return (
            (loading) ?
                <div className='align-center'>
                    <ClipLoader
                        color='#007bff'
                        sizeUnit='px'
                        size={50}
                        loading={loading}
                    />
                </div>
                :
                <Card body className='text-center'>
                    <CardTitle>{"Here's your kitty! ♥"}</CardTitle>
                    <div className='align-center margin-bottom-5'>
                        <img
                            className='rounded-border'
                            style={{ width: '100%' }}
                            src={gif[0].url}
                            alt="This should be a cat gif..."
                        />
                    </div>
                    <Button
                        onClick={() => this.handleSave(gif[0].url)}
                        color={(saveButtonClicked) ? 'success' : 'info'}
                        disabled={saveButtonClicked}
                    >
                        {(saveButtonClicked) ? "Saved!" : "Save Kitty"}
                    </Button>
                </Card>

        )
    }
}