export async function getWord() {
    const resp = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await resp.json();
    return data[0].toUpperCase();
}
