import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

const Container = styled.div`

`
const Text = styled.div`
  font-size: 64px;
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
`
const ButtonGroup = styled.div`
  display: inline-block;
  text-align: center;
  width: 100%;
`
const Button = styled.button`
  padding: 15px 40px;
  border-radius: 2px;
  color: white;
  background-color: ${props => (props.color)};
  margin-left: 15px;
  border: none;
`
const TitleTime = styled.div`
  font-size: 12px;
`
const TextTime = styled.div`
  font-size: 64px;
  color: #4CAF50;
`
const ResultGroup = styled.div`
  text-align: center;
  margin-top: 50px;
`

class ShowWord extends Component {

  static propTypes = {
    listWord: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    
    this.state = {
      count: 0,
      showResult: false,
      word: {}
    }

    this.startTimer = this.startTimer.bind(this);
    this.randomWord = this.randomWord.bind(this);
  }

  componentDidMount() {
    clearInterval(this.timer)
    this.startTimer(this)
    this.randomWord()
  }

  componentWillUnmount () {
    clearInterval(this.timer)
    this.randomWord()
  }

  tick () {
    this.setState({count: (this.state.count + 1)})
  }

  startTimer () {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }

  randomWord() {
    const { listWord } = this.props

    if (!_.isEmpty(listWord)) {
      let wordRan = listWord[Math.floor(Math.random() * listWord.length)]
      this.setState({
        word: wordRan,
        showResult: false,
        count: 0,
      })
    }
  }

  hanleShowResult() {
    this.setState({
      showResult: !this.state.showResult
    })
  }

  render() {
    const { word, showResult } = this.state
    const { params } = this.props.match
    const { id } = params

    return(
      <Container>
        <Text>
          { id === 'en' ? word.wordEn : word.wordVn }
        </Text>
        <ButtonGroup>
          <Button color="#81D4FA" onClick={() => this.hanleShowResult()}>Result</Button>
          <Button color="#4CAF50" onClick={() => this.randomWord()}>Next</Button>
        </ButtonGroup>
        { !showResult && (
          <ResultGroup>
            <TitleTime>
              Time  
            </TitleTime>
            <TextTime>
              {this.state.count}
            </TextTime>
          </ResultGroup>
        )}
        { showResult && (
          <ResultGroup>
            <TitleTime>
              Meaning  
            </TitleTime>
            <TextTime>
              { id === 'en' ? word.wordVn : word.wordEn }
            </TextTime>
          </ResultGroup>
        )}
      </Container>
    )
  }
}

export default ShowWord