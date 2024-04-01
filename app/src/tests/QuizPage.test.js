import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuizPage from '../pages/quiz/QuizPage';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

// Testing lines that render quiz questions & handle user interaction with the quiz. 

describe('QuizPage', () => {
  it('renders quiz questions and answer options', () => {
    // Mock FontSizeContext
    jest.mock('../contexts/FontSizeContext', () => ({
      useFontSize: () => ({
        fontSize: 16,
        darkMode: false,
      }),
    }));

    const { getByText, getByTestId } = render(<QuizPage />);
    
    // Testing navigation through quiz questions

    // Verify that a quiz question is rendered
    expect(getByTestId('quiz-question')).toBeInTheDocument();
    
    // Verify that answer options are rendered
    expect(getByText('Strongly Disagree')).toBeInTheDocument();
    expect(getByText('Disagree')).toBeInTheDocument();
    expect(getByText('Neutral')).toBeInTheDocument();
    expect(getByText('Agree')).toBeInTheDocument();
    expect(getByText('Strongly Agree')).toBeInTheDocument();
  });

  it('allows user to navigate through quiz questions', () => {
    const { getByText } = render(<QuizPage />);
    
    // Clicking the next button
    fireEvent.click(getByText('Next'));

  });

    // Testing calculations for quiz score
  it('calculates and displays user scores at the end of the quiz', () => {
    const { getByText } = render(<QuizPage />);

    // Clickong the finish button
    fireEvent.click(getByText('Finish'));
    
    // Verify that user scores are displayed
    expect(getByText('Health Score:')).toBeInTheDocument();
    expect(getByText('Professional Score:')).toBeInTheDocument();
    expect(getByText('Relationships Score:')).toBeInTheDocument();
  });
});