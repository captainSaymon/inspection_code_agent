![baner](./assets/baner.png) 

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)

ICA to aplikacja webowa wspierająca testerów oprogramowania. Narzędzie wykorzystuje możliwości udostępniane przez API Gemini do automatycznej analizy fragmentów kodu źródłowego pod kątem zgodności z zasadami projektowymi SOLID oraz Prawem Demeter.

Aplikacja redukuje wysiłek użytkownika do minimum: wystarczy wkleić kod, wybrać język i kliknąć wyślij. Inteligentny agent ukryty w backendzie dokonuje analizy strukturalnej i zwraca precyzyjny, sformatowany raport wraz z gotowymi sugestiami refaktoryzacji.

## Instalacja zależności

Projekt wykorzystuje bibliotekę google-genai umożliwiającą komunikację z Gemini API.

```bash
pip install -q -U google-genai
```


## API KEY
Aplikacja wymaga klucza dostępu do Gemini API. Utwórz plik `.env` i dodaj:

```env
KEY="twój_klucz_api"
```

## Uruchomienie aplikacji

W celu uruchomienia lokalnego serwera wpisz w CMD:

```bash
python app.py
```

Po poprawnym uruchomieniu, otwórz przeglądarkę internetową i przejdź do **http://localhost:5000**


## Licencja

Projekt udostępniany jest na licencji MIT.