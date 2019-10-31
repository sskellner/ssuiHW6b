import React from 'react';
import ReactDOM from 'react-dom';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link }
//   from "react-router-dom";
import './index.css';
// import "bootstrap/dist/css/bootstrap.css"


const pittsburghmap = require('./assets/pittsburghmap.png');
const cambridgemap = require('./assets/cambridgemap.png');
const burlingtonmap = require('./assets/burlingtonmap.png');
const sierracitymap = require('./assets/sierracitymap.png');
const tahoecitymap = require('./assets/tahoecitymap.png');
const newyorkmap = require('./assets/newyorkmap.png');

const summerlea = require('./assets/summerlea.png');
const trowbridge = require('./assets/trowbridge.jpg');
const park = require('./assets/park.jpg');
const salmonlake = require('./assets/salmonlake.JPG');
const granlibakken = require('./assets/granlibakken.jpeg');
const eastvillage = require('./assets/eastvillage.JPG');

const pdays = '67 days and counting';
const cdays = '72 days';
const bdays = '225 days';
const sdays = '62 days';
const tdays = '253 days';
const ndays = '81 days';


// class Square extends React.Component {
//   render() {
//     return (
//       <div className="square">
//         <div className="map" onClick={() => alert("click")}>
//           <img src={this.props.img} />
//         </div>
//       <span>{this.props.city} <br /> {this.props.state}</span>
//       </div>
//     );
//   }
// }

class Square extends React.Component {
  /*popup code start*/
    constructor(props) {
      super(props);
      this.state = {
        showPopup: false,
        cityname: this.props.city,
        statename: this.props.state,
      };
    }

    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup,
      });
      console.log(this.state.showPopup);
      if(!this.state.showPopup) {
        this.props.toggleCity(this.props.idx,'','');
      } else {
        this.props.toggleCity(this.props.idx, this.state.cityname, this.state.statename);
      }
    }
    /*popup code end*/

  render() {
    return (
      <div className="square">

        <div className="map" onClick={this.togglePopup.bind(this)}>
          <img src={this.props.img} />
        </div>
        {this.state.showPopup ?
          <Popup
            line1={this.state.cityname}
            line2={this.props.days}
            deets={this.props.deets}
            deets1={this.props.deets1}
            deets2={this.props.deets2}
            deets3={this.props.deets3}
            image={this.props.housepic}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }

      <span id="importante">{this.props.city} <br /> {this.props.state}</span>
      </div>
    );
  }
}



class Board extends React.Component {
  state = {
    listOfSquares: [
      {city: 'PITTSBURGH', img: pittsburghmap, housepic: summerlea, state: 'PENNSYLVANIA', days: pdays,
        deets:'8/18/19-present',
        deets1: 'for grad school',
        deets2: '4',
        deets3: 'craigslist'},
      {city: 'CAMBRIDGE', img: cambridgemap, housepic: trowbridge, state: 'MASSACHUSSETS', days: cdays,
        deets: '6/1/19-8/11/19',
        deets1: 'for a human-centered-design fellowship',
        deets2: '3...sort of',
        deets3: 'craigslist'},
      {city: 'BURLINGTON', img: burlingtonmap, housepic: park, state: 'VERMONT', days: bdays,
        deets: '10/19/18-5/31/19',
        deets1: 'to work for a ski company',
        deets2: '2',
        deets3: 'craigslist'},
      {city: 'SIERRA CITY', img: sierracitymap, housepic: salmonlake, state: 'CALIFORNIA', days: sdays,
        deets: '8/11/18-10/11/18',
        deets1: 'to live & work in the woods',
        deets2: '~6 people, 1 huge cabin',
        deets3: 'owned by a friend\'s family'},
      {city: 'LAKE TAHOE', img: tahoecitymap, housepic: granlibakken, state: 'CALIFORNIA', days: tdays,
        deets: '12/1/17-8/10/18',
        deets1: 'to work at a ski resort',
        deets2: '3',
        deets3: 'facebook'},
      {city: 'NEW YORK', img: newyorkmap, housepic: eastvillage, state: 'NEW YORK', days: ndays,
        deets: '9/11/17-11/30/17',
        deets1: 'for a computer science/art residency',
        deets2: '2',
        deets3: 'facebook & good luck'},
      // {city: 'PITTSBURGH', 'CAMBRIDGE', 'BURLINGTON', 'SIERRA CITY', 'LAKE TAHOE', 'NEW YORK'},
      // {img: pittsburghmap, cambridgemap, burlingtonmap, sierracitymap, tahoecitymap, newyorkmap},
      // {housepic: summerlea, summerlea, summerlea, summerlea, summerlea, summerlea},
      // {state: 'PENNSYLVANIA', 'MASSACHUSSETS', 'VERMONT', 'CALIFORNIA', 'CALIFORNIA', 'NEW YORK'},
      // {days: pdays, cdays, bdays, sdays, tdays, ndays},
    ]
  }


  renderSquare(idx, img, housepic, city, state, days, deets, deets1, deets2, deets3) {
    return <Square
      idx={idx}
      toggleCity={this.toggleCity}
      img={img}
      city={city}
      state={state}
      days={days}
      housepic={housepic}
      deets={deets}
      deets1={deets1}
      deets2={deets2}
      deets3={deets3}
    />;
  }

  toggleCity = (idx, newCity, newState) =>{
    console.log(newCity);
    // this.setState({city: newval});
    let newList = [...this.state.listOfSquares];
    newList[idx].city = newCity;
    newList[idx].state = newState;
    this.setState({listOfSquares: newList})

  }

  render() {
    // const status = 'Next player: X';

    console.log(this.state.listOfSquares)

    return (
      <div>
        <div className="title">Places I've Lived Since College</div>
        <br />
        {this.state.listOfSquares.map((sq, idx) => {
          const {img, city, days, state, housepic, deets, deets1, deets2, deets3} = sq;
          return <div className="board-row" key={idx}>{this.renderSquare(idx, img, housepic, city, state, days, deets, deets1, deets2, deets3)} </div>

        })}
        </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="board-info">
          <div>
            <Board />
          </div>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='container'>


            <div className="row">
              <button onClick={this.props.closePopup}>X</button>
            </div>

            <div className="row">
              <div className="col-md-5">
                <h1>{this.props.line1}</h1>
                <h2>{this.props.line2}</h2>
                <br />
                <h3><span className="bold">home for: </span>{this.props.deets}</h3>
                <h3><span className="bold">moved here: </span>{this.props.deets1}</h3>
                <h3><span className="bold">roommates: </span>{this.props.deets2}</h3>
                <h3><span className="bold">found via: </span>{this.props.deets3}</h3>
              </div>
              <div className="col-md-7">
                <img src={this.props.image} />
              </div>
            </div>


        </div>
      </div>
    );
    }
}



// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
