import {cacheIt, cacheFetch} from '../utils/cacher';

export async function poster(url, payload){
    return new Promise( async (resolve, reject) => {
        let bearer;
        try{
            bearer = await cachedToken();
                fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + bearer
                    },
                    body: JSON.stringify(payload)
                }).then(response => {
                    return (response.json()) 
                  }).then(res => {
                      if(res){
                        resolve(res);
                      }
                      else{
                        throw 'Submission Failed!';
                      }
                  }).catch(err => {
                      reject(null);
                  })  
           
            
        }
        catch(err){
            reject(null);
        }

    });
}

export async function posterTest(url, key){
    let x;
    try{
        x = await cachedToken();
    }
    catch(err){
    }
    return;
}
//returns a promise that resolves to the bearer token or rejects null. If the cached value is expired it calls tokenRefresher, and if there is 
//a problem retrieving the cache it calls freshToken.
export async function cachedToken(){
    return new Promise(async (resolve, reject) => {
        try{
            let cache = await cacheFetch('CHRCBearerCache');
            if(cache != null){
                if(typeof cache.accessToken == 'string' && typeof cache.renewalToken == 'string' && typeof cache.date == 'number'){
//If the token is valid resolve the promise with the bearer token, else token is expired reject with a call to tokenRefresher.                     
                    if(cache.date >= Date.now()){
                        resolve(cache.accessToken);
                    }
                    else{
                        try{
                            let x = await tokenRefresher(cache);
                            resolve(x);
                        }
                        catch(err){
                            reject(null);
                        }
                    }
                }
                else{
                    throw 'Error: cached tokens are corrupt.';
                }
            }
            else{
                throw 'Error: null returned from cache.';
            }
        }
        catch(err){
            try{
                let x = await freshToken();
                resolve(x);
            }
            catch(err){
                reject(null);
            }
        }
    });
}

//is passed an object containing the keys accessToken and renewalToken, renews the tokens, caches them, and finally resolves the returned promise to the
//bearer token (accessToken). If that fails it calls freshToken, and if that fails rejects with null.
export async function tokenRefresher(cache){
    return new Promise(async (resolve, reject) => {
        fetch('https://chrc-app2020.accuraty.ws/DesktopModules/JwtAuth/API/mobile/extendtoken', {
            method: 'post',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cache.accessToken
            },
            body: '{"rtoken": "' + cache.renewalToken + '"}'
        }).then((res) => {
            return res.json()
        }).then(async (response) => {
            if(typeof response.accessToken == 'string' && typeof response.renewalToken == 'string'){
                let cacheToken = {
                accessToken: response.accessToken,
                renewalToken: response.renewalToken,
                date: Date.now() + 3600000
                };
                let result = await cacheIt('CHRCBearerCache', cacheToken);
                if(result == 'success'){
                    resolve(cacheToken.accessToken);
                }
                else{
                throw 'Error saving authorization tokens.'
                }
            }
            else{
                throw 'Error renewing access token';
            }
        }).catch(async (err) => {
            try{
                let x = await freshToken();
                resolve(x);
            }
            catch(err){
                reject(null);
            }
        });  
    })
}

//Fetches new tokens, caches them, and resolves the returned promise with the Bearer token or rejects null on error
export async function freshToken(){
    return new Promise((resolve, reject) => {
        fetch('https://chrc-app2020.accuraty.ws/DesktopModules/JwtAuth/API/mobile/login', {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: '{"u": "mobileapp@accuraty.com", "p": "zZ9mobileapp@accuraty.com"}'
        }).then((res) => {
            return res.json()
        }).then(async (response) => {
            if(typeof response.accessToken == 'string' && typeof response.renewalToken == 'string'){
                let cacheToken = {
                accessToken: response.accessToken,
                renewalToken: response.renewalToken,
                date: Date.now() + 3600000
                };
                let result = await cacheIt('CHRCBearerCache', cacheToken);
                if(result == 'success'){
                    resolve(cacheToken.accessToken);
                }
                else{
                throw 'Error saving authorization tokens.'
                }
            }
            else{
            throw 'Error fetching access token';
            }
        }).catch(err => {
            reject(null);
        })  
    })
}