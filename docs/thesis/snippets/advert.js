// Wywołanie globalnego modułu obsługi tras HTTP
const router = express.Router();

// Mapowanie trasy dla żądania aktualizacji ogłoszenia
router.patch(
  "/advert/:id", // Adres URL z parametrem "id"
  authHandler, // Funkcja pośrednicząca autentykacji
  idHandler, // Funkcja pośrednicząca sprawdzająca ID
  controllerWrapper(patchAdvertHandler), // Obsługa żądania
);

// Zwrócenie modułu odpowiedzialnego za ogłoszenia
export default router;
