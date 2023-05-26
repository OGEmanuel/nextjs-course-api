import { useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback/index';

const FeedbackPage = props => {
  const [feedbackData, setFeedbackData] = useState();
  const loadFeedbackHandler = id => {
    fetch(`/api/feedback/${id}`)
      .then(response => response.json())
      .then(data => {
        setFeedbackData(data.feedback);
      });
  }; // /api/some-feedback-id
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map(item => (
          <li key={item.id}>
            {item.text}{' '}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>{' '}
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbackPage;
