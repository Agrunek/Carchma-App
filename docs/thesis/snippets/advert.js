// Wywołanie globalnego modułu obsługi tras HTTP
const router = express.Router();

// Mapowanie trasy dla żądania aktualizacji ogłoszenia
router.patch(
  "/advert/:id", // Adres URL zasobu z parametrem "id"
  authHandler, // Funkcja pośrednicząca autentykacji
  idHandler, // Funkcja pośrednicząca sprawdzająca poprawność "id"
  controllerWrapper(patchAdvertHandler), // Dalsza obsługa żądania
);
