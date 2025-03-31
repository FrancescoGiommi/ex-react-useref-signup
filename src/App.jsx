import { useState, useRef } from "react";

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

//! Milestone 3: Convertire i Campi Non Controllati

/* Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.

    Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
    Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
    Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form. */

//! Bonus: Migliorare l'Usabilità

/* Utilizziamo useRef() per migliorare l’esperienza utente, implementando le seguenti funzionalità:

    Focus automatico al primo input (Nome) al mount del componente.
    Bottone "Reset" in fondo al form per ripristinare tutti i valori:
        Gli input controllati devono tornare ai valori iniziali.
        Gli input non controllati devono essere resettati manualmente usando useRef().
    Freccia fissa in basso a destra che, quando cliccata, riporta l'utente all'inizio del form (bisogna usare position: fixed). */

function App() {
  console.log("render");
  /* State per il nome */
  const nameRef = useRef();
  /* State per l'username */
  const [username, setUsername] = useState("");
  /* State per la password */
  const [password, setPassword] = useState("");
  /* State per gli anni di esperienza */
  const numberRef = useRef();
  /* State per la descrizione */
  const [description, setDescription] = useState("");
  /* State per la specializzazione */
  const [specializzazione, setSpecializzazione] = useState("");

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\ ,.<>?/`~";

  /* Funzione verifica della password */
  function isValidPassword(password) {
    const hasMinLength = password.length >= 8;
    const hasLetter = password.split("").some((char) => letters.includes(char));
    const hasNumber = password.split("").some((char) => numbers.includes(char));
    const hasSymbol = password.split("").some((char) => symbols.includes(char));

    return hasMinLength && hasLetter && hasNumber && hasSymbol;
  }

  const isValid = /^[a-zA-Z0-9]+$/.test(username) && username.length >= 6;

  /* Funzione per inviare i dati con il form */
  const handleSubmit = (e) => {
    e.preventDefault();

    /* Verifico che tutti i campi siano compilati */
    if (
      !nameRef ||
      !username ||
      !password ||
      !numberRef ||
      !description ||
      !specializzazione
    ) {
      alert("Compila tutti i campi");
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
    const name = nameRef.current.value;
    const number = numberRef.current.value;
    /* Stampo i dati in console */
    console.log({
      Nome: name,
      Username: username,
      Password: password,
      Anni_di_esperienza: number,
      Descrizione: description,
      Specializzazione: specializzazione,
    });
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
          <label className="d-block">Nome</label>

          <input
            type="text"
            ref={nameRef}
            placeholder="Inserisci il tuo nome"
            required
          />
        </div>
        <div>
          {/* 2. Username */}
          <label className="d-block">Username</label>

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
          <label className="d-block">Password</label>
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
          <label className="d-block">Specializzazione</label>
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
          <label className="d-block">Anni di esperienza</label>
          <input
            type="number"
            ref={numberRef}
            placeholder="Insersci gli anni di esperienza"
            min={0}
          />
        </div>
        <div>
          {/* 6. Breve descrizione */}
          <label className="d-block">Descrizione</label>
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
