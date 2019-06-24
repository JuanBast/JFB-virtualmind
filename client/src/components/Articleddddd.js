import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

class Article extends Component {

    constructor(props) {
        super(props);

        this.doDelete = this.doDelete.bind(this);

        this.state = {
        };
    };

    doDelete(deleteId){
        this.props.doDelete(deleteId);
    }


    render() {
        return(
            <tr>
                <td>
                    <div>
                        <Link 
                            style={{color: "#1C517C", fontWeight: "bold"}} 
                            to={"/view/"+this.props.article.id}>
                                {this.props.article.title}
                        </Link>
                    </div>

                    <div 
                        style={{color: "#C5303C", fontSize: "13px"}}>
                            Article {this.props.article.id}: by {this.props.author_names_list}
                    </div>

                    <div>
                        {this.props.article.short_description}
                    </div>
                </td>
                <td>
                    <div>
                        <Link style={{color: "green"}} to={"/edit/"+this.props.article.id}>Edit</Link>
                    </div>
                    <div>
                        <Link 
                                style={{color: "red"}} 
                                id={this.props.article.id}
                                onClick={(e) => {

                                    console.log("Delete id: " + e.currentTarget.getAttribute("id"));
                                    let deleteId = e.currentTarget.getAttribute("id");

                                    if(window.confirm('Are you sure you want to delete Article: ' + deleteId + '?')) {
                                        console.log("No va a ningun lado... apreto delete")
                                        this.doDelete(deleteId);
                                    }
                                }}>
                                    Delete
                            </Link>
                    </div>
                </td>
            </tr>
        )
    }

}

export default Article;