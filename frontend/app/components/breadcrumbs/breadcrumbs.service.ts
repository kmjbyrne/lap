import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PRIMARY_OUTLET, Router, NavigationEnd } from "@angular/router";
import IBreadcrumb from './breadcrumbs.interface';
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Injectable()
export class BreadcrumbService implements OnInit {
    private _breadcrumbs: BehaviorSubject<IBreadcrumb[]>;
    private store: {
        breadcrumbs: IBreadcrumb[]
    };

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.store = { breadcrumbs: [] };
        this._breadcrumbs = <BehaviorSubject<IBreadcrumb[]>>new BehaviorSubject([]);
    }

    get breadcrumbs() {
        return this._breadcrumbs.asObservable();
    }

    ngOnInit() {
        this.router.events.filter(event => {
            return event instanceof NavigationEnd;
        }).subscribe(_event => {
            console.log(_event);
            let root: ActivatedRoute = this.activatedRoute.root;
            this.store.breadcrumbs = this.processRoutes(root);
            this._breadcrumbs.next(Object.assign({}, this.store).breadcrumbs);
        },
            error => console.log('Error loading breadcrumbs', error));
    }

    load() {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(_event => {
            console.log(_event);
            let root: ActivatedRoute = this.activatedRoute.root;
            this.store.breadcrumbs = this.processRoutes(root);
            this._breadcrumbs.next(Object.assign({}, this.store).breadcrumbs);
            console.log(this.store);
            console.log(this._breadcrumbs);
        },
            error => console.log('Error loading breadcrumbs', error));
    }

    processRoutes(root: ActivatedRoute, url: string = "", breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA: string = "breadcrumb";
        console.log('Currently processing URL: ', url);

        let children: ActivatedRoute[] = root.children;
        if (children.length === 0) {
            console.log('Recursive function finished with: ', breadcrumbs);
            return breadcrumbs;
        }

        // Cycle through the children to extract routes
        for (let child of children) {
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA)) {
                return this.processRoutes(child, url, breadcrumbs);
            }
            //get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
            //append route URL to URL
            url += `/${routeURL}`;
            //add breadcrumb
            let breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA],
                params: child.snapshot.params,
                url: url
            };
            breadcrumbs.push(breadcrumb);
            //recursive
            console.log('Recursive Call to Process Routes: ', url);
            return this.processRoutes(child, url, breadcrumbs);
        }
        //we should never get here, but just in case
        return breadcrumbs;
    }
}