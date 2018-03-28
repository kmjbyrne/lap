import { Injectable } from "@angular/core";
// import { AuthenticationService } from "../../shared/services/auth.service";
import { AuthService } from '../../auth/auth.service';;



@Injectable()
export class NavigationService {
    constructor(private authService: AuthService) { }

    onLogout() {
        this.authService.logout();
    }
}