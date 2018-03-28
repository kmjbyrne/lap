import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "./breadcrumbs.service";
// import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "breadcrumbs",
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    providers: [BreadcrumbService]
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs: any = [];
    constructor(private service: BreadcrumbService) { }

    ngOnInit() {
        this.service.breadcrumbs.subscribe(e => {
            console.log('Checking on subscription for Breadcrumbs: ', e);
            this.breadcrumbs = e;
        });
        this.service.load();
    }
}