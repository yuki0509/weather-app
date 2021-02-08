import React from 'react';
import axios from 'axios';

const API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast'
const API_KEY = 'ce1ba48d1dc2565c704875bff4b56117'

class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            apiKey: API_KEY,
            requestCity: '',
            response: []
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleGetWeather = this.handleGetWeather.bind(this)
    }

    handleGetWeather() {
        axios.get(API_ENDPOINT, {
            params: {
                q: this.state.requestCity,
                APPID: this.state.apiKey
            }
        }).then(res => {
            console.log(res.data);
            this.setState({
                response: res.data.list,
            });
        }).catch(function(error){
            console.log(error);
        })
    }

    handleInput(event){
        this.setState({
            requestCity: event.target.value,
        });
    }

    render() {

        console.log(this.state.response)
        return (
            <div>
                <input type='text' value={this.state.requestCity} onChange={this.handleInput}/>
                <button type='submit' onClick={this.handleGetWeather}>天気get</button>
                {this.state.response.map(res=>(
                    <ul>
                        <li>{this.state.requestCity}の{res.dt_txt}の天気は{res.weather[0].main}です</li>
                    </ul>
                ))}
            </div>
        )
    }
}

export default Weather;