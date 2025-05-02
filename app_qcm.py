import streamlit as st
import pyrebase
import firebase_admin
from firebase_admin import credentials
import json
import random
import string
from firebase_admin import firestore

@st.cache_resource
def get_firestore():
    if not firebase_admin._apps:
        cred = credentials.Certificate("app-qcm-d560b-459961e4b9d5.json")
        firebase_admin.initialize_app(cred)
    return firestore.client()

db = get_firestore()
# ============================
# 🔐 CONFIGURATION FIREBASE
# ============================
firebase_config = {
    "apiKey": "AIzaSyAHQDUGhnUYNI3B72mONJIYAMF-yd5VhDU",
    "authDomain": "app-qcm-d560b.firebaseapp.com",
    "projectId": "app-qcm-d560b",
    "storageBucket": "app-qcm-d560b.appspot.com",
    "messagingSenderId": "95663788311",
    "appId": "1:95663788311:web:56e7509015984292b7a752",
    "measurementId": "G-QFXK4GJ05F",
    "databaseURL": "https://app-qcm-d560b-default-rtdb.firebaseio.com"  
}


firebase = pyrebase.initialize_app(firebase_config)
auth = firebase.auth()

if not firebase_admin._apps:
    cred = credentials.Certificate("app-qcm-d560b-459961e4b9d5.json")
    firebase_admin.initialize_app(cred)

# ============================
# 🌐 ÉTAT GLOBAL DE L'APPLICATION
# ============================

for key, default in {
    "user": None,
    "role": None,
    "page": "auth",
    "questions": [],
    "student_answers": [],
    "score_result": None,
    "exam_code": None,
    "code_verified": False
}.items():
    if key not in st.session_state:
        st.session_state[key] = default

# ============================
# 🔑 AUTHENTIFICATION
# ============================

def show_auth_page():
    st.title("🔐 Connexion / Inscription")

    mode = st.radio("Mode :", ["Connexion", "Inscription"])
    email = st.text_input("Email")
    password = st.text_input("Mot de passe", type="password")

    if mode == "Inscription":
        role = st.selectbox("Votre rôle :", ["enseignant", "élève"])

    if st.button("Valider"):
        try:
            if mode == "Connexion":
                user = auth.sign_in_with_email_and_password(email, password)
                st.success("Connexion réussie ✅")
            else:
                user = auth.create_user_with_email_and_password(email, password)
                st.success("Inscription réussie ✅")
                db.collection("roles").document(email).set({"role": role})

            st.session_state.user = user
            st.session_state.role = get_user_role(email)
            st.session_state.page = "enseignant" if st.session_state.role == "enseignant" else "eleve"
            st.experimental_rerun()

        except Exception as e:
            st.error(f"Erreur : {e}")

def get_user_role(email):
    doc = db.collection("roles").document(email).get()
    if doc.exists:
        return doc.to_dict()["role"]
    return "élève"


# ============================
# 👨‍🏫 ENSEIGNANT
# ============================

def show_teacher_page():
    st.title("👨‍🏫 Espace Enseignant")

    if st.session_state.exam_code is None:
        if st.button("Générer un code d'épreuve"):
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            st.session_state.exam_code = code
            st.success(f"Code d'épreuve : `{code}`")
            # Créer l'épreuve vide dans Firestore
            db.collection("exams").document(code).set({
                "owner": st.session_state.user["email"],
                "questions": []
            })
    else:
        st.success(f"Code actif : `{st.session_state.exam_code}`")

    choix = st.radio("Méthode de création :", ["Créer manuellement", "Importer JSON"])

    if choix == "Créer manuellement":
        with st.form("form_question"):
            text = st.text_input("Énoncé")
            options = [st.text_input(f"Option {i+1}", key=f"opt_{i}") for i in range(4)]
            correct = st.multiselect("Index des bonnes réponses", [0, 1, 2, 3])
            points = st.number_input("Points", min_value=1, value=1)

            if st.form_submit_button("Ajouter"):
                if not text or any(not o.strip() for o in options) or not correct:
                    st.error("Remplissez tous les champs.")
                else:
                    question = {"text": text, "options": options, "correct": correct, "points": points}
                    st.session_state.questions.append(question)
                    # Mettre à jour dans Firestore
                    db.collection("exams").document(st.session_state.exam_code).update({
                        "questions": st.session_state.questions
                    })
                    st.success("Question ajoutée ✅")
    else:
        uploaded = st.file_uploader("Importer JSON", type="json")
        if uploaded:
            try:
                data = json.load(uploaded)
                if isinstance(data, list):
                    st.session_state.questions = data
                    db.collection("exams").document(st.session_state.exam_code).update({
                        "questions": data
                    })
                    st.success("Import réussi ✅")
                else:
                    st.error("Le fichier doit contenir une liste.")
            except:
                st.error("Erreur dans le fichier JSON.")

    if st.session_state.questions:
        st.subheader("✅ Questions enregistrées")
        for i, q in enumerate(st.session_state.questions):
            st.markdown(f"**{i+1}. {q['text']}** ({q['points']} pts)")
        st.download_button("📥 Exporter JSON",
                           data=json.dumps(st.session_state.questions, indent=2),
                           file_name="qcm.json", mime="application/json")


# ============================
# 🎓 ÉLÈVE
# ============================

def show_student_page():
    st.title("🎓 Espace Élève")

    if not st.session_state.exam_code or not st.session_state.questions:
        st.warning("Aucune épreuve disponible.")
    
    if not st.session_state.code_verified:
        code = st.text_input("Entrer le code d’épreuve")
        if st.button("Valider"):
            doc = db.collection("exams").document(code.upper()).get()
            if doc.exists:
                st.session_state.exam_code = code.upper()
                st.session_state.questions = doc.to_dict()["questions"]
                st.session_state.code_verified = True
                st.success("Code correct ✅")
            else:
                st.error("Code invalide.")
    else:
        with st.form("qcm_form"):
            st.subheader("📋 Questions")
            answers = []
            for i, q in enumerate(st.session_state.questions):
                st.markdown(f"**{i+1}. {q['text']}** ({q['points']} pts)")
                selected = st.multiselect("Réponse(s) :", q["options"], key=f"q_{i}")
                indices = [q["options"].index(s) for s in selected]
                answers.append(indices)

            if st.form_submit_button("Soumettre"):
                score = sum(q["points"] for i, q in enumerate(st.session_state.questions)
                            if set(q["correct"]) == set(answers[i]))
                total = sum(q["points"] for q in st.session_state.questions)
                st.session_state.score_result = {"score": score, "total": total}

        if st.session_state.score_result:
            st.success(f"Résultat : {st.session_state.score_result['score']} / {st.session_state.score_result['total']}")



# ============================
# 🔁 ROUTEUR
# ============================

if st.session_state.page == "auth":
    show_auth_page()
elif st.session_state.page == "enseignant":
    show_teacher_page()
elif st.session_state.page == "eleve":
    show_student_page()
