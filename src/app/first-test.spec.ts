describe('My first test', () => {
    let sut;

    beforeEach(() => {
        sut = {};
    })

    it('should be true if true', () => {
        // Arrange
        sut.a = false;

        // Act
        sut.a = true;

        // Assert
        expect(sut.a).toBe(true);
    });
})