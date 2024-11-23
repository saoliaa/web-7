import { Component } from 'react'
import { Outlet } from 'react-router';
import { AppContext } from '../app/context';
import { Link } from 'react-router-dom';

// Файл, описывающий лэйаут приложения
export class Layout extends Component {
    // Подключение к контексту, который внедрен в приложение компонентой верхнего уровня
    static contextType = AppContext;
    
}