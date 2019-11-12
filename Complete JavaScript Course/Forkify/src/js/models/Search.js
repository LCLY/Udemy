// a02b8f517e883ea228a8efb53df77e90
// url: https://www.food2fork.com/api/search
import axios from "axios";
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const key = "a02b8f517e883ea228a8efb53df77e90";
        // to get the promise using axios
        try {
            const res = await axios(
                `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`,
            );
            this.result = res.data.recipes;
            console.log("yes");
        } catch (err) {
            alert(err);
        }
    }
}
