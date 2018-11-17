import React, { Component } from 'react'
import {
    Row,
    Col,
    Button,
    Badge,
    Collapse,
    Card,
    CardHeader,
    CardBody,
    CardText,
    Popover,
    PopoverHeader,
    PopoverBody,
    Table
} from 'reactstrap'
import { CatGif } from './CatGif'
import { CustomModal } from './CustomModal'

const ShopItems = (props) => {
    const { buttonDisabled, totalStars, buyGif } = props
    return (
        <Row className='margin-top-10'>
            <Col
                xs={{ size: 10, offset: 1 }}
            >
                <Card className='margin-bottom-10'>
                    <CardHeader>{"Items"}</CardHeader>
                    <CardBody>
                        <Card className='align-center'>
                            <CardBody>
                                <CardText>{"1 x Cat Gif: ⭐2"}</CardText>
                                <Button
                                    className='buy-button'
                                    color='warning'
                                    disabled={buttonDisabled || totalStars < 2}
                                    onClick={() => buyGif(2)}
                                >
                                    {"Retrieve Cuteness"}
                                </Button>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

const SavedKitties = (props) => {
    const { toggleSavedKitties, savedKitties, inventory, toggleModal } = props
    return (
        <Row>
            <Col xs={{ offset: 2 }}>
                <p></p>
                <Button
                    className='margin-bottom-10'
                    onClick={toggleSavedKitties}
                >
                    {"Saved Kitties"}
                </Button>
                <Collapse isOpen={savedKitties}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kitty</th>
                                <th>Gif</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.catGifs.map((gif, index) =>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{gif.name}</td>
                                    <td>
                                        <Button
                                            color='link'
                                            onClick={() => toggleModal(gif.url)}
                                        >
                                            {"View"}
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Collapse>
            </Col>
        </Row>
    )
}

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
                    <Col xs={{ size: 6, offset: 6 }}>
                        <h4 className='align-center'>
                            {"Stars "}
                            <Badge
                                className='golden-text'
                                color='primary'>
                                <span className='drop-shadow'>
                                    {totalStars}
                                </span>
                            </Badge>
                        </h4>
                    </Col>
                </Row>
                <ShopItems
                    buttonDisabled={buttonDisabled}
                    totalStars={totalStars}
                    buyGif={this.buyGif}
                />
                {(!this.state.showGif) ? null :
                    <CatGif saveKitty={saveKitty} />}
                <SavedKitties
                    toggleSavedKitties={this.toggleSavedKitties}
                    savedKitties={savedKitties}
                    inventory={inventory}
                    toggleModal={this.toggleInnerModal}
                />
            </React.Fragment>
        )
    }
}