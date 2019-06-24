import React, { Component } from 'react';
import Select from 'react-select';

import axios from 'axios';

class Authors extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.generateDefaultOptions = this.generateDefaultOptions.bind(this);
    this.getAuthorsNames = this.getAuthorsNames.bind(this);

    this.state = {
      allAuthors: []
    };
  };

  componentDidMount() {

    this.generateDefaultOptions();

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
    };



      generateOptions(){
        let newSelectArray = [];

        this.state.allAuthors.map((item_author) => {
            newSelectArray.push({
                label: item_author.name, 
                value: item_author.id
            });
        });

        return newSelectArray;
      };

      generateDefaultOptions(){

        let newDefaultArray = [];
        let splitter_authors_ids = this.props.authors_ids;
        splitter_authors_ids = splitter_authors_ids.toString();

        if(splitter_authors_ids != '') {

          splitter_authors_ids = splitter_authors_ids.split(',');

            this.state.allAuthors.map((item_author) => {
                splitter_authors_ids.map((_author_id) => {
                    if(_author_id == item_author.id)
                    newDefaultArray.push({
                        label: item_author.name, 
                        value: item_author.id
                    });
                });
            });
        };
        return newDefaultArray;

      };

      getAuthorsNames(_selectDefaultValues){
          let authorsNames = '';
          _selectDefaultValues.map((item) => {
              if(authorsNames == '') {
                authorsNames = item.label;
              } else {
                authorsNames = authorsNames + ', ' + item.label;
              }
          });
          return authorsNames;
      };

      handleChange(e){
        this.props.onChangeAuthorsIds(e);
      };

  render() {

    const selectDefaultValues = this.generateDefaultOptions();
    const authorsNames = this.getAuthorsNames(selectDefaultValues);

    return (      
        <div className="form-group">
            <label>Authors: {authorsNames}</label>
            <Select 
                options = { this.generateOptions() } 
                isMulti
                onChange = { this.handleChange }
                defaultValue = { selectDefaultValues }
                placeholder = 'Choose Author(s)'
            />
            
        </div>
    );
  }
}

export default Authors;