import { MessageService } from "../message.service";

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
        service = new MessageService();
    });

    it('should have no messages to start', () => {
        // Act & Assert
        expect(service.messages.length).toBe(0);
    });

    it('should add a message when add is called', () => {
        // Act
        service.add('message1');

        // Assert
        expect(service.messages.length).toBe(1);
    });

    it('should remove all messages when clear is called', () => {
        // Arrange
        service.add('message1');

        // Act
        service.clear();

        // Assert
        expect(service.messages.length).toBe(0);
     });
})