import { ChangeDetectorRef, Component, ContentChild, ElementRef, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.scss', '../../quote/quote/quote.component.scss', '../../../assets/quote/css/style.css']
})
export class SearchVehicleComponent implements OnInit {
  @ContentChild('vehicleConfirmationModal', { static: false }) vehicleConfirmationModal: TemplateRef<any>;
  formStep: number = 1;
  searchForm: FormGroup;
  isOdlData: boolean = false;
  quoteFormData: any = null;
  detailsForm: FormGroup;
  prospectForm: FormGroup;
  vehicleList: any[] = [];
  details: any = null;
  dialogRef: any = null;
  showlogo: boolean = true;
  white_label = 1;
  source_user: string = "100173";
  isLoggedIn: boolean = false;
  user_code = '0';
	prospectSubmitted: any;
	prospectConfirmMsg: boolean = false;
	prospectConfirmErrMsg: boolean = false;
	prospectConfirmError: boolean = false;
	USERURL: string = "";
	successProspect: boolean = false;
	panelOpenState = false;

  quoteForm = this._formBuilder.group({
    isRenewal: ['1', [Validators.required]],
    userCode: ['0'],
    car_fullname: [''],
    registration_date: [''],
    registration_date_text: [''],
    manufacture_date: [''],
    brand_name: [''],
    brand_code: [''],
    model_name: [''],
    fuel_name: [''],
    fuel_type_text: [''],
    variant_name: [''],
    car_id: [''],
    car_cc: [''],
    rto_id: [''],
    rtoText: [''],
    rto_details: [''],
    prev_ncb: [0],
    new_ncb: [0],
    idv: [0],
    zero_dep: [0],
    pa_owner: [0],
    vol_discount: [0],
    brandFormGroup: this._formBuilder.group({
      brandCtrl: ['', [Validators.required]]
    }),
    modelFormGroup: this._formBuilder.group({
      modelCtrl: [null, [Validators.required]]
    }),
    fuelFormGroup: this._formBuilder.group({
      fuelCtrl: [null, [Validators.required]]
    }),
    variantFormGroup: this._formBuilder.group({
      variantCtrl: [null, [Validators.required]]
    }),
    regisFormGroup: this._formBuilder.group({
      regisCtrl: [null, [Validators.required]],
      regisYrCtrl: ['', [Validators.required]]
    }),
    contactFormGroup: this._formBuilder.group({
      mobileNoCtrl: ['', [Validators.required, Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/)]],
      emailCtrl: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)]],
      expiryDate: ['', [Validators.required]],
      lastClaim: ['0', [Validators.required]]
    }),
    options: this._formBuilder.group({
      floatLabel: ['1', [Validators.required]],
    })
  });

  buttonStatus: {
    search: boolean,
    details: boolean
  } = {
    search: true,
    details: true,
  };
  requestJson:any ={};
  userJson:any;
  constructor(
    private localStorage: LocalStorage,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private apiService: AppService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.searchForm = this._formBuilder.group({
      registration_no: ['', [Validators.required]]
    });

    this.detailsForm = this._formBuilder.group({
      mobile_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern(/^\+?[1-9][0-9]{7,14}$/)]],
      email_id: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      dontHavePreviousYearPolicy: [false, [Validators.required]],
      expiry_date: [new Date(), [Validators.required]],
      lastClaimedYear: ['0', [Validators.required]],
    });

    this.prospectForm = this._formBuilder.group({
      prospectName: ['', [Validators.required]],
      prospectPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      //prospectEmail: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)]],
      prospectEmail: ['', [Validators.required, Validators.pattern(/^[^\W_](?:[\w.-]*[^\W_])?@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)]],
      prospectPassword: ['', [Validators.required]],
      prospectConfPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
		this.USERURL = this.apiService.getUserServiceURL();
    // this.openDialog();
    this.localStorage.getItem('userJson').subscribe((data: any) => {
      if (data != null) {
        this.userJson = data;
        this.source_user = data.source_user;
        this.isLoggedIn = true;
        if (data.white_label == '1') {
          this.white_label = 1;
        } else {
          this.white_label = 0;
        }
        let userCode = data.user_code;
        this.user_code = userCode;
        this.quoteForm.get('userCode').setValue(userCode);
      } else {
        this.white_label = 0;
        this.user_code = '100173';
        this.quoteForm.get('userCode').setValue(0);
      }
    });
  }

  onSearchFormSubmit(vehicleConfirmationModal) {
    this.buttonStatus.search = false;
    this.buttonStatus.details = true;
    this.formStep = 1;

    this.requestJson ={
        userJson:this.userJson,
        policy_type:'FW',
        registration_no: this.searchForm.value.registration_no
      };

    if (this.searchForm.valid) {
      
      // this.detailsForm.controls["lastClaimedYear"].setValue("1");
      this.apiService.getRelatedVehicle(this.requestJson).subscribe(data => {
        data = JSON.parse(data)
        if (data.vehicle_id) {
          this.isOdlData = true;
          this.formStep = 2;
          this.quoteFormData = {
            registration_no: data.details.registration_no,
            vehicle_id: data.vehicle_id,
            name: data.details.name,
            fuel_type: data.details.fuel_type,
            dontHavePreviousYearPolicy: data.details.have_previous_year_policy,
            registration_date: data.details.registration_date,
            registration_year: data.details.registration_year,
            insurance_upto: data.details.insurance_upto,
            rto: data.details.rto,
            mobile_no: data.details.mobile_no,
            email_id: data.details.email_id,
            lastClaimedYear: data.details.last_year_claim_status == true ? 1 : 0,
            previous_insurance_company: data.details.previous_insurance_company,
            previous_insurance_company_id: data.details.previous_insurance_company_id,
            previous_policy_number: data.details.previous_policy_number,
            expiry_date: data.details.policy_expiry_date,
            page_status: {
              quote: false,
              listing: false,
              proposal: false,
            }
          };
          this.detailsForm.controls["mobile_no"].setValue(data.details.mobile_no);
          this.detailsForm.controls["email_id"].setValue(data.details.email_id);
          this.detailsForm.controls["dontHavePreviousYearPolicy"].setValue(data.details.have_previous_year_policy);
          this.detailsForm.controls["lastClaimedYear"].setValue(data.details.last_year_claim_status == true ? "1" : "0");
          this.detailsForm.controls["expiry_date"].setValue(new Date(data.details.policy_expiry_date.month + "-" + data.details.policy_expiry_date.day + "-" + data.details.policy_expiry_date.year));

          // this.detailsForm.controls["expiry_date"].setValue(new Date(12 + "-" + 25 + "-" + 2022));

          this.openDialog(vehicleConfirmationModal);
        } else if (data.vehicle_list.length > 0) {
          this.detailsForm.controls["expiry_date"].setValue(new Date(data.details.policy_expiry_date.month + "-" + data.details.policy_expiry_date.day + "-" + data.details.policy_expiry_date.year));
          this.vehicleList = data.vehicle_list;
          this.details = data.details;
          this.openDialog(vehicleConfirmationModal);
        } else {
          this.router.navigate([''], {});
        }
      });
    }
  }

  onSelectVehicle(vehicle) {
    this.buttonStatus.details = false;
    this.formStep = 2;
    this.quoteFormData = {
      registration_no: this.details.registration_no,
      vehicle_id: vehicle.id,
      name: this.details.name,
      fuel_type: this.details.fuel_type,
      registration_date: this.details.registration_date,
      registration_year: this.details.registration_year,
      insurance_upto: this.details.insurance_upto,
      previous_insurance_company: this.details.previous_insurance_company,
      previous_insurance_company_id: this.details.previous_insurance_company_id,
      previous_policy_number: this.details.previous_policy_number,
      expiry_date: this.details.policy_expiry_date,
      page_status: {
        quote: false,
        listing: false,
        proposal: false,
      },

      rto: this.details.rto,
      mobile_no: "",
      email_id: "",
    };
    this.buttonStatus.details = true;
    return 0;
  }

  onDetailsFormSubmit(vehicleConfirmationModal) {
    this.buttonStatus.details = false;
    if (this.detailsForm.valid) {
      this.quoteFormData.mobile_no = this.detailsForm.value.mobile_no;
      this.quoteFormData.email_id = this.detailsForm.value.email_id;
      // this.quoteFormData.expiry_date = this.detailsForm.value.expiry_date.year + "-" + this.detailsForm.value.expiry_date.month + "-" + this.detailsForm.value.expiry_date.day;
      this.quoteFormData.expiry_date = this.detailsForm.value.expiry_date;
      this.quoteFormData.dontHavePreviousYearPolicy = this.detailsForm.value.dontHavePreviousYearPolicy;
      this.quoteFormData.lastClaimedYear = this.detailsForm.value.lastClaimedYear;

      if (this.isOdlData) {
        this.localStorage.setItem('quote_form_data', this.quoteFormData).subscribe(() => {
          this.router.navigate([''], {});
        });
      } else {
        let payload = {
          registration_no: this.searchForm.value.registration_no,
          vehicle_id: this.quoteFormData.vehicle_id,
          name: this.quoteFormData.name,
          mobile_no: this.quoteFormData.mobile_no,
          email_id: this.quoteFormData.email_id,
          registration_date: this.quoteFormData.registration_date.year + "-" + this.quoteFormData.registration_date.month + "-" + this.quoteFormData.registration_date.day,
          have_previous_year_policy: this.quoteFormData.dontHavePreviousYearPolicy,
          policy_expiry_date: this.quoteFormData.expiry_date.getFullYear() + "-" + (this.quoteFormData.expiry_date.getMonth() + 1) + "-" + this.quoteFormData.expiry_date.getDate(),
          last_year_claim_status: this.quoteFormData.lastClaimedYear,
          rto: this.quoteFormData.rto,
          fuel_type: this.quoteFormData.fuel_type,
          vehicle_type: "Car",
          previous_insurance_company: this.quoteFormData.previous_insurance_company,
          previous_insurance_company_id: this.quoteFormData.previous_insurance_company_id,
          previous_policy_number: this.quoteFormData.previous_policy_number
        }
        this.apiService.storeVehicleHistory(payload).subscribe((data) => {
          this.localStorage.setItem('quote_form_data', this.quoteFormData).subscribe(() => {
            this.router.navigate([''], {});
          });
        });
      }
      this.closeDialog();
    } else {
      this.buttonStatus.details = true;
      // this.openDialog(vehicleConfirmationModal);
    }
  }

  prospectSubmit() {
		this.prospectSubmitted = true;
		this.prospectConfirmMsg=false;
		this.prospectConfirmErrMsg=false;

		if (this.prospectForm.invalid) {
		  return;
		} else {
			if(this.prospectForm.value.prospectPassword != this.prospectForm.value.prospectConfPassword) {
				this.prospectConfirmError = true;
				return;
			} else {
				this.prospectConfirmError = false;
				let prospectJson = {
					"prospect_name": this.prospectForm.value.prospectName,
					"prospect_phone": this.prospectForm.value.prospectPhone,
					"prospect_email": this.prospectForm.value.prospectEmail,
					"prospect_password": this.prospectForm.value.prospectPassword,
					"prospect_conf_password": this.prospectForm.value.prospectConfPassword,
					"source_value": "TWLANDING",
					"serviceUrl":""
				};

				prospectJson.serviceUrl = this.USERURL + "pos-registration.php";
				this.apiService.registration(prospectJson).subscribe((data: any) => {
					let submit_res = JSON.parse(data);

					if (submit_res.flag_proceed == true) {
						this.openSnackBar('Thank you for your interest, we will get back to you soon.', '');
						this.prospectSubmitted = false;
						this.prospectForm.reset();
						this.successProspect = true;
					} else {
						this.openSnackBar(submit_res.errMsgs, '');
						this.prospectSubmitted = false;
						//this.prospectForm.reset();
						this.successProspect = true;
					}
				});
			}
		}
	}

  homepage() {
    this.localStorage.getItem('userJson').subscribe((data: any) => {
      if (data != null) {
        if (data.role_type.toString() == "16" || data.role_type.toString() == "8" || data.role_type.toString() == "20") {
          window.location.href = "https://www.gibl.in/UI/Pages/mHome.aspx";
        } else {
          window.location.href = "https://www.gibl.in/";
        }
      } else {
        window.location.href = "https://www.gibl.in/";
      }
    });
  }


  checkLength() {
    if (this.detailsForm.value.mobile_no && this.detailsForm.value.mobile_no.toString().length > 10) {
      this.detailsForm.controls['mobile_no'].setValue(parseInt(this.detailsForm.value.mobile_no.toString().substring(0, 10)));
    }
  }

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 10000,
		});
	}

  /**
   * modal function
   */

  onNoClick() {
    this.dialogRef.close();
  }
  openDialog(modalTemplateRef): void {
    this.dialogRef = this.dialog.open(modalTemplateRef, {
      width: '600px',
      panelClass: 'new_popup_buy_now',
    });
    this.dialogRef.disableClose = true;
    this.dialogRef.afterClosed().subscribe(result => {
      this.buttonStatus.search = true;
    });
  }
  closeDialog(): void {
    this.buttonStatus.search = true;
    this.dialogRef.close(0);
  }

  /**
   * end modal function
   */

  logout() {
    this.localStorage.removeItem('userJson').subscribe(() => {
      this.quoteForm.get('userCode').setValue(0);
      this.source_user = "100173";
      this.isLoggedIn = false;
      this.white_label = 0;
    });
  }

  registrationPage() {
    window.location.href = "https://www.gibl.in/UI/Pages/Registration.aspx";
  }

  onClickManual() {
    this.router.navigate([''], {});
    this.closeDialog();
  }
}
