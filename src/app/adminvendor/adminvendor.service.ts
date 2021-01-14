import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AdminVendorService {
    constructor() {
    }
    AddVendorDetails(model) {
        localStorage.setItem('item', JSON.stringify(model));
        return;
    }
}