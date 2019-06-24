import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Authors from "./Authors";
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditArticles extends Component {

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

            to_view: false
        };
    };

    componentDidMount() {
        const url = 'http://localhost:4000/article/search/id/'+this.props.match.params.id;
        axios.get(url)
            .then(response => {
                this.setState({
                    title: response.data[0].title,
                    short_description: response.data[0].short_description,
                    long_description: response.data[0].long_description,
                    authors_ids: response.data[0].authors_ids
                })   
            })
            .catch(function (error) {
                console.log(error);
            });
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
            long_descriptionError: '',
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
            const editArticle = {
                title: this.state.title,
                short_description: this.state.short_description,
                long_description: this.state.long_description,
                authors_ids: this.state.authors_ids
            };        
    
            axios.put('http://localhost:4000/article/edit/'+this.props.match.params.id, editArticle)
                .then(res => console.log(res.data));

            this.setState({to_view: true});

            let url_to_View = 'http://localhost:3000/view/' + this.props.match.params.id;
            window.location.replace(url_to_View);

        }
    };



    render() {

        return (

            <div style={{color: "#1C517C", marginTop: 10}}>
                <form onSubmit={this.onSubmit}>
                    <Container>
                        <Row>
                            <Col>
                                <h3>Update Article</h3>
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
                                    <div>Title: </div>
                                    <input  type="text"
                                            className="form-control"
                                            value={this.state.title}
                                            onChange={this.onChangeTitle}
                                            />
                                    <div style={{fontSize: 12, color:'red'}}>{this.state.titleError}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="form-group">
                                    <label>Short Description: </label>
                                    <input 
                                            type="text" 
                                            className="form-control"
                                            value={this.state.short_description}
                                            onChange={this.onChangeShortDescription}
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
                                    <Button type="submit" outline color="primary">Update Article</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </form>
            </div>
        )
    }
}

export default withRouter(EditArticles);