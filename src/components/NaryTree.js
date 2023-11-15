import React, { useState } from 'react';
import ContactForm from './ContactForm';
import Articles from './Articles';
import axios from 'axios';

class Node {
  constructor(question, answerChoices = [], firstChild = null, nextSibling = null) {
    this.question = question;
    this.answerChoices = answerChoices;
    this.firstChild = firstChild;
    this.nextSibling = nextSibling;
  }

  setFirstChild(childNode) {
    this.firstChild = childNode;
  }

  setNextSibling(siblingNode) {
    this.nextSibling = siblingNode;
  }
}

const NaryTree = () => {
  const root = new Node("Mikä vaihtoehdoista kuvaa yritystäsi parhaiten?", [
    "uusi yritys tai liiketoiminta-alue",
    "verkkokauppaa harjoittava yritys",
    "yritys ilman verkkokauppaa",
  ]);
  const firstChildNode = new Node("Mitkä vaihtoehdot kuvaavat parhaiten yrityksesi tämänhetkistä tarvetta?", [
    "uudet kotisivut",
    "uusi verkkokauppa",
    "yrityksen graafinen ilme",
    "ylläpito yrityksen sähköisille kanaville",
    "somekanavat",
    "yksilöllinen web- tai mobiilisovellus",
    "sähköisen liiketoiminnan kokonaiskartoitus",
    "kansainvälistymisen palvelut"
  ]);
  root.setFirstChild(firstChildNode);

  const [currentNode, setCurrentNode] = useState(root);

  const [userAnswers, setUserAnswers] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

// Funktio joka käsittelee surveyn vastauksia
const handleSurveySubmit = async () => {
  try {
    // Tallenna vastaukset selaimen local storageen
    localStorage.setItem('surveyAnswers', JSON.stringify(userAnswers));
    // Tallenna vastaukset tietokantaan
    await axios.post('/api/save-answer', { answers: userAnswers });
  } catch (error) {
    console.error('Error saving survey answers:', error);
  }
};

// Funktio yhteystietojen käsittelyyn
const handleContactSubmit = async (contactData) => {
  try {
    // Contact formin tietojen tallentaminen tietokantaan
    await axios.post('/api/save-contact', contactData);

    // Poista vastaukset local storagesta
    localStorage.removeItem('surveyAnswers');
    
  } catch (error) {
    console.error('Error saving contact information:', error);
  }
};
const handleAnswer = (answer) => {
  setUserAnswers([...userAnswers, answer]);
  if (currentNode.nextSibling) {
    setCurrentNode(currentNode.nextSibling);
  } else if (currentNode.firstChild) {
    setCurrentNode(currentNode.firstChild);

    if (currentNode.question === 'Ask for contact information') {
      setShowContactForm(true);
      // Surveyn vastaukset tallennetaan ennen contact formia 
      handleSurveySubmit();
    }
  } else {
    // Kyselyn loppu
    // Tee toimenpiteitä vastausten käsittelemiseksi
    console.log('User Answers:', userAnswers);
  }
};

  return (
    <div>
      {/* Render the contact form if showContactForm is true */}
      {showContactForm ? (
        <ContactForm onSubmit={handleContactSubmit} />
      ) : (
        <>
          <h2>{currentNode.question}</h2>
          <ul>
            {currentNode.answerChoices.map((choice, index) => (
              <li key={index}>
                <button onClick={() => handleAnswer(choice)}>{choice}</button>
              </li>
            ))}
          </ul>
          {/* Render the Articles component after submitting answers */}
          {userAnswers.length > 0 && <Articles userAnswers={userAnswers} />}
        </>
      )}
    </div>
  );
};

export default NaryTree;