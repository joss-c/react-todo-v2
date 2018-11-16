import React, { Component } from 'react'
import { Row, Col, Button, Badge, Collapse, Card } from 'reactstrap'
import { CatGif } from './CatGif'
import { CustomModal } from './CustomModal'

export class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showGif: false,
            buttonDisabled: false,
            savedKitties: false,
            innerModal: false,
            currentCatGif: ''
        }
    }

    buyGif = (stars) => {
        this.setState({
            showGif: true,
            buttonDisabled: true
        })
        this.props.deductStars(stars)
    }

    toggleSavedKitties = () => {
        this.setState({ savedKitties: !this.state.savedKitties })
    }

    toggleInnerModal = (gif) => {
        this.setState({
            innerModal: !this.state.innerModal,
            currentCatGif: gif
        })
    }

    render() {
        const { stats, inventory, saveKitty } = this.props
        const { buttonDisabled, savedKitties, innerModal, currentCatGif } = this.state
        const totalStars = Object.keys(stats.tasksCompleted).length + stats.bonusStars - stats.starsUsed
        return (
            <React.Fragment>
                <CustomModal
                    isOpen={innerModal}
                    toggleModal={this.toggleInnerModal}
                >
                    <img
                        style={{ width: '100%' }}
                        src={currentCatGif}
                        alt="This should be a cat gif.."
                    >
                    </img>
                </CustomModal>
                <Row>
                    <Col xs={{ offset: 8 }}>
                        <h4>
                            {"Stars "}<Badge color='primary'>{totalStars}</Badge>
                        </h4>
                    </Col>
                </Row>
                <Row className='margin-top-10'>
                    <Col
                        className='grey-background extra-padding curved-border'
                        xs={{ size: 10, offset: 1 }}
                    >
                        <span className='shop-items'>
                            {"1 x Cat Gif: "}
                        </span>
                        <Button
                            className='buy-button'
                            color='warning'
                            disabled={buttonDisabled || totalStars < 2}
                            onClick={() => this.buyGif(2)}
                        >
                            {'⭐2'}
                        </Button>
                    </Col>
                </Row>
                <div className='cat-gif'>
                    {(!this.state.showGif) ? null :
                        <CatGif saveKitty={saveKitty} />}
                </div>
                <Row>
                    <Col xs={{ offset: 2 }}>
                        <p></p>
                        <Button
                            onClick={this.toggleSavedKitties}
                        >
                            {"Saved Kitties"}
                        </Button>
                        <Collapse isOpen={savedKitties}>
                            {inventory.catGifs.map((gif, index) =>
                                <div key={index}>
                                    <Card>
                                        <Row>
                                            <Col>
                                                <span>{`Kitty ${index + 1}`}</span>
                                                <Button
                                                    id='Popover'
                                                    color='link'
                                                    onClick={() => this.toggleInnerModal(gif)}
                                                >
                                                    {"View"}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            )}
                        </Collapse>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}