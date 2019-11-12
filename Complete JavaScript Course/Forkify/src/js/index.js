// a02b8f517e883ea228a8efb53df77e90
// url: https://www.food2fork.com/api/search
import axios from "axios";

async function getResults(query) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const key = "asda02b8f517e883ea228a8efb53df77e90";
    // to get the promise using axios
    try {
        const result = await axios(
            `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`,
        );
        console.log(result);
    } catch (err) {
        alert(err);
    }
}

getResults("pizza");
