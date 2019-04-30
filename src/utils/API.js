import axios from "axios";

export default axios.create({
    baseURL: "https://quirky-locket.glitch.me/",
    responseType: "json"
});