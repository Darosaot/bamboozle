import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from '../../components/QuestionCard';

describe('QuestionCard', () => {
  const mockQuestion = {
    q: "¿Cuántas semanas dura un embarazo normal?",
    options: ["36 semanas", "40 semanas", "42 semanas", "38 semanas"],
    correct: 1,
    points: 100,
    difficulty: 'easy'
  };

  it('should render question and all options', () => {
    const mockOnAnswer = vi.fn();

    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        answeredCorrectly={null}
        removedOptions={[]}
      />
    );

    expect(screen.getByText(mockQuestion.q)).toBeInTheDocument();
    mockQuestion.options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('should call onAnswer when an option is clicked', () => {
    const mockOnAnswer = vi.fn();

    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        answeredCorrectly={null}
        removedOptions={[]}
      />
    );

    const firstOption = screen.getByText("36 semanas");
    fireEvent.click(firstOption);

    expect(mockOnAnswer).toHaveBeenCalledWith(0);
  });

  it('should show correct message when answer is correct', () => {
    const mockOnAnswer = vi.fn();

    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        answeredCorrectly={true}
        removedOptions={[]}
      />
    );

    expect(screen.getByText('¡CORRECTO! 🎉')).toBeInTheDocument();
  });

  it('should show incorrect message when answer is wrong', () => {
    const mockOnAnswer = vi.fn();

    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        answeredCorrectly={false}
        removedOptions={[]}
      />
    );

    expect(screen.getByText('¡INCORRECTO! 😬')).toBeInTheDocument();
  });

  it('should hide removed options', () => {
    const mockOnAnswer = vi.fn();

    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        answeredCorrectly={null}
        removedOptions={[0, 2]}
      />
    );

    const options = screen.getAllByRole('button');
    expect(options[0]).toBeDisabled();
    expect(options[1]).not.toBeDisabled();
    expect(options[2]).toBeDisabled();
    expect(options[3]).not.toBeDisabled();
  });

  it('should disable all options after answering', () => {
    const mockOnAnswer = vi.fn();

    render(
      <QuestionCard
        question={mockQuestion}
        onAnswer={mockOnAnswer}
        answeredCorrectly={true}
        removedOptions={[]}
      />
    );

    const options = screen.getAllByRole('button');
    options.forEach(option => {
      expect(option).toBeDisabled();
    });
  });
});
