import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModeSelection from '../../components/ModeSelection';

describe('ModeSelection', () => {
  it('should render mode selection screen', () => {
    const mockOnSelectMode = vi.fn();
    const mockOnToggleSound = vi.fn();

    render(
      <ModeSelection
        onSelectMode={mockOnSelectMode}
        soundEnabled={true}
        onToggleSound={mockOnToggleSound}
      />
    );

    expect(screen.getByText('BAMBOOZLE')).toBeInTheDocument();
    expect(screen.getByText('Baby Edition DELUXE!')).toBeInTheDocument();
    expect(screen.getByText('MODO SOLO')).toBeInTheDocument();
    expect(screen.getByText('2 JUGADORES')).toBeInTheDocument();
  });

  it('should call onSelectMode when solo mode is clicked', () => {
    const mockOnSelectMode = vi.fn();
    const mockOnToggleSound = vi.fn();

    render(
      <ModeSelection
        onSelectMode={mockOnSelectMode}
        soundEnabled={true}
        onToggleSound={mockOnToggleSound}
      />
    );

    const soloButton = screen.getByRole('button', { name: /MODO SOLO/i });
    fireEvent.click(soloButton);

    expect(mockOnSelectMode).toHaveBeenCalledWith('solo');
  });

  it('should call onSelectMode when 2 player mode is clicked', () => {
    const mockOnSelectMode = vi.fn();
    const mockOnToggleSound = vi.fn();

    render(
      <ModeSelection
        onSelectMode={mockOnSelectMode}
        soundEnabled={true}
        onToggleSound={mockOnToggleSound}
      />
    );

    const twoPlayerButton = screen.getByRole('button', { name: /2 JUGADORES/i });
    fireEvent.click(twoPlayerButton);

    expect(mockOnSelectMode).toHaveBeenCalledWith('2player');
  });

  it('should toggle sound when sound button is clicked', () => {
    const mockOnSelectMode = vi.fn();
    const mockOnToggleSound = vi.fn();

    render(
      <ModeSelection
        onSelectMode={mockOnSelectMode}
        soundEnabled={true}
        onToggleSound={mockOnToggleSound}
      />
    );

    const soundButton = screen.getByRole('button', { name: /Sonido ON/i });
    fireEvent.click(soundButton);

    expect(mockOnToggleSound).toHaveBeenCalled();
  });

  it('should display correct sound text when sound is enabled', () => {
    const mockOnSelectMode = vi.fn();
    const mockOnToggleSound = vi.fn();

    render(
      <ModeSelection
        onSelectMode={mockOnSelectMode}
        soundEnabled={true}
        onToggleSound={mockOnToggleSound}
      />
    );

    expect(screen.getByText('Sonido ON')).toBeInTheDocument();
  });

  it('should display correct sound text when sound is disabled', () => {
    const mockOnSelectMode = vi.fn();
    const mockOnToggleSound = vi.fn();

    render(
      <ModeSelection
        onSelectMode={mockOnSelectMode}
        soundEnabled={false}
        onToggleSound={mockOnToggleSound}
      />
    );

    expect(screen.getByText('Sonido OFF')).toBeInTheDocument();
  });
});
