import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import styled from 'styled-components'
import firebase from 'firebase/app'
import 'firebase/database'
import { DB_CONFIG } from './config/config'
import { AddNewWord } from './add-new-word'
import ShowWord from './show-word/show-word'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-size: 14px;
`
const NavBar = styled.ul`
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  list-style-type: none;
  margin: 0 15px;
  padding-top: 12px;
  padding-bottom: 12px;
  clear:both;
  height: 50px;
  padding-left: 0px;
  
`
const NavBarLi = styled.li`

  a {
    color: #808080;
    text-decoration: none;
  }
`
const ContentContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;

  @media only screen and (max-width: 480px) {
    padding: 15px;
    max-width: 100%;
  }
`
const Button = styled(Link)`
  padding: 15px 80px;
  border-radius: 2px;
  text-decoration: none;
  color: white;
  background-color: ${props => (props.color)};
  margin-left: 15px;
  clear: both;

  @media only screen and (max-width: 480px) {
    padding: 15px 30px;
  }
`
const ButtonBox = styled.div`
  clear:both;
  display: inline-block;
  text-align: center;
  width: 100%;
`


const Home = () => {
  return(
    <ButtonBox>
      <Button to="/show-word/en" color="#00B0FF">English</Button>
      <Button to="/show-word/vn" color="#4CAF50">Vietnamese</Button>
    </ButtonBox>
  )
}

class App extends Component {
  
  constructor(props){
    super(props)
    this.addKeyWord = this.addKeyWord.bind(this);
    this.removeWord = this.removeWord.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');

    this.state = {
      listWord: []
    }
  }

  componentWillMount(){
    const previousWord = this.state.listWord;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousWord.push({
        id: snap.key,
        wordEn: snap.val().wordEn,
        wordVn: snap.val().wordVn,
      })

      this.setState({
        listWord: previousWord
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousWord.length; i++){
        if(previousWord[i].id === snap.key){
          previousWord.splice(i, 1);
        }
      }

      this.setState({
        listWord: previousWord
      })
    })
  }

  addKeyWord(wordEn, wordVn) {
    this.database.push().set({ wordEn, wordVn});
  }
  
  removeWord(wordId){
    this.database.child(wordId).remove();
  }

  render() {
    const { listWord } = this.state

    return (
      <Router>
        <Container>
          <NavBar>
            <NavBarLi>
              <Link to="/">Home</Link>
            </NavBarLi>
            <NavBarLi>
              <Link to="/add-new-word">Add new word</Link>
            </NavBarLi>
          </NavBar>
          
          <ContentContainer>
            <Route exact path="/" component={Home}  />
            <Route path="/add-new-word" 
              render={routeParams =>
              <AddNewWord {...routeParams} addKeyWord={this.addKeyWord}  listWord={listWord} removeWord={this.removeWord}/>
              }
            />
            <Route path="/show-word/:id" 
              render={routeParams =>
              <ShowWord {...routeParams}  listWord={listWord}/>
              }
            />
          </ContentContainer>
        </Container>
      </Router>
    )
  }
}

export default App;
