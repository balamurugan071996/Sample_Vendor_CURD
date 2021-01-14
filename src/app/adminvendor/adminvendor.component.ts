import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminVendorService } from './adminvendor.service';
import { MatTableDataSource } from '@angular/material';
import { isFulfilled } from 'q';

@Component({
  selector: 'app-adminvendor',
  templateUrl: './adminvendor.component.html',
  styleUrls: ['./adminvendor.component.css'],
})
export class AdminvendorComponent implements OnInit {
  displayedColumns: string[] = ['txt_VendorName', 'select_Type', 'txt_Email', 'txt_Weburl', 'Action'];
  dataSource: MatTableDataSource<any>;
  constructor(private fb: FormBuilder, private service: AdminVendorService) { }

  VendorForm: FormGroup;
  EditMode = false

  /** DROP DOWN VALUE */
  drpType = [{ name: "Payment", value: "Payment" }, { name: "Insurance", value: "Insurance" }, { name: "Transporation", value: "Transporation" }]

  emailregex = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
  ngOnInit() {
    /** CREATING NEW FORM GROUP AND CONTROLS*/
    this.VendorForm = this.fb.group({
      txt_VendorName: new FormControl('', [Validators.required]),
      select_Type: new FormControl('', [Validators.required]),
      txt_Email: new FormControl('', [Validators.required, Validators.pattern(this.emailregex)]),
      txt_Weburl: new FormControl('', [Validators.required])
    })
    this.GetDetails();
  }

  /**GET DATA FROM LOCAL STORAGE */
  AllDetails: any;
  GridDisplay = [];
  GetDetails() {
    let GridValue = localStorage.getItem('item')
    this.dataSource = new MatTableDataSource(JSON.parse(GridValue));
  }

  /**CREATE NEW VENDOR */
  CreatNewVendor() {
    this.showform = true;
    this.VendorForm.reset();
    this.EditMode = false;
  }
  /**Adding New Vendor */
  showform = false;
  AddVendor() {
    if (this.VendorForm.valid) {
      let val = this.VendorForm.value
      this.GridDisplay = JSON.parse(localStorage.getItem('item'))
      this.GridDisplay.push(val)
      this.service.AddVendorDetails(this.GridDisplay);
      alert("Record Added Successfully!!!")
      this.GetDetails();
      this.showform = false;
    }
    else {
      this.VendorForm.markAllAsTouched();
    }
  }
  //EDIT BIND DETAILS//
  EditDetails = []
  rowPosition = 0;
  EditVendorRow(row, cnt) {
    this.showform = true;
    this.rowPosition = cnt;
    this.EditMode = true
    for (let i = 0; i < Object.keys(row).length; i++) {
      this.VendorForm.controls[Object.keys(row)[i]].setValue(row[Object.keys(row)[i]]);
    }
  }

  UpdateVendor() {
    this.showform = false;
    if (this.VendorForm.valid) {
      let val = this.VendorForm.value
      this.GridDisplay = JSON.parse(localStorage.getItem('item'))
      this.GridDisplay.splice(this.rowPosition, 1)
      this.GridDisplay.push(val)
      this.service.AddVendorDetails(this.GridDisplay);
      alert("Record Updated Successfully!!!")
      this.GetDetails();
    }
    else {
      this.VendorForm.markAllAsTouched();
    }
  }
  DeleteVendor() {
    this.showform = false;
    this.GridDisplay = JSON.parse(localStorage.getItem('item'))
    this.GridDisplay.splice(this.rowPosition, 1)
    this.service.AddVendorDetails(this.GridDisplay);
    alert("Record Deleted Successfully!!!")
    this.GetDetails();
  }

  Cancel() {
    this.VendorForm.reset();
    this.showform = false;
  }

}
