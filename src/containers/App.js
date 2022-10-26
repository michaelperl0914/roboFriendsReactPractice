import React, {Component} from "react";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll"
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';

class App extends Component{
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then((users) => {
                this.setState({robots : users})
            })
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }
    render() {
        const filterRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
            if (this.state.robots.length === 0){
                return <h1> LOADING </h1>
            } else{
                return(
                    <div className="tc">
                        <h1 className="f2"> Robo Friends!! </h1>
                        <SearchBox searchChange={this.onSearchChange}/>
                        <Scroll>
                            <ErrorBoundary>
                                <CardList robots={filterRobots}/>
                            </ErrorBoundary>
                            
                        </Scroll>
                        
                    </div>
                )
                
            }
    }    
}

export default App;