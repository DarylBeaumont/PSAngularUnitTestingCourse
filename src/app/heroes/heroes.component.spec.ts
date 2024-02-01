import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        component = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            // Arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            // Act
            component.delete(HEROES[2]);

            // Assert
            expect(component.heroes).toContain(HEROES[0])
            expect(component.heroes).toContain(HEROES[1]);
            expect(component.heroes.length).not.toContain(HEROES[2]);
        });

        it('should call deleteHero wuth the correct hero', () => {
            // Arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            // Act
            component.delete(HEROES[2]);

            // Assert
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
     });
})