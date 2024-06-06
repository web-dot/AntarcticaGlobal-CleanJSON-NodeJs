// const cities = ["Manchester", "Liverpool"];
// cities.push("Cardiiff");
// console.log(cities);

// push returns length
// const newLength = cities.push("Bradford", "Brighton");
// console.log(cities);
// console.log(newLength);

// add item to the start of the array, use unshift()
// cities.unshift("Edinburgh");
// console.log(cities);

// pop removes the last item, returns the removed item
// let removed = cities.pop();
// console.log(removed);

function isLong(city){
    return city.length > 5;
}

const citiesNew = ["London", "Liverpool", "Totnes", "Edinburgh"];
const longer = citiesNew.filter(isLong);
console.log(longer);

