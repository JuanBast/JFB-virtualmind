import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Alert, Table } from 'reactstrap';
import Search from "./Search"

const Article = props => (
    <tr>
        <td>
            <div>
                <Link 
                    style={{color: "#1C517C", fontWeight: "bold"}} 
                    to={"/view/"+props.article.id}>
                        {props.article.title}
                </Link>
            </div>

            <div 
                style={{color: "#C5303C", fontSize: "13px"}}>
                    Article {props.article.id}: by {props.author_names_list}
            </div>

            <div>
                {props.article.short_description}
            </div>
        </td>
    </tr>
);

class ListArticles extends Component {

    constructor(props) {
        super(props);

        this.onChangeSelectedOption = this.onChangeSelectedOption.bind(this);
        this.onChangeArticleId = this.onChangeArticleId.bind(this);
        this.onChangeAuthorsIds = this.onChangeAuthorsIds.bind(this);
        this.onClickButton = this.onClickButton.bind(this);

        this.getAllArticles = this.getAllArticles.bind(this);
        this.getArticleById = this.getArticleById.bind(this);
        this.getArticleByAuthors = this.getArticleByAuthors.bind(this);

        this.doDelete = this.doDelete.bind(this);

        this.state = {
            articles: [],
            allAuthors: [],

            // Search params
            selectedOption: '1',
            article_id: '',
            authors_ids: '',
            do_delete: ''
        };
    };

    componentDidMount() {

        //Get all Authors
        const url = 'http://localhost:4000/author';
        axios.get(url)
            .then(response => {
                this.setState({
                    allAuthors: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        
        // Get all Articles
        axios.get('http://localhost:4000/article')
            .then(response => {
                this.setState({ articles: response.data });
            })
            .catch(function (error){
                console.log(error);
            })

    };

    getAllArticles(){
        // Get all Articles
        axios.get('http://localhost:4000/article')
            .then(response => {
                this.setState({ articles: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    };

    getArticleById(){
        // Get an Article by Id
        let url = 'http://localhost:4000/article/search/id/' + this.state.article_id;
        axios.get(url)
            .then(response => {
                this.setState({ articles: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    };

    getArticleByAuthors(){
         // Get Articles by Authors
         let url = 'http://localhost:4000/article/search/authors_ids/' + this.state.authors_ids;
         axios.get(url)
             .then(response => {
                 this.setState({ articles: response.data });
             })
             .catch(function (error){
                 console.log(error);
             })       
        
    }

    doDelete(deleteId, event){
        this.setState({
            doDelete: deleteId
        })
    }

    articlesList() {
        
        let pivoteArray = this.state.allAuthors;

        return this.state.articles.map(function(currentArticle, i){  

            let aux_split = currentArticle.authors_ids.replace(' ', '').split(',');
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


            return (
                
                <Article 
                    article={currentArticle}
                    author_names_list={author_names}
                    key={i}
                />  
            );
        })
    };

    onChangeSelectedOption(id){
        this.setState({
            selectedOption: id
        })
    };

    onChangeArticleId(event){
        this.setState({
            article_id: event.target.value
        })
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
            authors_ids: _ids
        });
    };

    onClickButton(event){

        event.preventDefault();

        // Values for search (id)
        // 1 - Search All Articles
        // 2 - By Article Id
        // 3 - By Authors 

        if(this.state.selectedOption == '1'){
            this.getAllArticles();
        } else if(this.state.selectedOption == '2'){
            this.getArticleById();
        } else if(this.state.selectedOption == '3'){

            this.getArticleByAuthors();
        }

        
    };


    render() {

        let mainContent = '';
        let control = true;

        try {

            let responseCode = this.state.articles[0].ResponseCode;
            let responseMessage = this.state.articles[0].ResponseMessage;

            if(responseCode == 1){          
                control = false;
                mainContent = (
                    <Alert color="danger">
                         {responseMessage}
                    </Alert>
                );
            }
        } catch (error) {
            console.log(error);
        }

        if(control){
            mainContent = (
                
                <Container>
                    <Row>
                        <Col xs="auto">
                            <div>
                                <h3 style={{color: "#1C517C"}}>Articles List</h3>
                                <Table>
                                    <tbody>
                                        { this.articlesList() }
                                    </tbody>
                                </Table>

                            </div>
                        </Col>
                    </Row>
                </Container>

            )
        }

        
        


        return (

            <div>
                <Search
                    //parametros
                    selectedOption={this.state.selectedOption}
                    article_id={this.state.article_id}
                    authors_ids={this.state.authors_ids}

                    //handlers
                    onChangeSelectedOption={this.onChangeSelectedOption}
                    onChangeArticleId={this.onChangeArticleId}
                    onChangeAuthorsIds={this.onChangeAuthorsIds}
                    onClickButton={this.onClickButton}
                />

                {mainContent}
            </div>
        )
    };
};

export default ListArticles;