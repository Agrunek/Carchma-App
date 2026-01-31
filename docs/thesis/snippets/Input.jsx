// Przykładowe użycie:
// <Button isActive>Kliknij mnie</Button>
// => <button className="green">Kliknij mnie</button>
const Button = ({ children, isValid }) => {
  const style = isValid ? "green" : "red";

  // Wykorzystanie props do zmiany wyglądu komponentu
  return <button className={style}>{children}</button>;
};
