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
                                            onClick={() => this.buyGif(2)}
                                        >
                                            {"Retrieve Cuteness"}
                                        </Button>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {(!this.state.showGif) ? null :
                    <CatGif saveKitty={saveKitty} />}
                <Row>
                    <Col xs={{ offset: 2 }}>
                        <p></p>
                        <Button
                            className='margin-bottom-5'
                            onClick={this.toggleSavedKitties}
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
                                            <td>{`Unnamed`}</td>
                                            <td><Button
                                                color='link'
                                                onClick={() => this.toggleInnerModal(gif.url)}
                                            >
                                                {"View"}
                                            </Button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Collapse>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}