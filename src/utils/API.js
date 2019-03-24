import axios from "axios";

export default axios.create({
    baseURL: "https://future-sovereign.glitch.me/",
    responseType: "json"
});