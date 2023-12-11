export function useFirstPageVisited() {
    return useState('isFirstPageVisited', () => true)
}
