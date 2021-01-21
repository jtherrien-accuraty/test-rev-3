//takes an array containing any number of string urls that return json in order of priority. It will go through the list until one successfully returns a json object
//recursive function
export default async function fetcher(...props) {
// we need to load from 1 or more URLs and then fall back to the most recently saved copied.

//Base Case: if props is empty fetches failed, return null
            if(props.length == 0){
                return null;
            }
            try{
                let res = await fetch(props[0]);
//success, so convert fetched string to json
                try{
                    let result = res.json();
                    return result;
                }
                catch(err){
                    throw err;
                }
            }
//if fetch failed, remove the attempted url from the array and recurse
            catch(err){
                props.shift();
                return fetcher(...props);
            }
}