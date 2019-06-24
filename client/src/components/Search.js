import React, { Component } from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import Authors from "./Authors"

class Search extends Component {

    constructor(props) {
        super(props);

        this.onChangeSelectedOption = this.onChangeSelectedOption.bind(this);
        this.onChangeArticleId = this.onChangeArticleId.bind(this);
        this.onChangeAuthorsIds = this.onChangeAuthorsIds.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            dropdownOpen: false,
            dropdownValue: ''
        };
    };

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    onChangeSelectedOption(changeEvent){
        // Values for search (id)
        // 1 - Search All Articles
        // 2 - By Article Id
        // 3 - By Authors 

        let id = changeEvent.currentTarget.getAttribute("id");

        this.setState({
            dropdownValue: changeEvent.currentTarget.textContent
        });

        this.props.onChangeSelectedOption(id);
    };

    
    onChangeArticleId(changeEvent){
        this.props.onChangeArticleId(changeEvent);
    };

    onChangeAuthorsIds(changeEvent){
        this.props.onChangeAuthorsIds(changeEvent);
    };

    onClickButton(event){
        this.props.onClickButton(event);
    }

    


    render() {

        const selectedOption = this.props.selectedOption;
        const article_id = this.props.article_id
        const authors_ids = this.props.authors_ids


        let searchTypecontent;

        if(selectedOption == "1"){

            searchTypecontent = (
                <hr/>
            );

        } else if(selectedOption == "2"){

            searchTypecontent = (

                <div>
                    <div className="form-group"> 
                        <label>Article Id: </label>
                        <input  type="text"
                                className="form-control"
                                value={article_id}
                                onChange={this.onChangeArticleId}
                                />
                    </div>
                </div>

            );

    } else if(selectedOption == "3"){
            searchTypecontent = (
                <Authors 
                    authors_ids={authors_ids}
                    onChangeAuthorsIds={this.onChangeAuthorsIds}
                />
                
            );
    }


        return (
            <div>
                <br/>
                <Container>
                    <Row>
                        <Col xs="3"><h3 style={{color: "#DC4120"}}>Search Articles: </h3></Col>
                        <Col xs="auto">
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    {this.state.dropdownValue ? this.state.dropdownValue : 'Dropdown'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem id="1" onClick={this.onChangeSelectedOption}>All Articles</DropdownItem>
                                    <DropdownItem id="2" onClick={this.onChangeSelectedOption}>By Article Id</DropdownItem>
                                    <DropdownItem id="3" onClick={this.onChangeSelectedOption}>By Authors</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col xs="3">
                            <Button outline color="primary" onClick={this.onClickButton}>Search</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>{searchTypecontent}</Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default Search;