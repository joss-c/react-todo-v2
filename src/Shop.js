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
    Table,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'
import { CatGif } from './CatGif'
import { CustomModal } from './CustomModal'
import classnames from 'classnames'

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
    const { showSavedKitties, inventory, toggleModal } = props
    return (
        <Row className='margin-top-10'>
            <Col xs={{ offset: 2 }}>
                <Collapse isOpen={showSavedKitties}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kitty</th>
                                <th>Gif</th>
                                <th></th>
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
                                            onClick={() => toggleModal(gif)}
                                        >
                                            {"View"}
                                        </Button>
                                    </td>
                                    <td><Button color='danger'>x</Button></td>
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
            showSavedKitties: false,
            innerModal: false,
            currentCatGif: '',
            activeTab: '1'
        }
    }

    buyGif = (stars) => {
        this.setState({
            showGif: true,
            buttonDisabled: true
        })
        this.props.deductStars(stars)
    }

    togglesavedKitties = () => {
        this.setState({ showSavedKitties: !this.state.showSavedKitties })
    }

    toggleInnerModal = (gif) => {
        if (this.state.innerModal) {
            this.setState({
                innerModal: false
            })
        } else {
            this.setState({
                innerModal: true,
                currentCatGif: gif
            })
        }
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
                showSavedKitties: !this.state.showSavedKitties
            })
        }
    }

    render() {
        const { stats, inventory, saveKitty } = this.props
        const { buttonDisabled, showSavedKitties, innerModal, currentCatGif } = this.state
        const totalStars = Object.keys(stats.tasksCompleted).length + stats.bonusStars - stats.starsUsed
        return (
            <React.Fragment>
                <CustomModal
                    isOpen={innerModal}
                    header={currentCatGif.name}
                    toggleModal={this.toggleInnerModal}
                >
                    <img
                        style={{ width: '100%' }}
                        src={currentCatGif.url}
                        alt="This should be a cat gif.."
                    >
                    </img>
                </CustomModal>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => this.toggleTab('1')}
                        >
                            {"Shop"}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => this.toggleTab('2')}
                        >
                            {"Saved Kitties"}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row className='margin-top-10'>
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
                    </TabPane>
                    <TabPane tabId="2">
                        <SavedKitties
                            toggleshowSavedKitties={this.toggleshowSavedKitties}
                            showSavedKitties={showSavedKitties}
                            inventory={inventory}
                            toggleModal={this.toggleInnerModal}
                        />
                    </TabPane>
                </TabContent>
            </React.Fragment>
        )
    }
}