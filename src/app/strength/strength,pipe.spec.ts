import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
    it('should display weak if strength is -1', () => {
        // Arrange
        let pipe = new StrengthPipe();

        // Act & Assert
        expect(pipe.transform(-1)).toEqual('-1 (weak)');
    })

    it('should display weak if strength is 5', () => {
        // Arrange
        let pipe = new StrengthPipe();

        // Act & Assert
        expect(pipe.transform(5)).toEqual('5 (weak)');
    })

    it('should display strong if strength is 10', () => {
        // Arrange
        let pipe = new StrengthPipe();

        // Act & Assert
        expect(pipe.transform(10)).toEqual('10 (strong)');
    })

    it('should display unbelievable if strength is 20', () => {
        // Arrange
        let pipe = new StrengthPipe();

        // Act & Assert
        expect(pipe.transform(20)).toEqual('20 (unbelievable)');
    })
});