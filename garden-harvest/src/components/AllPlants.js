import React, {useEffect, useState} from "react";
import dashboardAPI from '../api/dashboardAPI.js';
import PlantCard from './PlantCard';

export default function AllPlants(props) {
  
  let [allPlants, setAllPlants] = useState([]);
  let [name, setName] = useState('');

  useEffect(() => {
    dashboardAPI.fetchAllPlants()
      .then((apiResponseJSON) => {
        let data = apiResponseJSON;
        setAllPlants(data);
        if(props.props){
          setName(props.props.toLowerCase())
        }
      })

    },[props]);

    
  let plants = allPlants.reverse().map((plant, i) => {
    if(name === ''){
      return <PlantCard key={i} plant={plant} />
    }else{
      if(plant.common_name.toLowerCase().includes(name)){
        return <PlantCard key={i} plant={plant} />
      }
    }
  } );


  return (
    <div className="cardHolder allPlants">
      {plants}
    </div>
  );
}