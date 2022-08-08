import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState('All')

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    const newFoodArray = [...foods, newFood] ////CRUCIAL STEP!! - add new food to copy of array then pass new array through setState
    setFoods(newFoodArray)
  }
  function handleClick(foodId){
    //create a new array without the element we're looking to remove
    // const newArray = foods.filter(food => food.id !== foodId)
    // setFoods(newArray)

    const newArray = [...foods]
    const food = newArray.find(food => food.id === foodId)
    food.heatLevel ++
    setFoods(newArray)
  }

  const foodsToDisplay = foods.filter(food => {
    //if "All" is selceted, return all foods
    //else, return foods whose food.cuisine === selected value
    if(filterBy === "All"){
      return true
    }else{
      return food.cuisine === filterBy;
    }
  })

  const foodList = foodsToDisplay.map((food) => (
    <li onClick={()=>handleClick(food.id)} key={food.id}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));
  
  function handleChange(){
    setFoods(foodsToDisplay)
  }


  






  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select onChange={handleChange} name="filter">
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
