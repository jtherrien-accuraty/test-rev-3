//takes a json object (result), recurses through an array of either strings or boolean true (category) representing the path in the object 
//to access the values to compare to the picker selection, and compares it to the picker selection (itemValue) 
//It returns false for no match, or true if matched

export default {jsonSearch, jsonSearchFuzzy}

export function jsonSearch(result, categoryOriginal, itemValue){
    //create a copy of categoryOriginal so that the array being passed in isn't destroyed
    let category = categoryOriginal.slice(0);
    //BASE CASE: category array is empty meaning result contains the value to compare to itemValue
            if(category.length == 0){
                    if(result === itemValue){
                        return true;
                    }
                    else{
                        return false;
                    }
            }
    //More recursion needed
            else{
                let z = category.shift();
    //if current part is array, apply map 
                if(z === true){
                    let mapResult = result.map((temp) => {
                        let newCategory = category.slice(0);
                        return jsonSearch(temp, newCategory, itemValue);
                    });
                    for(let thing of mapResult){
                        if(thing){
                            
                            return true;
                        }
                    }
                    return false;
                }
                else{
                    let res = jsonSearch(result[z], category, itemValue);
                    return res;
                }
            }
}

export function jsonSearchFuzzy(result, categoryOriginal, itemValue){
    //create a copy of categoryOriginal so that the array being passed in isn't destroyed
    let category = categoryOriginal.slice(0);
    //BASE CASE: category array is empty meaning result contains the value to compare to itemValue
            if(category.length == 0){
                if(result === null || itemValue === null){
                    return false;
                }
                    let resultLower = result.toLowerCase();
                    let itemValueLower = itemValue.toLowerCase();
                    if(resultLower.includes(itemValueLower)){
                        return true;
                    }
                    else{
                        return false;
                    }
            }
    //More recursion needed
            else{
                let z = category.shift();
    //if current part is array, apply map 
                if(z === true){
                    let mapResult = result.map((temp) => {
                        let newCategory = category.slice(0);
                        return jsonSearchFuzzy(temp, newCategory, itemValue);
                    });
                    for(let thing of mapResult){
                        if(thing){
                            
                            return true;
                        }
                    }
                    return false;
                }
                else{
                    let res = jsonSearchFuzzy(result[z], category, itemValue);
                    return res;
                }
            }
}