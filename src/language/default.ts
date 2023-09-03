import { English } from "./english";
import { German } from "./german";

export let STRINGS = English

export function setLanguage(languageCode: string) {
    localStorage.language = languageCode
    setupLanguage()
}

export function setupLanguage() {
    switch(localStorage.language) {
        case "en":
        case "us":
            STRINGS = English; break
        case "de":
        default:
            STRINGS = German; break;
    }
}