import os
from dotenv import load_dotenv

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Configuration pour DeepSeek-Coder
DEEPSEEK_MODEL_PATH = os.getenv("DEEPSEEK_MODEL_PATH", "/path/to/deepseek-coder-6.7b-model")

# Configuration du serveur
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# Autres configurations
DEBUG = os.getenv("DEBUG", "False").lower() == "true"