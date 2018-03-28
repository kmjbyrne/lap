import { Params } from "@angular/router";

interface IBreadcrumb {
    label: string;
    params?: Params;
    url: string;
}
export default IBreadcrumb;