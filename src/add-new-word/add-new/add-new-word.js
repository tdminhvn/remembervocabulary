import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ListWord from '../list-word/list-word'

const FormWrapper = styled.div`
  width: 100%;
`
const Title = styled.p`
  font-size: 36px;
`
const TitleList = styled.p`
  font-size: 36px;
  text-align: center;
`
const FormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  padding: 10px 10px;
  border: 0px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  border-radius: 2px;
  
`
const Button = styled.button`
  width: 100%;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #fff;
  background-color: #4080ff;
  border: 0px;
  border-radius: 2px;
  margin-top: 30px;
`

class AddNewWord extends Component {

  static propTypes = {
    listWord: PropTypes.array.isRequired,
    removeWord: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
       keyWord: []
    };

    this._handlewordEn = this._handlewordEn.bind(this);
    this._handlewordVn = this._handlewordVn.bind(this);
    this.saveWord = this.saveWord.bind(this);
    this.hanleRemoveWord = this.hanleRemoveWord.bind(this);
  }

  _handlewordEn(e){
      this.setState({
          wordEn: e.target.value,
      })
  }

  _handlewordVn(e){
      this.setState({
          wordVn: e.target.value,
      })
  }

  saveWord(){
      this.props.addKeyWord(this.state.wordEn, this.state.wordVn);

      this.setState({
          wordEn: '',
          wordVn: '',
      })
  }

  hanleRemoveWord(id) {
    this.props.removeWord(id)
  }

  render(){
      const { listWord } = this.props

      return(
        <FormWrapper>
          <Title>Add new word</Title>
          <p>English</p>
          <FormInput
            placeholder="Enter English"
            value={this.state.wordEn} 
            onChange={this._handlewordEn} 
          />
          <p>Vietnamese</p>
          <FormInput
            placeholder="Enter Vietnamese"
            value={this.state.wordVn} 
            onChange={this._handlewordVn} 
          />
          <Button onClick={this.saveWord}>
            Add
          </Button>
          <TitleList>List Word</TitleList>
          { 
            listWord.map((word) => {
              return(
                <ListWord key={word.id} wordId={word.id} wordVn={word.wordVn} wordEn={word.wordEn}  hanleRemoveWord={this.hanleRemoveWord}/>
              )
            })
          }
        </FormWrapper>
      )
  }
}

export default AddNewWord