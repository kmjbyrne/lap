import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavigationService } from './navigation.service';


@Component({
	selector: 'application-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	providers: [NavigationService]
})
export class NavigationComponent implements OnInit {

	constructor(private service: NavigationService) {
	}
	ngOnInit() {

	}

	logout() {
		this.service.onLogout();
	}
}
