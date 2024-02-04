import { TestBed, fakeAsync, flush, tick, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
    let fixture, mockActivatedRouter, mockHeroService, mockLocation;

    beforeEach(() => {
        mockActivatedRouter = {
            snapshot: { paramMap: { get: () => { return '3';}}
        }};
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [HeroDetailComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRouter },
                { provide: HeroService, useValue: mockHeroService },
                { provide: Location, useValue: mockLocation }
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({id: 3, name: 'HERO', strength: 100}));
    });

    it('should render hero name in a h2 tag', () => { 
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('HERO');
    });

    it('should call updateHero when save is called', fakeAsync(() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        tick(250);
        flush();

        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));

    // it('should call updateHero when save is called', waitForAsync(() => {
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();

    //     fixture.whenStable().then(() => {
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     });
    // }));
});