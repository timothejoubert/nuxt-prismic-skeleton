function splitLetter(content: string) {}

function splitWord(content: string) {
    return content.split(' ').filter((word: string) => word !== ' ')
}
