import React from "react";

class PlanetList extends React.Component {
      state = {
       planets: [],
       maxPopulation: 1
     };
       
     //  console.log(this.state.maxPopulation);
  
  static getDerivedStateFromProps(props, state) {
    let max = 1;
   if(props.planets) {
     props.planets.forEach(function (planet) {
      if (planet.population !== "unknown") {
        if (parseInt(planet.population, 10) > max) {
          max = parseInt(planet.population, 10);
        }
      }
    });
    return {
    maxPopulation : max 
    }       
    
    
  }
  else{
    return null;
  }
 
  }

  render() {
    console.log("in render" + this.state.maxPopulation);
    return (
      <React.Fragment>
        <div className="main ui container" style =  {{width:'850 !important',
         minHeight : 'auto', height : 'fit-content', marginTop: '3px',
         marginRight: '255px'}}>{
         
       this.props.planets ? this.props.planets.map( (planet, index) => {
            return (
            <div   key={index} style={{
              height: '50px',
              textAlign: 'center',
              fontSize: planet.population === 'unknown' ? 20 : 20 + ( 30 * ( parseInt(planet.population, 10)  /( this.state.maxPopulation ) ) ) + 'px'
            }}>
              { planet.name }
            <span style= {{leftMargin: '30px'}}> {populationFormatConverter(planet.population)} </span>
                </div>            
                  );
                }) : ""
              } 
               </div>
      </React.Fragment>
    );
  }
}

export default PlanetList;
export function randomColor() {
  let hexCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexColor = '#', counter = 0;
  for (; counter < 6 ; counter++) {
    hexColor += hexCode[Math.round(Math.random()*15)];
  }

  return hexColor;
}

export function populationFormatConverter(population) {
  let milestones = [
    { value: 1000, format: 'K' },
    { value: 1000000, format: 'M' },
    { value: 1000000000, format: 'B' }
  ], i = milestones.length - 1, display = '';
  for (; i >= 0; i--) {
    if ((population / milestones[i].value) >= 1) {
      display = (
        (
          Math.floor(population / milestones[i].value)
          + '.'
          + Math.floor((population % milestones[i].value) / (milestones[i].value / 10))
        )
        + milestones[i].format
      );
      return display;
    }
  }

  return population;
}
