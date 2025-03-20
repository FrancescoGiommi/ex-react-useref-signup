import { useState } from "react";

import "./App.css";

/* Premessa: Stai sviluppando un form di registrazione per una piattaforma dedicata ai giovani sviluppatori web. 
Gli utenti devono iscriversi indicando le loro competenze e specializzazioni. */

//! Milestone 1: Creare un Form con Campi Controllati

/*  Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):

     Nome completo (input di testo)

     Username (input di testo)

     Password (input di tipo password)

     Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")

     Anni di esperienza (input di tipo number)

     Breve descrizione sullo sviluppatore (textarea)

    Aggiungi una validazione al submit, verificando che:
        Tutti i campi siano compilati
        L'input Anni di esperienza sia un numero positivo
        La Specializzazione sia selezionata

    Al submit, se il form è valido, stampa in console i dati. */

//! Milestone 2: Validare in tempo reale

/* Aggiungere la validazione in tempo reale dei seguenti campi:

     Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).

     Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.

     Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

    Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie: */

// const letters = "abcdefghijklmnopqrstuvwxyz";

// const numbers = "0123456789";

// const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";

/* Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi. */

function App() {
  /* State per il nome */
  const [name, setName] = useState("");
  /* State per l'username */
  const [username, setUsername] = useState("");
  /* State per la password */
  const [password, setPassword] = useState("");
  /* State per gli anni di esperienza */
  const [number, setNumber] = useState("");
  /* State per la descrizione */
  const [description, setDescription] = useState("");
  /* State per la specializzazione */
  const [specializzazione, setSpecializzazione] = useState("");

  /* Funzione verifica della password */
  function isValidPassword(password) {
    const hasMinLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    return hasMinLength && hasLetter && hasNumber && hasSymbol;
  }

  const isValid = /^[a-zA-Z0-9]+$/.test(username) && username.length > 0;
  /* Funzione per inviare i dati con il form */
  const handleSubmit = (e) => {
    e.preventDefault();
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\ ,.<>?/`~";

    /* Verifico che tutti i campi siano compilati */
    if (
      !name ||
      !username ||
      !password ||
      !number ||
      !description ||
      !specializzazione
    ) {
      console.log("Compila tutti i campi");
      return;
    }

    /* verifico che lo username sia corretto */
    if (username.trim().includes(symbols)) {
      console.log("Username non valido");
    }

    /* verifico che la descrizione sia correta */
    if (description.trim().length < 100 || description.trim().length > 1000) {
      console.log("Descrizione non valida");
    }

    /* Stampo i dati in console */
    console.log(
      "Nome:",
      name,
      "Username:",
      username,
      "Password:",
      password,
      "Anni di esperienza:",
      number,
      "Descrizione:",
      description,
      "Specializzazione:",
      specializzazione
    );
  };

  const handleSelect = (e) => {
    setSpecializzazione(e.target.value);
  };
  return (
    <>
      <h1>Compila il form</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-row">
        <div>
          {/* 1. Nome completo */}
          <label>Nome</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Inserisci il tuo nome"
            required
          />
        </div>
        <div>
          {/* 2. Username */}
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci il tuo username"
            required
            minLength={6}
          />

          <p style={{ color: isValid ? "green" : "red" }}>
            {isValid ? "Username valido" : "username non valido"}
          </p>
        </div>
        <div>
          {/* 3. Password */}
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Inserisci la tua password"
            required
            min={8}
          />
          <p style={{ color: isValidPassword(password) ? "green" : "red" }}>
            {password.length === 0
              ? "Inserisci una password"
              : isValidPassword(password)
              ? "Password valida"
              : "Password non valida"}
          </p>
        </div>
        <div>
          {/* 4. Specializzazione */}
          <label>Specializzazione</label>
          <select
            name="specializzazione"
            value={specializzazione}
            onChange={handleSelect}
            required
          >
            <option value="">Seleziona la tua specializzazione</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>
        <div>
          {/* 5. Anni di esperienza */}
          <label>Anni di esperienza</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Insersci gli anni di esperienza"
            min={0}
          />
        </div>
        <div>
          {/* 6. Breve descrizione */}
          <label>Descrizione</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="scrivi una breve descrizione di te"
            required
          ></textarea>
          <p
            style={{
              color:
                description.length >= 100 && description.length <= 1000
                  ? "green"
                  : "red",
            }}
          >
            {description.length < 100 || description.length > 1000
              ? "Descrizione non valida"
              : "Descrizione valida"}
          </p>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
