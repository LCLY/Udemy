import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-burger-699a0.firebaseio.com/"
});

export default instance;
