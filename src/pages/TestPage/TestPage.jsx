import { Component, useState } from 'react'
import { AppContext } from '../../app/context';

// Импорт другой компоненты
import { Deletable } from '../../widgets/Deletable/Deletable';

// Импорт файла со стилями
import './style.css'


// Страничка туду
export class TestPage extends Component {
    constructor(props) {
        super(props);

        // Инициализируем состояние страницы
        this.state = {
            get_data: null,
            hello_data: null,
            count_data: null,
            hello_input: null,
        };
        
    }

    static contextType = AppContext;

    handleAddGet = () => {
        var url = `http://localhost:8081/api/get`
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .then((r) => {
                this.setState({
                    get_data: r
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }
    handleAddHello = () => {
        var url
        var name = this.state.hello_input || null
        if (name)
            url = `http://localhost:8082/api/user?name=${name}`
        else if (this.context.user)
            url = `http://localhost:8082/api/user?name=${this.context.user.name}`
        else
            url = 'http://localhost:8082/api/user'
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .then((r) => {
                this.setState({
                    hello_data: r
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }
    handleCount = () => {
        var url = `http://localhost:8083/api/count`
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .then((r) => {
                this.setState({
                    count_data: r
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render() {
        return (
            <div>
                <div className='test-getdi'>
                    <h2>Метод Get</h2>
                    <button onClick={this.handleAddGet}>Проверка метода Get</button>
                    {this.state.get_data}
                </div>
                <div className='test-home'>
                    <h2>Приветствие</h2>
                    <input type="text" onChange={(event) => 
                        { if (/\d/.test(event.target.value)) this.setState({hello_data: "Ошибка! Вводите только буквы", hello_input: null}) 
                          else this.setState({hello_input: event.target.value, hello_data: null})}}
                    ></input>
                    <button onClick={this.handleAddHello} disabled={!this.state.hello_input}>Метод Hello</button>
                    {this.state.hello_data}
                </div>
                <div className='test-count'>
                    <h2>Метод Count</h2>
                    <button onClick={this.handleCount} className='bl2'>Метод Count</button>
                    Счётчик: {this.state.count_data}
                </div>

            </div>
        );

    }
}