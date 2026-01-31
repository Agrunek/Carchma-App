// Przykładowe użycie:
// Kod JSX: <Button isActive>Kliknij mnie</Button>
// Generuje: <button className="green">Kliknij mnie</button>
const Button = ({ children, isValid }) => {
  const style = isValid ? "green" : "red";

  // Wykorzystanie props do zmiany wyglądu i zachowania komponentu
  return (
    <button className={style} aria-invalid={!isValid}>
      {/* Zagnieżdżony komponent */}
      {children}
    </button>
  );
};
