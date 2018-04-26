import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ListContainer = styled.div`
  width: 100%;
  font-size: 14px;
`
const WordContainer = styled.div`
  flex-direction:row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid  rgba(0,0,0,0.16);
  float: left;
  clear: both;
`
const WordBox = styled.div`
  width: 70%;
  float: left;
`
const ButtonBox = styled.div`
  width: 28%;
  float: right;
`
const Button = styled.button`
  padding: 10px 30px;
  background-color: red;
  color: white;
  border: 0px;
  border-radius: 2px;
  margin-top: 21px;
  float: right;
`

class ListWord extends Component {
  
  static propTypes = {
    wordEn: PropTypes.string.isRequired,
    wordVn: PropTypes.string.isRequired,
    wordId: PropTypes.string.isRequired
  }

  constructor(props){
    super(props)

    this._hanleRemoveWord = this._hanleRemoveWord.bind(this);
  }

  _hanleRemoveWord(id) {
    this.props.hanleRemoveWord(id)
  }
  render(){
    const { wordEn, wordVn, wordId} = this.props
    return(
      <ListContainer>
        <WordContainer>
          <WordBox>
            <p>{wordEn}</p>
            <p>{wordVn}</p>
          </WordBox>
          <ButtonBox>
            <Button onClick={() => this._hanleRemoveWord(wordId)}>Delete</Button>
          </ButtonBox>
        </WordContainer>
      </ListContainer>
    )
  }
}

export default ListWord