import React from "react";
import { connect } from "react-redux";

import PlanetList from "./PlanetList";
import { getPlanet } from "../actions/planetAction";


class Search extends React.Component {
  constructor() {
    super();
    this.state = { query: "",
    timerSet: false,
    searchCount: 0,
        errorMessage: '',
        searchThresholdInSeconds: 60
  };
    
   
  }
  
  handleInputChange = event => {
    this.setState({
      query: event.target.value
    });
    if(this.searchPlanets())
    this.props.getPlanet(event.target.value);
    
  };
  componentDidMount(){
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor= "white";
  }
  setTimer() {
    this.timer = setTimeout(() => {
      clearTimeout(this.timer);
      this.setState({
        searchCount: 0,
        errorMessage: '',
        timerSet: false
      });
    }, 1000 * this.state.searchThresholdInSeconds);
  }
  searchPlanets = (e) => {
    if (this.state.timerSet === false) {
      this.setState({ timerSet: true });
      this.setTimer();
    }

    if (this.props.user !== "Luke Skywalker") {
      if ( this.timer && this.state.searchCount <= 15 ) {
       // this.props.search(e.target.value);
        this.setState({ searchCount: this.state.searchCount+1 });
        return true;
      }

      if (this.state.searchCount === 16) {
        // this.props.search('');
        this.setState({ errorMessage: 'You are not allowed to perform more than 15 searches per minute' });
        this.setState({ searchCount: this.state.searchCount+1 });
        return false;
      }
    } else {
      // this.props.search(e.target.value);
      return true;
    }
  }
  render() {
  
   
    if (this.props.planet) {
    //  (console.log("a: " + this.props.planet));
      this.props.planet.map(function (planet, index) {
      //  console.log(planet)
         return false;
        })
     } 
   
    return (
      <React.Fragment>
       
        <div className="search-bar ui segment" id="search">
          <form className="ui form">
         
            <div className="field">
            <div className="userblock" >
            Welcome Back <span className="username">  {this.props.user}</span>
             </div>
             <div className='planetsimage'>
               
             </div>
             
              {/* <label>Planet Search</label> */}
              <span className="searchinput">
              <span class="error">
             { this.state.errorMessage }
             </span>
             <input style={{width: "850px" , marginTop:'10px'}}
                placeholder="Type planet name..."
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              </span>
              <PlanetList style={{width: "850px"}} planets={this.props.planet}></PlanetList>
            </div>
          </form>
        </div>

       
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
//  console.log(state.planets);
// var planet = state.planets.results;
 console.log(state);
  return {
    planet : state.planets.results,
    user : state.auth.result.name
  };
};
export default connect(
  mapStateToProps,
  { getPlanet }
)(Search);
