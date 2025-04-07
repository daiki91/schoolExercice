import os
import requests
import json
from typing import Dict, List

class ExplanationGenerator:
    def __init__(self, model_name=None):
        """
        Initialise le générateur d'explications avec DeepSeek-Coder via Ollama
        
        Args:
            model_name: Nom du modèle dans Ollama (par défaut: "deepseek-coder:6.7b")
        """
        self.model_name = model_name or os.getenv("OLLAMA_MODEL_NAME", "deepseek-coder:6.7b")
        self.ollama_api_url = os.getenv("OLLAMA_API_URL", "http://localhost:11434/api/generate")
        
        # Vérifier que l'API Ollama est accessible
        self._check_ollama_availability()
    
    def _check_ollama_availability(self):
        """Vérifie que l'API Ollama est accessible"""
        try:
            response = requests.get(self.ollama_api_url.replace("/generate", "/version"))
            if response.status_code != 200:
                print(f"Avertissement: L'API Ollama pourrait ne pas être disponible. Code: {response.status_code}")
        except Exception as e:
            print(f"Avertissement: Impossible de se connecter à l'API Ollama: {str(e)}")
    
    def generate_explanation(self, statement: str, is_correct: bool) -> str:
        """
        Génère une explication pour une réponse à une question
        
        Args:
            statement: L'affirmation à expliquer
            is_correct: Si la réponse de l'étudiant est correcte
        
        Returns:
            Une explication pédagogique
        """
        # Formater le prompt pour DeepSeek-Coder
        prompt = self._format_prompt(statement, is_correct)
        
        # Appeler DeepSeek-Coder via Ollama
        explanation = self._call_ollama(prompt)
        
        return explanation.strip()
    
    def _format_prompt(self, statement: str, is_correct: bool) -> str:
        """
        Formate le prompt pour DeepSeek-Coder
        """
        if is_correct:
            return f"Explique pourquoi l'affirmation suivante sur les bases de données est vraie de manière claire et pédagogique (environ 2-3 phrases): \"{statement}\""
        else:
            return f"Explique pourquoi l'affirmation suivante sur les bases de données est fausse de manière claire et pédagogique (environ 2-3 phrases): \"{statement}\""
    
    def _call_ollama(self, prompt: str) -> str:
        """
        Appelle le modèle DeepSeek-Coder via l'API Ollama
        """
        try:
            payload = {
                "model": self.model_name,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "max_tokens": 150,
                    "top_p": 0.95
                }
            }
            
            response = requests.post(self.ollama_api_url, json=payload)
            
            if response.status_code != 200:
                error_msg = f"Erreur lors de l'appel à Ollama: {response.status_code} - {response.text}"
                print(error_msg)
                return f"Erreur de génération. Veuillez réessayer."
            
            # Extraire la réponse
            result = response.json()
            return result.get("response", "")
            
        except Exception as e:
            error_msg = f"Exception lors de l'appel à Ollama: {str(e)}"
            print(error_msg)
            return f"Erreur de génération. Veuillez réessayer."