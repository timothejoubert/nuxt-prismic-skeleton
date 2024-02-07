export function useStories() {
  const storiesNavIsOpen = useState('storiesNavIsOpen', () => true)
  const toggleStoriesNav = () => (storiesNavIsOpen.value = !storiesNavIsOpen.value)
  const setStoriesNav = (value: boolean) => (storiesNavIsOpen.value = value)

  return { storiesNavIsOpen, toggleStoriesNav, setStoriesNav }
}
