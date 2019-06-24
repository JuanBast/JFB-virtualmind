import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

class MainLayout extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col>{this.props.children}</Col>
                </Row>
            </Container>
        );
    } 
};

export default MainLayout;