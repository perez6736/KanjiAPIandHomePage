import axios from "axios";

let url;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:3001/api/";
} else {
  url = process.env.REACT_APP_BASE_URL + "/api";
}

export default axios.create({
  baseURL: url,
});
