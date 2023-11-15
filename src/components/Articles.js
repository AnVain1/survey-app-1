// Articles.js
import React from 'react';

const Articles = ({ userAnswers }) => {
  // Define articles based on user answers
  const articles = [
    {
      title: 'Article 1',
      answerParts: {
        "uudet kotisivut": 'Part 1',
        "uusi verkkokauppa": 'Part 2',
        "yrityksen graafinen ilme": 'Part 3',
        "ylläpito yrityksen sähköisille kanaville": 'Part 4',
        "somekanavat": 'Part 5',
        "yksilöllinen web- tai mobiilisovellus": 'Part 6',
        "sähköisen liiketoiminnan kokonaiskartoitus": 'Part 7',
        "kansainvälistymisen palvelut": 'Part 8',
      },
    },
    // Define more articles as needed
  ];

  // Function to render article parts
  const renderArticleParts = (answer) => (
    <ul>
      <li>
        <a href={`https://your-wix-website.com/${articles[0].answerParts[answer]}`} target="_blank" rel="noopener noreferrer">
          {articles[0].answerParts[answer]}
        </a>
      </li>
    </ul>
  );

  // Function to render articles
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
