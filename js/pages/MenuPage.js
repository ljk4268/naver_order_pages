import { html } from 'lit';
import View from '../view.js';

export default class MenuPage extends View {
  constructor(){
    super()
  }

  createRenderRoot() {
    return this;
  } 

  render(){
    return html `<h1>메뉴 페이지</h1>`
  }
}