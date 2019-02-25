import {LitElement, html} from 'lit-element';

class RadTile extends LitElement {


  static get properties() {
    return {
      maintitle: {type: String},
      tileurl: {type: String},
      description: {type: String},
      loaded: {type: Boolean},
      favourite: {type: String}
    };
  }


  constructor() {
    super();

  }


  updated(changedProperties) {
      
    console.log("a: "+changedProperties); // logs previous values
    let fav = this.shadowRoot.getElementById('fav');
    if(this.favourite==="true"){
       
        if(fav!==null){
            let path = fav.getElementsByTagName('path');
            path[0].style = "fill: #ffffff"
            console.log("marked as favourite")
        }
    }else{
        if(fav!==null){
            let path = fav.getElementsByTagName('path');
            path[0].style = "fill: none"
            console.log("marked as favourite")
        }
    }
}



firstUpdated(){
  
   
console.log("firstly updated");
//can prefetch thimbnail and set preloader
setTimeout(()=>{
    this.loaded=true;
},Math.random()*3000)
  
  
  
  let toolbox = this.shadowRoot.getElementById('toolbox');

    if(toolbox!==null){
        toolbox.style = "animation-name: toolboxanim; animation-duration: 0.2s; animation-fill-mode: forwards;"
    }
    
    if(this.favourite==="true"){
        let fav = this.shadowRoot.getElementById('fav');
        if(fav!==null){
            let path = fav.getElementsByTagName('path');
            path[0].style = "fill: #ffffff"
            console.log("marked as favourite")
        }
    }
    if(this.favourite==="false"){
        let fav = this.shadowRoot.getElementById('fav');
        if(fav!==null){
            let path = fav.getElementsByTagName('path');
            path[0].style = "fill: none"
            console.log("unfavourited")
        }
    }
}
  

onHoverAnimation(){
    
    let elem = this.shadowRoot.getElementById('thumbnail');
    console.log("animation!")
    if(elem!==null){
        elem.style = "animation-name: zoomin; animation-duration: 0.2s; animation-fill-mode: forwards; animation-delay: 0s;"

    }
    
}

clearAniamtion(){
    let elem = this.shadowRoot.getElementById('thumbnail');
    console.log("animation!")
    
    if(elem!==null){
        elem.style = "animation-name: zoomout; animation-duration: 0.2s; animation-fill-mode: forwards; animation-delay: 0s;";

    }

    // let toolbox = this.shadowRoot.getElementById('toolbox');

    // if(toolbox!=null){
    //     toolbox.style = "animation-name: toolboxanim-out; animation-duration: 0.2s; animation-fill-mode: forwards;"
    // }

}

  render() {

    console.log("renderig");
    

    return html`<style> 
  :host{
    display: inline-block; /* by default, custom elements are display: inline */
    margin: 0;
  }
  @keyframes zoomin {
    0% {
        transform: scale(1.0) rotate(0deg);opacity: 1;
    }
    100% {
        transform: scale(1.2) rotate(0deg);opacity: 0.5;
    }
}
@keyframes zoomout {
    0% {
        transform: scale(1.2) rotate(0deg);opacity: 0.5;
    }
    100% {
        transform: scale(1.0) rotate(0deg); opacity: 1;
    }
}

@keyframes toolboxanim {
    0% {
        top: -100px;left:0;
    }
    100% {
        top: 0px;left:0;
    }
    
}
@keyframes toolboxanim-out {
    0% {
        top: 0px;left:0;
    }
    100% {
        top: -100px;left:0;
    }
    
}
    .container{
        min-width: 100px;
        max-width:200px;
        /* border: 2px solid black; */
        position: relative;
        overflow: hidden;
        -webkit-box-shadow: 1px 0px 5px 0px rgba(0,0,0,0.5);
        -moz-box-shadow: 1px 0px 5px 0px rgba(0,0,0,0.5);
        box-shadow: 1px 0px 5px 0px rgba(0,0,0,0.5);
        margin: 5px;
    }
    .container:hover{
        cursor: pointer;
    }

 

    img {
    width: 200px;
    height: 260px;
    }
    

    .description{
        position: absolute;
        bottom: 0;
        margin-bottom: 40px;
        left:0;
        z-index: 999;
        width: 100%;
        background: rgba(0,0,0,0.7);
        padding: 5px;
        color: white;
        transform: transform 0.2s ease-in-out;
        
    }
    .title{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
    .subtitle{
        font-family: 'Roboto', sans-serif;
        font-size: 0.8em;
        font-weight: 100;
    }

    .loader{
        background: rgba(0,0,0,0.7);
        position: absolute;
        z-index: 1000;
        width: 100%;
        height: 100%;
        margin: auto;
    }
    .toolbox{

        position: absolute;
        top: -100px;
        left:0px;
        z-index: 998;
        
        background: rgba(0,0,0,0.7);
        padding: 5px;
        color: white;
        transform: transform 0.2s ease-in-out;
    }
    svg.loader{
        display: block;
        margin: auto;
        padding-top: 50%;
        height: 40px;
    }

     </style>
    <div class="container" @mouseover="${() => this.onHoverAnimation()}" @mouseout="${() => this.clearAniamtion()}">
    ${!this.loaded ? html`<div class="loader">
        <svg class="loader" width="59px"  height="59px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#ffffff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(197.891 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
    </div>` : ""}
        <img id="thumbnail" src="${this.tileurl}" />
        <div class="description"><div class="title">${this.maintitle}</div>
        <div class="subtitle">${this.description}</div>
    </div>
    <div class="toolbox" id="toolbox">
    <?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 51 48" id="fav">
<title>Favourite</title>
<path fill="none" stroke="#FFF" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
</svg>
    </div>
    </div>
     
    
     `;
  }
}
customElements.define('rad-tile', RadTile);