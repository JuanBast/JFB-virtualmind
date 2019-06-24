import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class ViewArticle extends Component {

    constructor(props) {
        super(props);

        this.setRedirect = this.setRedirect.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);

        this.state = {
            title: '',
            short_description: '',
            long_description: '',
            authors_ids: '',
            updated_at: '',
            created_at: '',
            allAuthors: [],
            redirect: false
        };
    };

    setRedirect(){
        this.setState({
            redirect: true
        })
    }

    renderRedirect(){
        if(this.state.redirect){
            return <Redirect to={'/edit/' + this.props.match.params.id} />
        }
    }

    deleteArticle(){
        let delete_message = 'Are you sure you wish to delete Article id: ' + this.props.match.params.id +'?';
        if(window.confirm(delete_message)){
            //Get all Authors
            const url_authors = 'http://localhost:4000/article/delete/id/' + this.props.match.params.id;
            axios.delete(url_authors)
                .then(response => {
                    this.setState({
                        allAuthors: response.data
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });

                window.location.replace('http://localhost:3000');
        }
    }
    
    componentDidMount() {

        //Get all Authors
        const url_authors = 'http://localhost:4000/author';
        axios.get(url_authors)
            .then(response => {
                this.setState({
                    allAuthors: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });


        // Get the Article with the specified id
        const url = 'http://localhost:4000/article/search/id/'+this.props.match.params.id;
        axios.get(url)
            .then(response => {
                this.setState({
                    title: response.data[0].title,
                    short_description: response.data[0].short_description,
                    long_description: response.data[0].long_description,
                    authors_ids: response.data[0].authors_ids,
                    updated_at: response.data[0].updated_at,
                    created_at: response.data[0].created_at
                })   
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    parseDate(_dateValue) {


        if(_dateValue != null){
            
        
            let dateWhithNoT = _dateValue.replace('T', ' ');  
            let indexDOT = dateWhithNoT.indexOf('.');
            let dateTime = dateWhithNoT.substring(0, indexDOT);
            let year = dateTime.substring(0, 4);
            let month =  dateTime.substring(5, 7);
            let day =  dateTime.substring(8, 10);
            let i = dateTime.indexOf(' ');
            let hs = dateTime.substring(i, dateTime.length);
            let dt = day + '-' + month + '-' + year + ' ' + hs;
            return dt;
        }
    };

    getAuthorsNames(_authors_ids){

        let pivoteArray = this.state.allAuthors;
        let aux_split = _authors_ids.replace(' ', '').split(',');
        let author_names = '';

        pivoteArray.map((author) => {
            aux_split.map((author_owner) => {
                if(author_owner == author.id){
                    if(author_names.length == 0){
                        author_names = author.name;
                    } else {
                        author_names = author_names + ", " + author.name;
                    }
                }
            })   
        });
        return author_names;
    }
    
    render() {
        return (           

            <div>
            {this.renderRedirect()}
            <br/>
            <Container>
                <Row>
                    <Col className="text-left">
                        <h3 style={{color: "#1C517C"}}>Article Id: {this.props.match.params.id}</h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={this.setRedirect} outline color="warning">Edit</Button>{' '}
                        <Button onClick={this.deleteArticle} outline color="danger">Delete</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-left">
                        <h1 style={{color: "#1C517C"}}>{this.state.title}</h1>

                    </Col>
                </Row>
                <Row>
                    <Col xs="auto" className="text-left" style={{color: "#167C7A", fontSize: "13px"}}>
                        <br/>
                        <div>
                            by {this.getAuthorsNames(this.state.authors_ids)}
                        </div>
                        <div>
                            created: {this.parseDate(this.state.created_at)}
                        </div>
                        <div>
                            edited: {(this.state.updated_at === "") ? "-" : this.parseDate(this.state.updated_at)}
                        </div>
                        <br />
                    </Col>
                </Row>
                <Row>
                    <Col className="text-left">
                        {this.state.short_description}
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-left">
                        <div dangerouslySetInnerHTML={ { __html: this.state.long_description || '' } }></div>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}

export default ViewArticle;