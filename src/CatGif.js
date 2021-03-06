import React, { Component } from 'react'
import axios from 'axios'
import { Button, Card, CardTitle, CardHeader, Row, Col } from 'reactstrap'
import { ClipLoader } from 'react-spinners'
import { randomName } from './randomName'

export class CatGif extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            loading: true,
            saveButtonClicked: false,
            newKittyName: ''
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
                    newKittyName: randomName(),
                    gif
                })
            })
            .catch((error) => {
                alert(error)
            })
    }

    handleSave = (url) => {
        const kitty = {
            url: url,
            name: this.state.newKittyName,
            popoverOpen: false
        }
        this.props.saveKitty(kitty)
        this.setState({ saveButtonClicked: true })
    }

    render() {
        const { loading, gif, saveButtonClicked, newKittyName } = this.state
        const { hideCatGif } = this.props
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
                    <CardTitle>
                        <Row>
                            <Col className='align-left' xs='9'>
                                <CardTitle>
                                    {`Here's your new kitty! - ${newKittyName}`}
                                </CardTitle>
                            </Col>
                            <Col className='align-right' xs='3'>
                                <Button
                                    outline
                                    onClick={hideCatGif}
                                >
                                    {"X"}
                                </Button>
                            </Col>
                        </Row>
                    </CardTitle>
                    <div className='align-center margin-bottom-5 margin-top-5'>
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