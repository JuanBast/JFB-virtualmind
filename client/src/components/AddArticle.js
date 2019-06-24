import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Authors from "./Authors";
import { Container, Row, Col, Button } from 'reactstrap';


class AddArticles extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeShortDescription = this.onChangeShortDescription.bind(this);
        this.onChangeLongDescription = this.onChangeLongDescription.bind(this);
        this.onChangeAuthorsIds = this.onChangeAuthorsIds.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            short_description: '',
            long_description: '',
            authors_ids: '',

            titleError: '',
            short_descriptionError: '',
            long_descriptionError: '',
            authors_idsError: '',

            newID: ''
        }

    };

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
            titleError: ''
        });
    };

    onChangeShortDescription(e) {
        this.setState({
            short_description: e.target.value,
            short_descriptionError: ''
        });
    };

    onChangeLongDescription(e) {
        this.setState({
            long_description: e.target.value,
            long_descriptionError: ''
        });
    };

    onChangeAuthorsIds(e) {

        var _ids = "";

        if(e != null){
            e.map((_author) => {
            
                if(_ids == ""){
                    _ids = _author.value;
                } else {
                    _ids = _ids + ", " + _author.value;
                }
                
            });
        };

        this.setState({
            authors_ids: _ids,
            authors_idsError: ''
        });
    };

    validate(){

        let titleError = '';
        let short_descriptionError = '';
        let long_descriptionError = '';
        let authors_idsError = '';

        // Title validation
        if(!this.state.title) {
            titleError = 'Title can not be empty!';
        }

        if(titleError) {
            this.setState({ titleError });
            return false;
        }

        // Short Description validation
        if(!this.state.short_description) {
            short_descriptionError = 'Short Description can not be empty!';
        }

        if(short_descriptionError) {
            this.setState({ short_descriptionError });
            return false;
        }

        // Long Description validation
        if(!this.state.long_description) {
            long_descriptionError = 'Long Description can not be empty!';
        }

        if(long_descriptionError) {
            this.setState({ long_descriptionError });
            return false;
        }

        // Authors validation
        if(!this.state.authors_ids) {
            authors_idsError = 'Authors can not be empty!';
        }

        if(authors_idsError) {
            this.setState({ authors_idsError });
            return false;
        }

        // If validation is ok, return true
        return true;
        
    };

    onSubmit(e) {

        e.preventDefault();

        const isValid = this.validate();

        if(isValid){
            const newArticle = {
                title: this.state.title,
                short_description: this.state.short_description,
                long_description: this.state.long_description,
                authors_ids: this.state.authors_ids
            };
    
            axios.post('http://localhost:4000/article/new', newArticle)
                .then(res => {
                    this.setState({newID: res.data[0]._id});
                    console.log(res.data)
                });
    
            
            this.setState({
                title: '',
                short_description: '',
                long_description: '',
                authors_ids: ''
            });

        };

    };



    render() {

        if(this.state.newID){
            return <Redirect to={'/view/' + this.state.newID} />
        }

        

        return (
            
            <div style={{color: "#1C517C", marginTop: 10}}>
                <form onSubmit={this.onSubmit}>
                    <Container>
                        <Row>
                            <Col>
                                <h3>Create new Article</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group"> 
                                    <div>Title: </div>
                                    <input  type="text"
                                            className="form-control"
                                            value={this.state.title}
                                            onChange={this.onChangeTitle}
                                            placeholder='Title'
                                            />
                                    <div style={{fontSize: 12, color:'red'}}>{this.state.titleError}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <Authors 
                                        authors_ids={this.state.authors_ids}
                                        onChangeAuthorsIds={this.onChangeAuthorsIds}
                                    />
                                    <div style={{fontSize: 12, color:'red'}}>{this.state.authors_idsError}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <div>Short Description: </div>
                                    <input 
                                            type="text" 
                                            className="form-control"
                                            value={this.state.short_description}
                                            onChange={this.onChangeShortDescription}
                                            placeholder='Short Description'
                                            />
                                    <div style={{fontSize: 12, color:'red'}}>{this.state.short_descriptionError}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <div>Long Description: </div>
                                    <div>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data={this.state.long_description}
                                            placeholder='Write your Article here!'
                                            onInit={ editor => {
                                                // You can store the "editor" and use when it is needed.
                                                //console.log( 'Editor is ready to use!', editor );
                                            }}            
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                //console.log( { event, editor, data } );
                                                this.setState({
                                                    long_description: data
                                                })
                                            }}
                                        />
                                    </div>
                                    <div style={{fontSize: 12, color:'red'}}>{this.state.long_descriptionError}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <Button type="submit" outline color="primary">Create Article</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </form>
            </div>
        )
    }
}

export default AddArticles;