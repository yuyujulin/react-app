/**
 * Created by Administrator on 2016/11/8 0008.
 */

import React from 'react'

import Card from './card'

const TitleBar = Card.TitleBar
const Title = Card.Title
const ContentBar = Card.ContentBar
const Content = Card.Content

var AntStudy = React.createClass({
    getInitialState(){
        return {
            current: 2
        }
    },
    render(){
        return (
            <div>
                <Card current={this.state.current}>
                    <TitleBar>
                        <Title index={1} onClick={(e)=>this.setState({current: 1})}>title1</Title>
                        <Title index={2} onClick={(e)=>this.setState({current: 2})}>title2</Title>
                        <Title index={3} onClick={(e)=>this.setState({current: 3})}>title3</Title>
                    </TitleBar>
                    <ContentBar>
                        <Content index={1}>content1</Content>
                        <Content index={2}>content2</Content>
                        <Content index={3}>content3</Content>
                    </ContentBar>
                </Card>
            </div>
        )
    },
    handleClick(index){
        this.setState({
            current: index
        })
    }
})

export default AntStudy