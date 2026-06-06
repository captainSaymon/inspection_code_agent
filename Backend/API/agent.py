import os
import google.generativeai as genai
from templates.prompts import SYSTEM_INSTRUCTION

class Agent:
    def __init__(self, language: str = "Python"):
        self.API_KEY = os.environ.get("KEY")
        genai.configure(api_key=self.API_KEY)
        self.language = language

    def analyze_code(self, code: str) -> str:
        if not self.API_KEY:
            return "Brak klucza GEMINI w zmiennych środowiskowych"

        try:
            model = genai.GenerativeModel(model_name="gemini-2.5-flash", system_instruction=SYSTEM_INSTRUCTION)
            
            user_prompt = f"Przeanalizuj poniższy kod napisany w języku {self.language}:\n\n```\n{code}\n```"
            
            generation_config = genai.GenerationConfig(temperature=0.2)
            response = model.generate_content(user_prompt, generation_config=generation_config)
            
            return response.text

        except Exception as e:
            return f"Wystąpił błąd podczas komunikacji z API Gemini: {str(e)}"