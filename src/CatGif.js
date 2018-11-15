import React, { Component } from 'react'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

export class CatGif extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true }
    }

    componentDidMount() {
        axios.get('https://api.thecatapi.com/v1/images/search?limit=1&mime_types=gif&format=json&order=RANDOM', {
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

    render() {
        const { loading, gif } = this.state
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
                <div className='align-center'>
                    <img
                        style={{ width: '280px' }}
                        src={gif[0].url}
                        alt="This should be a cat gif..."
                    />
                </div>
        )
    }
}