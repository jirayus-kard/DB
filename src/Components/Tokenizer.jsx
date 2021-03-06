import { fas } from '@fortawesome/free-solid-svg-icons';
import ConfigureTokenizer from './ConfigureTokenizer';
export default class Tokenizer {
    #username = '';
    #token = '';
    #type = '';
    #isLogin = false;
    
    constructor(name){
        this.name = name
    }
    get token(){
        return this.#token
    }
    get isLogin(){
        return this.#isLogin
    }

    get type(){
        return this.#type
    }

    toString(){
        return `${this.#username} :: ${this.#type} :: ${this.#token} :: ${this.#isLogin}`
    }

    setUserLogout(){
        this.#username = ''
        this.#token = ''
        this.#type = ''
        this.#isLogin = false
    }

    async setUserLogin(data){
        this.#username = data[ConfigureTokenizer.keyResponseData][0].username
        this.#token = data[ConfigureTokenizer.keyTokenHeader]
        this.#type = data[ConfigureTokenizer.keyResponseData][0].type
        this.#isLogin = true
        console.log(this.toString())
    }

    async setRefershtoken(response){
        if (response.hasOwnProperty(ConfigureTokenizer.keyTokenHeader)) {
            this.#token = response[ConfigureTokenizer.keyTokenHeader]
        }else{
            console.log(`don't have token`)
        }
    }

    async Login(username, password){
        let data = {"username": username, "password": password}
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength(data)
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }
        return await fetch(ConfigureTokenizer.proxyAnywhereAndUrlUserLogin, options).then(response => {
            if (response.ok){
                response.json().then(data => {
                    this.setUserLogin(data)
                })
            }
            return response.ok
        })
    }

    async Logout(){
        let headers = {
            "Content-Type": 'application/json',
            "Content-Length": 0
        }
        headers[ConfigureTokenizer.keyTokenHeader] = this.#token
        headers[ConfigureTokenizer.keyRequestHeaderLogoutType] = this.#type
        let options = {
            method: 'POST',
            headers: headers,
            mode: 'cors',
        }
        let response = await fetch(ConfigureTokenizer.proxyAnywhereAndUrlUserLogout, options).then(response => response)
        if (response.ok){
            this.setUserLogout()
            // console.log(this.toString())
        }
        return response.ok
    }
}