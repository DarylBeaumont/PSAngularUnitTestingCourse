import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }

}

describe('HeroesComponent', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>',
    })
    class FakeHeroComponent {
      @Input() hero: Hero;
    }

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55},
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent, RouterLinkDirectiveStub],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });
});

describe('HeroesComponent children', () => { 
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55},
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
        });
        fixture = TestBed.createComponent(HeroesComponent);
    });
    
    it('should render each hero as a HeroComponent', () => { 
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act - Run ngOnInit
        fixture.detectChanges();

        // Assert
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toBe(3);
        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked`, () => {
        // Arrange
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click', { stopPropagation: () => {} });

        // Assert
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

    });

    // Alternative syntax to the above test. No HTML manipulation.
    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked`, () => {
        // Arrange
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // Act
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            //(<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
            heroComponents[0].triggerEventHandler('delete', undefined);

        // Assert
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to the hero list when the add button is clicked', () => {
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = "Mr. Ice";
        mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        // Act
        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        // Assert
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);
    });

    it('should have the correct route for the first hero', () => {
        // Arrange
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        // Act
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        // Assert
        expect(routerLink.navigatedTo).toBe('/detail/1');
    });
});