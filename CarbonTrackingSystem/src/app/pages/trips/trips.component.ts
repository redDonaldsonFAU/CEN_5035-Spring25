import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { CacheService } from '../../cache.service';

@Component({
    selector: 'app-trips',
    imports: [],
    templateUrl: './trips.component.html',
    styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit {
    constructor(private httpService: HttpService) {}
    private cacheService = inject(CacheService);

    tripsList: any = [];

    ngOnInit(): void {
        const cachedData = this.cacheService.getCache('login');
        this.httpService
            .postData('trips', {
                employeeId: cachedData.employeeId,
                mode: 'list'
            })
            .subscribe((res) => {
                this.tripsList = JSON.parse(JSON.stringify(res));
                console.log(`:RED: ${JSON.stringify(this.tripsList)}`);
            });
    }
}
