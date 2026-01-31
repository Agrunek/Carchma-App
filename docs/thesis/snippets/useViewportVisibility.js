// Przykładowe użycie:
// { elementRef, isVisible } = useViewportVisibility()
const useViewportVisibility = (initialVisibility = false) => {
  // Definicja odwołania do elementu HTML
  const elementRef = useRef(null);

  // Definicja stanu widoczności
  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    // Obserwowanie elementu HTML
    const observer = new IntersectionObserver(([entry]) => {
      // Aktualizacja STANU widoczności
      setIsVisible(entry.isIntersecting);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []); // Nie powtarzaj wywoływania

  // Zwrócenie odwołania do elementu HTML oraz jego STANU
  return { elementRef, isVisible };
};
