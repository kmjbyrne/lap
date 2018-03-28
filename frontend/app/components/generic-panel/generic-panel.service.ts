import { Injectable } from "@angular/core";
import { HttpService } from "../../shared/services/http.service";
import { Summary } from "./summary";

@Injectable()
export class GenericPanelComponentServce {
    summary: Summary;
    constructor(private http: HttpService) {
        this.getTaskSummary();
    }

    private getTaskSummary() {
        this.http.get('/tasks/summary').subscribe((data) => {
            console.log(data);
        })
    }
}