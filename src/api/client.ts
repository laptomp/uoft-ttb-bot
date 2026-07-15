import axios from "axios";

/**
 * An axios HTTP client made for interacting with the University of Toronto
 * EASI TTB API.
 */
export const tearsClient = axios.create({
	baseURL: "https://api.easi.utoronto.ca/ttb",
	timeout: 2000,
});
