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
    "yksilöllinen web- tai mobiilisovellus",
    "digitaalinen markkinointi",
    "sisällöntuotanto ja käännökset",
    "yrityksen graafinen ilme",
    "sähköisen liiketoiminnan kokonaiskartoitus",
    "kansainvälistymisen palvelut"
  ]);
  root.setFirstChild(firstChildNode);

  const [currentNode, setCurrentNode] = useState(root);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSurveySubmit = async () => {
    try {
      localStorage.setItem('surveyAnswers', JSON.stringify(userAnswers));
      await axios.post('/api/save-answer', { answers: userAnswers });
      setShowContactForm(true);
    } catch (error) {
      console.error('Error saving survey answers:', error);
    }
  };

  const handleContactSubmit = async (contactData) => {
    try {
      await axios.post('/api/save-contact', contactData);
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
        handleSurveySubmit();
      }
    } else {
      console.log('User Answers:', userAnswers);
    }
  };

  return (
    <div>
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
          {userAnswers.length > 0 && <Articles userAnswers={userAnswers} />}
        </>
      )}
    </div>
  );
};

export default NaryTree;
