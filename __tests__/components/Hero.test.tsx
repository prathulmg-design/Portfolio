import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hero from '../../src/components/Hero';

// Mock child components to isolate Hero's functionality
jest.mock('../../src/components/ScrollyVideo', () => {
    return function MockScrollyVideo({ children }: any) {
        return <div data-testid="mock-scrolly-video">{children(0)}</div>;
    };
});

jest.mock('../../src/components/Overlay', () => {
    return function MockOverlay() {
        return <div data-testid="mock-overlay">Overlay Content</div>;
    };
});

describe('Hero Component', () => {
    it('renders the Hero container with correct layout', () => {
        const { container } = render(<Hero />);

        // Test that the wrapper has the right ID and class
        // We get the first child of the render container
        const heroWrapper = container.firstElementChild;
        expect(heroWrapper).toHaveClass('relative');
        expect(heroWrapper).toHaveAttribute('id', 'home');
    });

    it('renders children components correctly', () => {
        render(<Hero />);

        // Check if ScrollyVideo and Overlay are rendered inside
        expect(screen.getByTestId('mock-scrolly-video')).toBeInTheDocument();
        expect(screen.getByTestId('mock-overlay')).toBeInTheDocument();
    });
});
