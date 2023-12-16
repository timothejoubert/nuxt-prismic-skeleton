export function useFirstPageEnter(callback?: () => void) {
    const isFirstPageEnter = useState('isFirstPageEnter', () => true)

    if (callback) onMounted(callback)

    return isFirstPageEnter
}
