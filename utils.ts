
/**
 * returns a unique array (give a property key to check for uniqueness based on property)
 * @param arr The arr to uniquify
 * @param key optional key to check for uniqueness
 */

import { kStringI } from "./types";

export function getUnique(arr: kStringI[], key: string) {
	// this uses an object(map) to remove duplicates
	const obj = arr.reduce((final, curr) => {
		const k = curr[key]
		final[k] = curr;
		return final;
	}, {})
	return Object.values(obj)
}