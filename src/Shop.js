import React, { Component } from 'react'
import { Row, Col, Button, Badge } from 'reactstrap'
import { CatGif } from './CatGif'

export class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showGif: false,
            buttonDisabled: false
        }
    }
    buyGif = (stars) => {
        this.setState({
            showGif: true,
            buttonDisabled: true
        })
        this.props.deductStars(stars)
    }
    render() {
        const { stats } = this.props
        const { buttonDisabled } = this.state
        const totalStars = Object.keys(stats.tasksCompleted).length + stats.bonusStars - stats.starsUsed
        console.log(false || true)
        return (
            <React.Fragment>
                <Row>
                    <Col xs={{ offset: 8 }}>
                        <Button color="primary" outline>
                            {"Stars "}<Badge color="primary">{totalStars}</Badge>
                        </Button>
                    </Col>
                </Row>
                <Row className="margin-top-10">
                    <Col xs={{ size: 10, offset: 1 }}>
                        <span className="shop-items">
                            {"1 x Cat Gif: "}
                        </span>
                        <Button
                            className="buy-button"
                            color="warning"
                            disabled={buttonDisabled || totalStars < 2}
                            onClick={() => this.buyGif(2)}
                        >
                            {"2⭐"}
                        </Button>
                    </Col>
                </Row>
                <div className="cat-gif">
                    {(!this.state.showGif) ? null :
                        <CatGif />}
                </div>
            </React.Fragment>
        )
    }
}