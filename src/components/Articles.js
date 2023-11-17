import React from 'react';
import { useNavigate } from 'react-router-dom';


const Articles = ({ userAnswers }) => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate('/');
  };

  // vastauksiin perustuvat artikkelit
  const articles = [
    {
      title: 'Koostimme tähän tietoa sinua kiinnostavista palveluista, ole hyvä!',
      answerParts: {
        "uudet kotisivut": 'Part 1 content',
        "uusi verkkokauppa": 'Part 2 content',
        "yksilöllinen web- tai mobiilisovellus": 'Part 3 content',
        "digitaalinen markkinointi": 'Part 4 content',
        "sisällöntuotanto ja käännökset": 'Part 5 content',
        "yrityksen graafinen ilme": 'Part 6 content',
        "sähköisen liiketoiminnan kokonaiskartoitus": 'Part 7 content',
        "kansainvälistymisen palvelut": 'Part 8 content'
      },
    },
  ];

  // Artikkeliosien renderöiminen
  const renderArticleParts = (answer) => (
    <div>
      <p>{articles[0].answerParts[answer]}</p>
      <button onClick={handleNavigateBack}>Back to Main Page</button>
    </div>
  );

  // Artikkelien renderöiminen
  const renderArticles = () => (
    <div>
      {articles.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          {renderArticleParts(userAnswers[0])}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h2>Tarjoamme ratkaisuja</h2>
      {renderArticles()}
    </div>
  );
};

export default Articles;
