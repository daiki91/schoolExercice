import streamlit as st
import firebase_admin
from firebase_admin import credentials, firestore

@st.cache_resource
def init_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate('C:\Users\arphan\OneDrive\Bureau\etude\master\sem1\base_de_donnee\tp\projet_sql\streamlit\app-qcm-d560b-459961e4b9d5.json')
        firebase_admin.initialize_app(cred)

    return firestore.client()

db = init_firebase()
