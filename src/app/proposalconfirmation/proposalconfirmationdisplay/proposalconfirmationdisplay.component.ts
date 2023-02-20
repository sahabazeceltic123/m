import { Component, OnInit, ViewChild, ElementRef, Inject, assertPlatform } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators,AbstractControl, ValidationErrors , FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router, ActivatedRoute } from "@angular/router";
import { AppService } from '../../service/app.service';
import statejson from '../../../assets/json/state_master.json';
import cityjson from '../../../assets/json/city_master.json';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
declare const dht: any;
@Component({
	selector: 'app-proposalconfirmationdisplay',
	templateUrl: './proposalconfirmationdisplay.component.html',
	styleUrls: ['./proposalconfirmationdisplay.component.scss', '../../../assets/confirmation/css/main.css']
})
export class ProposalconfirmationdisplayComponent implements OnInit {
	myControl = new FormControl();

	// DONE BY ARIT FOR LIVE CHAT
	localWindow:any;
	chatItem: any	={};

	filteredOptionsPrevInsurer: Observable < any > ;
	prevInsurer = [{
		id: 2,
		name: "Bajaj Allianz"
	}, {
		id: 3,
		name: "Bharti AXA"
	}, {
		id: 4,
		name: "Cholamandalam"
	}, {
		id: 5,
		name: "Future Generali"
	}, {
		id: 6,
		name: "HDFC Ergo"
	}, {
		id: 7,
		name: "ICICI Lombard"
	}, {
		id: 8,
		name: "IFFCO Tokio"
	}, {
		id: 25,
		name: "Liberty Videocon"
	}, {
		id: 21,
		name: "Magma HDI"
	}, {
		id: 10,
		name: "National Insurance"
	}, {
		id: 18,
		name: "New India"
	}, {
		id: 11,
		name: "Oriental Insurance"
	}, {
		id: 12,
		name: "Reliance General"
	}, {
		id: 13,
		name: "Royal Sundaram"
	}, {
		id: 23,
		name: "SBI General Insurance"
	}, {
		id: 26,
		name: "Shriram General Insurance"
	}, {
		id: 17,
		name: "TATA-AIG"
	}, {
		id: 15,
		name: "United India"
	}, {
		id: 16,
		name: "Universal Sompo General"
	}, {
		id: 29,
		name: "Godigit"
	}, {
		id: 30,
		name: "acko"
	}, {
		id: 31,
		name: "dhfl"
	}, {
		id: 32,
		name: "coco"
	}, {
		id: 28,
		name: "Kotak General Insurance"
	}];
	rtoPat = "[A-Za-z]{0,3}[0-9]{4}$";
	offLineOrderNo: any;
	offLineTID: any;
	offlinePaymentUrl: any;
	offlineReturnUrl: any;
	offlineCancelUrl: any;
	quoteJson: any;
	premiumJson: any;
	proposalJson: any;
	formtype: any;
	personalDetailJson: any;
	carDetailJson: any;
	nomineeDetailJson: any;
	addressDetailJson: any;
	proposalConfirmationJson: any = {};
	showQuotedata: any;
	showPremiumdata: any;
	showProposaldata: any;
	showPaymentdata: any;
	paymentUrlHDFC: any;
	paymentUrlHDFCduplicate: any;
	paymentUrlRELIANCE: any;
	DigitJsonData: any= {};
	paymentUrlDigit: any;
	showErrormsg: any;
	responseUrlRELIANCE: any;
	paymentUrlBajaj:any;
	errorContinueBuy: boolean = true;
	renewalCheckEnable:boolean	=false;
	showRenewal:boolean	=false;
	statusB2B:boolean	=true;
	custId: any;
	pre_policy_expiry_date_text: any;
	reliancedata: any;
	digitdata: any;
	relianceproposalno: any;
	relianceTotalprem: any;
	tatasrc: any;
	tataProposal_no: any;
	paymentUrlTata: any;
	premiumBreakupJson = [];
	nomineeDOBDD: any[] = [];
	nomineeDOBMM: any[] = [];
	nomineeDOBYY: any[] = [];
	FutureJsonData: any= {};
	responseCusId: any;
	APIURL: string = "";
	PHPAPIURL: string = "";
	NODEURL: string = "";
	registerForm: FormGroup;
	quoteID: any;
	TOTAL_PREMIUM: any;
	showPremiumData = false;
	PROVIDER_ID='';
	COMPANY_LOGO = '';
	COMPANY_NAME = '';
	car_fullname = '';
	inspectionMsg = '';
	customerDetailsRes: any;
	customerID: any;
	customerData: any;
	PinNumber: any;
	custName = '';
	custEmail = '';
	idv = '';
	PREMIUM_YEAR = '';
	NET_PREMIUM = '';
	SERVICE_TAX = '';
	panCard = '';
	custDOB = '';
	custPancard = '';
	quoteUrl = '';
	custDOBDD: any[] = [];
	custDOBMM: any[] = [];
	custDOBYY: any[] = [];
	stateJson: any;
	cityJson: any;
	inspectionLocJson: any;
	custStateLabel: any;
	custCityLabel: any;
	filtercityJson: any;
	rtoCodeTmp: any;
	loading = false;
	registrationNumber = '';
	previousPolicyNumber = '';
	engineeNumber = '';
	chassisNumber = '';
	pa_cover = false;
	isPayChecked = false;
	isAddon = 1;
	tab1 = true;
	tab2 = true;
	tab3 = true;
	tab4 = true;
	myHDFCLocControl = new FormControl();
	myStateControl = new FormControl();
	myCityControl = new FormControl();
	filteredOptionsHDFCLoc: Observable < any > ;
	filteredOptionsState: Observable < any > ;
	filteredOptionsCity: Observable < any > ;
	prev_policy_type = '';
	pre_policy_expiry_date:any;
	IS_LIVE: any;
	prevInsurerError = false;
	setStateErr = false;
	setCityErr = false;
	white_label = 0;
	loginUserdata: any;
	PremiumType: any;
	USERURL = "";
	role_type = 0;
	USERID: any;
	IS_RELIANCE = false;
	IS_OFFLINE = false;
	IS_HDFC = false;
	shareFormCopyMsg = false;
	associateMapping: boolean = true;
	showacodeMapErrormsg: boolean = false;
	assocReadonly: boolean = false;
	B2B_AND_B2C_USER_TYPE	=[];

	PREV_TOTAL_PREMIUM: any;

	Txnamount:any;
	TransactionNumber:any;
	proposalres:any;
	hdfc_agentCode:any;
	additionalinfo2:any;
	hdfc_prodcutCode:any;
	retailerID:any;
	BASE_URL:any;
	fname:any;
	lname:any;
	surl:any;
	curl:any;
	furl:any;
	kotak_productinfo:any;
	hash_key:any;
	merchant_key:any;
	paymentUrlKotak:any;
	paymentUrlOriental:any;
	paymentUrlSompo: any;
	paymentUrlMagma: any;
	SompoJsonData: any;
	MagmaJsonData: any;
	KotakJsonData: any;
	paymentRequestJson:any;
	paymentUrlNewindia: any;
	paymentUrlNational: any;
	paymentUrlChola: any;
	CHECKSUM_KEY: any;
	NewindiaJsonData: any;
	NationalJsonData: any;
	CholaJsonData: any;

	paymentUrlFuture:any;
	futureTransaction_no:any;
	futureProposalNo:any;
	futureUserIdentifier:any;
	futureResponseUrl:any;
	firstName:any;
	lastName:any;
	futureChecksum:any;
	oriental_finalData:any;
	wallet_result:any;
	paymentMode:any;
	pa_owner:any;

	paymentData:any;
	encryptData:any;
	access_code:any;
	dhflPaymenturl:any;
	digitPaymenturl:any;
	// CHANGE DONE BY ARIT
	providerAddonCount = 0;
	providerCoverCount	=0;
	providerAccCount	=0;
	acodeMapMessage: string = "";
	assocCode: string = "";
	affiliateParam:string	='';
	globalPremAddonArray = [];
	globalAddonArray = [{ isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }];

	globalPremCoverArray = [];
	globalAdditionalCover = [{ isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }, { isChecked: false }];

	vehicleRes: any= {};

	policyDcoumentForm: FormGroup;
	policyBajajDcoumentForm: FormGroup;
	public formData = new FormData();
	public policyBajajDcoumentFormFd = new FormData();//  For BAJAJ KYC  =========
	submitted = false;
	docUploadBtn:boolean = false;
	hideKycForm = false;

	selectDocumentType: string = "PASSPORT";

	public dialogRef: any;


	@ViewChild('hdfcSubmitBtn', {
		static: false
	}) hdfcSubmitBtn: any;

	@ViewChild('hdfcCDSubmitBtn', {
		static: false
	}) hdfcCDSubmitBtn: any;

	@ViewChild('relianceSubmitBtn', {
		static: false
	}) relianceSubmitBtn: any;
	@ViewChild('orientalSubmitBtn', {
		static: false
	}) orientalSubmitBtn: any;
	@ViewChild('tataSubmitBtn', {
		static: false
	}) tataSubmitBtn: any;
	@ViewChild('sompoSubmitBtn', {
		static: false
	}) sompoSubmitBtn: any;
	@ViewChild('magmaSubmitBtn', {
		static: false
	}) magmaSubmitBtn: any;
	@ViewChild('newindiaSubmitBtn', {
		static: false
	}) newindiaSubmitBtn: any;
	@ViewChild('nationalSubmitBtn', {
		static: false
	}) nationalSubmitBtn: any;
	@ViewChild('kotakSubmitBtn', {
		static: false
	}) kotakSubmitBtn: any;
	@ViewChild('bajajSubmitBtn', {
		static: false
	}) bajajSubmitBtn: any;
	@ViewChild('futureSubmitBtn', {
		static: false
	})futureSubmitBtn: any;
	@ViewChild('dhflSubmitBtn', {
		static: false
	})dhflSubmitBtn: any;
	@ViewChild('digitSubmitBtn', {
		static: false
	})digitSubmitBtn: any;
	@ViewChild('cholaSubmitBtn', {
		static: false
	})cholaSubmitBtn: any;
	@ViewChild('offLineSubmitBtn', {
		static: false
	}) offLineSubmitBtn: any;

	// DONE BY ARIT
	BhartiJsonData: any= {};
	@ViewChild('bhartiSubmitBtn', {
		static: false
	}) bhartiSubmitBtn: ElementRef;
	paymentUrlBharti: any;
	resMessage: any	="";

	hdfcTPCDPaymentData: any	={};
	HdfcJsonData:any;
	@ViewChild('hdfcTPCDSubmitBtn', {
		static: false
	}) hdfcTPCDSubmitBtn: ElementRef;
	@ViewChild('OfflineFileUploadForm',{
		static: true
	}) OfflineFileUploadForm:ElementRef;
	@ViewChild("kycFileUploadFormBajaj", {
		static: true,
	}) kycFileUploadFormBajaj: ElementRef;

	constructor(@Inject(DOCUMENT) private document: Document, private _snackBar: MatSnackBar, public dialog: MatDialog, private formBuilder: FormBuilder, private localStorage: LocalStorage, private router: Router, private route: ActivatedRoute, private apiService: AppService, @Inject( DOCUMENT ) public htmlDocument: HTMLDocument) {

		this.localWindow = this.document.defaultView;

		this.USERURL = this.apiService.getUserServiceURL();
		this.IS_LIVE = this.apiService.getIsLIVE();
		//this.offLineOrderNo = new Date().valueOf();
		this.offLineTID = new Date().getTime();
		let baseUrl = this.apiService.getBaseURL();
		this.APIURL = this.apiService.getServiceURL();
		this.PHPAPIURL = this.apiService.getPhpServiceURL();

		this.NODEURL = this.apiService.getNodeURL();
		this.offlinePaymentUrl = baseUrl + "payment/offline/ccavRequestHandler.php";
		this.offlineReturnUrl = baseUrl + "payment/offline/ccavResponseHandler.php";
		this.offlineCancelUrl = baseUrl + "payment/offline/ccavResponseHandler.php";
		this.responseUrlRELIANCE=baseUrl+"payment/reliance/payment-success.php";
		for (let i = 1; i <= 31; i++) {
			if (i < 10) {
				var dd = "0" + i.toString();
			} else {
				var dd = i.toString();
			}
			this.custDOBDD.push(dd);
		}
		for (let i = 1; i <= 31; i++) {
			if (i < 10) {
				var dd = "0" + i.toString();
			} else {
				var dd = i.toString();
			}
			this.nomineeDOBDD.push(dd);
		}
		for (let i = 1; i <= 12; i++) {
			if (i < 10) {
				var mm = "0" + i.toString();
			} else {
				var mm = i.toString();
			}
			this.custDOBMM.push(mm);
		}
		for (let i = 1; i <= 12; i++) {
			if (i < 10) {
				var mm = "0" + i.toString();
			} else {
				var mm = i.toString();
			}
			this.nomineeDOBMM.push(mm);
		}

		var curr_adult = new Date().getFullYear() - 18;
		var last_adult = new Date().getFullYear() - 99;

		for (let i = curr_adult; i > last_adult; i--) {
			this.custDOBYY.push(i);
		}

		var curr_nominee_adult = new Date().getFullYear() - 18;
		var last_nominee_adult = new Date().getFullYear() - 99;

		for (let i = curr_nominee_adult; i > last_nominee_adult; i--) {
			this.nomineeDOBYY.push(i);
		}

		this.showQuotedata = false;
		this.showPremiumdata = false;
		this.showProposaldata = false;
		this.showPaymentdata = true;
		this.showErrormsg=false;
		if (this.IS_LIVE == 0)
		{
			this.USERID = "100002";
			this.paymentUrlRELIANCE = "https://rgipartners.reliancegeneral.co.in/PaymentIntegration/PaymentIntegration";
			this.responseUrlRELIANCE = this.NODEURL+"car-payment/reliance/payment-success/";
		}
		else
		{
			this.USERID = "100002";
			this.paymentUrlRELIANCE = "https://rgipartners.reliancegeneral.co.in/PaymentIntegration/PaymentIntegration";
			this.responseUrlRELIANCE =  this.NODEURL+"car-payment/reliance/payment-success/";
			if (this.IS_LIVE == 2)
			{
				this.USERID = "15BRG350B05";
				this.paymentUrlRELIANCE = "https://rzonews.reliancegeneral.co.in/PaymentIntegration/PaymentIntegration";
				this.responseUrlRELIANCE = this.NODEURL + "car-payment/reliance/payment-success/";
			}
			else {

			}

		}
	}

	openDialogFileUpload(content): void {

		//this.dialogRef.updatePosition({ top: '50px' });
		this.dialogRef = this.dialog.open(content, {
			width: '610px',
			disableClose: true
			//height: '90%'
		});
		this.dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	uploadPrevPolicycopy(file) {
		if(file[0].type == "image/png" ||file[0].type == "image/jpg" || file[0].type == "image/jpeg" || file[0].type == "application/pdf" ) {
	      this.formData.append( "prev_pol_no", file[0], file[0]['name'] );
	    }
	    else{
	    	this.policyDcoumentForm.controls.doc1.reset();
	    }

	}
	uploadRCcopyFront(file) {
		if(file[0].type == "image/png" ||file[0].type == "image/jpg" || file[0].type == "image/jpeg" || file[0].type == "application/pdf" ) {
	      this.formData.append("rc_copy_front", file[0], file[0]['name']);
	    }
	    else{
	    	this.policyDcoumentForm.controls.doc2.reset();
	    }

	}
	uploadRCcopyBack(file) {
		if(file[0].type == "image/png" ||file[0].type == "image/jpg" || file[0].type == "image/jpeg" || file[0].type == "application/pdf" ) {
	      this.formData.append("rc_copy_back", file[0], file[0]['name']);
	    }
	    else{
	    	this.policyDcoumentForm.controls.doc3.reset();
	    }

	}
	uploadPanCard( file ) {
		console.log(file[0].type);
		if(file[0].type == "image/png" ||file[0].type == "image/jpg" || file[0].type == "image/jpeg" || file[0].type == "application/pdf" ) {
		    this.formData.append( "pan_card", file[0], file[0]['name'] );
		  }else{
	    	this.policyDcoumentForm.controls.doc4.reset();
	    }
	}

	// ======== For BAJAJ KYC  =========
	uploadBajajDoc(file) {
		console.log(file[0].type);
		if (
		  file[0].type == "image/png" ||
		  file[0].type == "image/jpg" ||
		  file[0].type == "image/jpeg" ||
		  file[0].type == "application/pdf"
		) {
		  this.policyBajajDcoumentFormFd.append("file_doc5", file[0], file[0]["name"]);
		} else {
		  this.policyBajajDcoumentForm.controls.doc5.reset();
		}
	}
	// ======== For BAJAJ KYC  =========

	get fileForm() { return this.policyDcoumentForm.controls; }
	get fileFormBajaj() { return this.policyBajajDcoumentForm.controls; }//  For BAJAJ KYC  =========

	uploadPolicyDocSubmit() {
		this.submitted = true;
		if (this.policyDcoumentForm.invalid) {
			return;
		}
		else {
			this.docUploadBtn=true;
			this.formData.append('userCode',this.quoteJson.user_code);
			this.formData.append('quoteId',this.quoteJson.quoteID);
			this.formData.append('responseId',this.quoteJson.uniqueID);
			this.loading=true;
			this.apiService.OflineFileUpload(this.formData).subscribe(data => {
				console.log(data);
				var res:any=data;

				if(res.status==1){
					// this.loading=false;
					this.isPayChecked=false;
					this.localStorage.getItem('quoteJson').subscribe((data: any) => {
						let quoteID = data.quoteID;

						this.offLineOrderNo = new Date().valueOf();
						this.proposalConfirmationJson.OrderID=this.offLineOrderNo;
						this.proposalConfirmationJson.serviceUrl=this.PHPAPIURL+"service.php?action=CREATE_PROPOSAL_OFFLINE&PROVIDER_ID="+this.premiumJson.PROVIDER_ID+"&PREMIUM_TYPE="+this.premiumJson.premium_type+"&OrderID="+this.offLineOrderNo;
						this.offLineProposal(quoteID, 1);
						this.onNoClick();
					});
				}
			});
		}
	}

	// ======== For BAJAJ KYC  =========
	uploadBajajPolicyDocSubmit() {
		this.submitted = true;
		// console.log(this.policyBajajDcoumentForm);return;
		if (this.policyBajajDcoumentForm.invalid) {
		  return;
		} else {
		  this.docUploadBtn = true;
		  this.policyBajajDcoumentFormFd.append("userCode", this.quoteJson.user_code);
		  this.policyBajajDcoumentFormFd.append("quoteId", this.quoteJson.quoteID);
		  this.policyBajajDcoumentFormFd.append("responseId", this.quoteJson.uniqueID);
		  this.loading = true;
		  this.apiService.OnlineFileUpload(this.policyBajajDcoumentFormFd).subscribe((data) => {
			console.log(data);
			var res: any = data;

			if(res.status==1){
				// this.loading=false;
				this.isPayChecked=false;
				this.localStorage.getItem('quoteJson').subscribe((data: any) => {
					let quoteID = data.quoteID;

					this.offLineOrderNo = new Date().valueOf();
					this.proposalConfirmationJson.OrderID=this.offLineOrderNo;
					this.proposalConfirmationJson.serviceUrl=this.PHPAPIURL+"service.php?action=CREATE_PROPOSAL_V&PROVIDER_ID="+this.premiumJson.PROVIDER_ID+"&PREMIUM_TYPE="+this.premiumJson.premium_type+"&OrderID="+this.offLineOrderNo;
					this.proposalConfirmationJson.kyc_encodedFile = res.encodedFile;
					this.proposalConfirmationJson.kyc_encodedFileExt = res.fileExt;
					this.proposalConfirmationJson.kyc_selectDocType = res.selectDocType;
					this.onLineProposal();
					this.onNoClick();
				});
			}

		  });
		}
	  }

	  public documentTypes = [
		{ Text: "PASSPORT", Value: "A" },
		{ Text: "VOTER ID", Value: "B" },
		{ Text: "DRIVING LICENSE", Value: "D" },
		{ Text: "AADHAR CARD", Value: "E" },
		{ Text: "GSTIN", Value: "G" },
	  ];
	  functionSelectDocType(val) {
		let spanContent: string = "";
		if (val == "A") {
		  spanContent = "PASSPORT";
		} else if (val == "B") {
		  spanContent = "VOTER ID";
		} else if (val == "D") {
		  spanContent = "DRIVING LICENSE";
		} else if (val == "E") {
		  spanContent = "AADHAR CARD";
		} else if (val == "G") {
		  spanContent = "GSTIN";
		} else {
		  spanContent = "PASSPORT";
		}
		this.policyBajajDcoumentFormFd.delete("selectDocType");
		this.policyBajajDcoumentFormFd.append("selectDocType", val);
		this.selectDocumentType = spanContent;
	  }
	  // ======== For BAJAJ KYC  =========


	openDialogFUTURE()
		{

			const dialogRef = this.dialog.open(AmountConfirmDialog,
			{
				width: '610px',
				data: {pev_premium: this.PREV_TOTAL_PREMIUM,new_premium: this.FutureJsonData.ACTUAL_PREMIUM}
			});
			dialogRef.afterClosed().subscribe(result => {
				//console.log(dialogRef.componentInstance.closeMessage);
				if(dialogRef.componentInstance.closeMessage =='Y')
				{
					this.futureSubmitBtn.nativeElement.click();
				}
				else{
					this.futureSubmitBtn.nativeElement.click();
				}
			});
		}
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 10000,
		});
	}
	openBreakinDialog()
	{
		const dialogRef = this.dialog.open(BreakinConfirmDialog,
		{
			width: '610px',
			data: {inspection_no: this.proposalres.TRANSACTIONID}
		});
		dialogRef.afterClosed().subscribe(result => {

		});
	}
	openDialog()
	{
		const dialogRef = this.dialog.open(AmountConfirmDialog,
		{
			width: '610px',
			data: {pev_premium: this.premiumJson.TOTAL_PREMIUM,new_premium: this.NewindiaJsonData.TOTAL_PREMIUM,COMPANY_NAME: this.premiumJson.COMPANY_NAME}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(dialogRef.componentInstance.closeMessage =='Y')
			{
				this.premiumJson.TOTAL_PREMIUM=this.NewindiaJsonData.TOTAL_PREMIUM;
				this.premiumJson.SERVICE_TAX=this.NewindiaJsonData.SERVICE_TAX;
				this.premiumJson.NET_PREMIUM=this.NewindiaJsonData.NET_PREMIUM;
				this.proposalConfirmationJson.premiumJson.TOTAL_PREMIUM=this.NewindiaJsonData.TOTAL_PREMIUM;
				this.proposalConfirmationJson.premiumJson.SERVICE_TAX=this.NewindiaJsonData.SERVICE_TAX;
				this.proposalConfirmationJson.premiumJson.NET_PREMIUM=this.NewindiaJsonData.NET_PREMIUM;
				this.localStorage.setItem('premiumJson', this.premiumJson).subscribe(() => {
					this.loading = true;
					this.newindiaCOMProposal();
					this.kotakCOMProposal();
					this.bajajCOMCDProposal();
					this.relianceCOMCDProposal();
					this.relianceTPProposal();
					this.relianceTPCDProposal();
					this.relianceODProposal();
					this.relianceCOMProposal();
				});
			}
		});
	}
	openDialogMagma()
	{
		const dialogRef = this.dialog.open(IIBConfirmDialog,
		{
			width: '610px',
			data: {TransactionID: this.MagmaJsonData.TransactionID}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(dialogRef.componentInstance.closeMessage =='Y')
			{
				this.magmaSubmitBtn.nativeElement.click();
			}
			else{
				this.magmaSubmitBtn.nativeElement.click();
			}
		});
	}

	openDialogMagmaBreakin()
	{
		const dialogRef = this.dialog.open(MAGMAConfirmDialog,
		{
			width: '610px',
			data: {ProposalNumber: this.MagmaJsonData.ProposalNumber, PreInspectionNumber: this.MagmaJsonData.PreInspectionNumber}
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	openDialogOffline(quoteID)
	{
		const dialogRef = this.dialog.open(AmountConfirmDialog,
		{
			width: '610px',
			data: {pev_premium: this.TOTAL_PREMIUM,new_premium: this.NewindiaJsonData.AMOUNT}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(dialogRef.componentInstance.closeMessage =='Y')
			{
				if (this.loginUserdata != null)
				{
					if (this.loginUserdata.role_type == 20)
					{
						this.TOTAL_PREMIUM = this.NewindiaJsonData.AMOUNT;
						this.offLineOrderNo = this.NewindiaJsonData.PROPOSAL_NO;
						this.nodeWalletCall(quoteID);
					}
				}
			}
		});
	}

	// DONE BY RUTH //
	openDialogPremiumBreakup(content): void {
		//this.dialogRef.updatePosition({ top: '50px' });
		this.dialogRef = this.dialog.open(content, {
			width: '610px',
			//panelClass:'newpop',
			//height: '90%'
		});
		this.dialogRef.disableClose = true;
		this.dialogRef.afterClosed().subscribe(result => {
		});
	}

	onNoClick() {
		this.dialogRef.close();
	}

	ngOnInit() {
		this.BASE_URL=this.apiService.getBaseURL();
		this.policyDcoumentForm = this.formBuilder.group({
			doc1: ['',Validators.required],
			doc2: ['',Validators.required],
			doc3: ['',Validators.required],
			doc4: ['',Validators.required]
		});

		this.policyBajajDcoumentForm = this.formBuilder.group({
			doc5: ["", [Validators.required]],
		}); // ======== For BAJAJ KYC  =========

		this.B2B_AND_B2C_USER_TYPE	=this.apiService.B2B_AND_B2C_USER_TYPE;
		this.localStorage.getItem('userJson').subscribe((data: any) => {
			if (data != null) {
				this.loginUserdata = data;
				this.retailerID=data.user_code;
				this.assocCode = data.associate_code;
				this.assocReadonly=true;
				if (data.white_label == '1') {
					this.white_label = 1;
				}
				if (this.loginUserdata.role_type == '20') {
					this.role_type = 1;
				}
			}
			else{
				this.retailerID=0;
			}
			if( this.white_label != 1 )
			{
				// DONE BY ARIT FOR LIVE CHAT
				this.apiService.openLiveChatbot();
			}
		});

		this.stateJson = statejson;
		this.cityJson = cityjson;
		this.registerForm = this.formBuilder.group({
			isSubmitted: ['1', [Validators.required]],
			userCode: [0],
      		createdBy: [0],
			personalDetailForm: this.formBuilder.group({
				custTitle: ['', [Validators.required]],
				custName: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z].*)([a-zA-Z\s]*)$/)]],
				custPhone: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
				custEmail: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)]],
				custGstNo: ['', [Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/g)]],
				custPancard: ['', [Validators.pattern(/^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/)]],
				custDOBDD: ['', Validators.required],
				custDOBMM: ['', Validators.required],
				custDOBYY: ['', Validators.required],
				custId: [''],
				companyTitle: ['M/S', []],
				isOwnerCompany: [''],
				companyName: ['', []],
				OrganizationContactPersonName : ['', []]
			}),
			carDetailForm: this.formBuilder.group({
				rtoCode: ['', []],
				rtoregNumber: ['', [Validators.required, Validators.pattern(this.rtoPat)]],
				prevPolicyNo: ['', [Validators.required]],
				prevInsurer: ['', [Validators.required]],
				prevInsurer_id: [''],
				engineNo: ['', [Validators.required, Validators.minLength(6)]],
				chassisNo: ['', [Validators.required, Validators.minLength(6)]],
				isLoan: ['0', [Validators.required]],
				financierName: [''],
				financierBranchName: [''],
			}),
			nomineeDetailForm: this.formBuilder.group({
				nomineeTitle: ['', [Validators.required]],
				nomineeName: ['', [Validators.required , Validators.pattern(/^(?=.*[a-zA-Z].*)([a-zA-Z\s]*)$/)]],
				nomineeAge: [''],
				nomineeDOBDD: [''],
				nomineeDOBMM: [''],
				nomineeDOBYY: [''],
				nomineeRelation: ['', [Validators.required]]
			}),
			addressDetailForm: this.formBuilder.group({
				custAddress: ['', [Validators.required]],
				custState: ['', [Validators.required]],
				custCity: ['', [Validators.required]],
				custPincode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
				custStateLabel: [''],
				custCityLabel: [''],
			})
		});

		/* this.localStorage.getItem('premiumJson').subscribe((data: any) => {
			this.premiumJson = data;
			if(this.premiumJson.PROVIDER_ID == '21')
			{

				this.nomineeDetailForm.get('nomineeDOBDD').setValidators([Validators.required]);
				this.nomineeDetailForm.get('nomineeDOBMM').setValidators([Validators.required]);
				this.nomineeDetailForm.get('nomineeDOBYY').setValidators([Validators.required]);
			}
			else
			{
				this.nomineeDetailForm.get('nomineeAge').setValidators([Validators.required,Validators.pattern(/^\d*$/), this.ageRangeValidator(18, 120)]);
			}
		}); */

		this.filteredOptionsPrevInsurer = this.myControl.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
		this.filteredOptionsState = this.myStateControl.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterState(value))
		);



		this.route.queryParams.subscribe(params => {
			if(params.QID!=null)
			{
				this.getProposalData(params.QID);
			}
			else
			{
				this.getQuoteJson();

			}
			if(params.ISRENEWAL!=null && params.ISRENEWAL==1)
			{
				this.showRenewal=true;
			}
			else
			{
				this.showRenewal=false;
			}
		});
		// DONE BY ARIT FOR LIVE CHAT

		// PARSE AFFILIATE LINK
		let full_url = this.router.url.split('?')[0];
		let url_segment = full_url.split('/');
		url_segment.forEach(el => {
			let affilate_index = this.apiService.affiliateList.indexOf(el);
			if( affilate_index !== -1 ){
				this.affiliateParam	=el;
			}
		});

		this.localStorage.getItem('quoteJson').subscribe((data: any) => {
			if (data != null) {
				//data.zero_dep = 0;
				if(data.zero_dep == 1)
				{
					this.isAddon = 1;
				}
				else
				{
					this.isAddon = 0;
				}
			}


			// kyccode
			this.localStorage.getItem('premiumJson').subscribe((prem:any) => {

				let sendDataTP:any	={};
				sendDataTP.car_id	=data.car_id;
				sendDataTP.rto_code	=data.rto_code;
				sendDataTP.policy_sub_type =((prem.PREMIUM_TYPE==3)?2:prem.PREMIUM_TYPE);
				this.apiService.getPriorityData(sendDataTP).subscribe(pririty_list_tp_data => {
					let priority_tp_data:any	=JSON.parse(pririty_list_tp_data.toString());
					let insurer_arr = priority_tp_data.insurer_id;
					console.log('pririty_list_tp_data=>',insurer_arr);
					var target=insurer_arr.find(temp=>temp==prem.PROVIDER_ID);
					if(target){
					  this.hideKycForm =true;
					}
				});
			});
			// kyccode


		});
	}



	homepage()
	{
		this.localStorage.getItem('userJson').subscribe((data: any) => {
			if (data != null) {
				if(data.role_type.toString()=="16" || data.role_type.toString()=="8")
				{
					window.location.href="https://www.gibl.in/UI/Pages/mHome.aspx";
				}
				else
				{
					window.location.href="https://www.gibl.in/";
				}
			}
			else
			{
				window.location.href="https://www.gibl.in/";
			}
		});
	}
	UserTrackData(quoteJson){
	}
	iterateAddonFeature() {
		this.providerAddonCount	=this.providerAddonCount+1;
    }
	copyToClipboard()
	{
		//alert(refferalLink);
		var tempInput = document.createElement("input");
		tempInput.value = this.quoteUrl;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy");
		document.body.removeChild(tempInput);

		this.shareFormCopyMsg=true;
	}
	getProposalData(QID)
	{
		this.apiService.getquotesdetails(QID).subscribe(data => {
			let resData=data.toString();
			let proposalStoredJSON : any;
			proposalStoredJSON=resData;
			proposalStoredJSON=JSON.parse(proposalStoredJSON);
			this.localStorage.setItem('proposalJson', proposalStoredJSON.proposalJson).subscribe(() => {

					this.localStorage.setItem('quoteJson', proposalStoredJSON.quoteJson).subscribe(() => {
						this.localStorage.setItem('premiumJson', proposalStoredJSON.premiumJson).subscribe(() => {
							this.localStorage.setItem('quoteID', proposalStoredJSON.premiumJson.LAST_QUOTE_ID).subscribe(() => {
								this.getQuoteJson();
							});
						});
					});

			});
		});
	}

	globalAddonChecked(event, v,bool=true)
	{
		if (event.checked)
		{
			if (v == 0) { this.quoteJson.zero_dep = 1; }
			if (v == 1) { this.quoteJson.roadside_assistance = 1; }
			if (v == 2) { this.quoteJson.engine_protector = 1; }
			if (v == 3) { this.quoteJson.ncb_protector = 1; }
			if (v == 4) { this.quoteJson.loss_key_cover = 1; }
			if (v == 5) { this.quoteJson.consumable_cover = 1; }
			if (v == 6) { this.quoteJson.daily_allowance = 1; }
			if (v == 7) { this.quoteJson.invoice_return = 1; }
			if (v == 8) { this.quoteJson.tyre_cover = 1; }
			if (v == 9) { this.quoteJson.rim_damage = 1; }
			if (v ==10) { this.quoteJson.personal_cover = 1; }
			if (v ==11) { this.quoteJson.travel_cover = 1; }
			if (v ==12) { this.quoteJson.medical_cover = 1; }

			//if (v == 10) { this.quoteJson.personal_cover = 1; }
			this.globalAddonArray[v].isChecked = true;
			this.localStorage.setItem('globalAddonArray', this.globalAddonArray).subscribe(() => { });

			if (this.premiumJson.ADDON_ITEMS[v] && !this.premiumJson.ADDON_ITEMS[v].isChecked == true)
			{
				let total_addon_val = 0;
				let rsa_val = 0;
				if(bool==true && (v == 0 ||v == 2 ||v == 3 ||v == 5 ||v == 8)){

					total_addon_val = total_addon_val + parseFloat(this.premiumJson.ADDON_ITEMS[v].value);
					//this.premiumJson.ADDON_ITEMS[v].isChecked = true;
				}

				else
				{
					total_addon_val = parseFloat(this.premiumJson.ADDON_ITEMS[v].value);
					//this.premiumJson.ADDON_ITEMS[v].isChecked = true;
				}

				let total_net_premium = parseFloat(this.premiumJson.NET_PREMIUM) + total_addon_val;
				let service_tax;
				service_tax = Math.round(total_net_premium * .18);
				let total_premium = total_net_premium + service_tax;
				this.premiumJson.NET_PREMIUM = total_net_premium;
				this.premiumJson.SERVICE_TAX = service_tax;
				this.premiumJson.TOTAL_PREMIUM = total_premium+rsa_val;
				let prem_key = this.premiumJson.PROVIDER_ID;
				this.globalPremAddonArray[prem_key]=this.premiumJson.ADDON_ITEMS;
				this.localStorage.setItem('globalPremAddonArray', this.globalPremAddonArray).subscribe(() => { });
				this.localStorage.setItem('premiumJson', this.premiumJson).subscribe(() => {});
				this.localStorage.setItem('quoteJson', this.quoteJson).subscribe(() => {});
			}
		}
		else
		{
			if (v == 0) { this.quoteJson.zero_dep = 0; }
			if (v == 1) { this.quoteJson.roadside_assistance = 0; }
			if (v == 2) { this.quoteJson.engine_protector = 0; }
			if (v == 3) { this.quoteJson.ncb_protector = 0; }
			if (v == 4) { this.quoteJson.loss_key_cover = 0; }
			if (v == 5) { this.quoteJson.consumable_cover = 0; }
			if (v == 5) { this.quoteJson.daily_allowance = 0; }
			if (v == 7) { this.quoteJson.invoice_return = 0; }
			if (v == 8) { this.quoteJson.tyre_cover = 0; }
			if (v == 9) { this.quoteJson.rim_damage = 0; }
			if (v ==10) { this.quoteJson.personal_cover = 0; }
			if (v ==11) { this.quoteJson.travel_cover = 0; }
			if (v ==12) { this.quoteJson.medical_cover = 0; }
			//if (v == 10) { this.quoteJson.personal_cover = 0; }
			this.globalAddonArray[v].isChecked = false;
			this.localStorage.setItem('globalAddonArray', this.globalAddonArray).subscribe(() => { });
			if (this.premiumJson.ADDON_ITEMS[v] && this.premiumJson.ADDON_ITEMS[v].isChecked== false)
			{
				let total_addon_val = 0;
				let rsa_val =0;
				let total_net_premium = parseFloat(this.premiumJson.NET_PREMIUM);

				if(bool==true && (v == 0 ||v == 2 ||v == 3 ||v == 5 ||v == 8))
				{
					total_addon_val = parseFloat(this.premiumJson.ADDON_ITEMS[v].value);
					//this.premiumJson.ADDON_ITEMS[v].isChecked = false;
					total_net_premium = parseFloat(this.premiumJson.NET_PREMIUM) - total_addon_val;
				}
				else
				{
					total_addon_val = parseFloat(this.premiumJson.ADDON_ITEMS[v].value);
					//this.premiumJson.ADDON_ITEMS[v].isChecked = false;
					total_net_premium = parseFloat(this.premiumJson.NET_PREMIUM) - total_addon_val;
				}
				let service_tax;
				service_tax = Math.round(total_net_premium * .18);
				let total_premium = total_net_premium + service_tax;
				this.premiumJson.NET_PREMIUM = total_net_premium;
				this.premiumJson.SERVICE_TAX = service_tax;
				this.premiumJson.TOTAL_PREMIUM = total_premium-rsa_val;
				let prem_key = this.premiumJson.PROVIDER_ID;
				this.globalPremAddonArray[prem_key]=this.premiumJson.ADDON_ITEMS;
				this.localStorage.setItem('globalPremAddonArray', this.globalPremAddonArray).subscribe(() => { });
				this.localStorage.setItem('premiumJson', this.premiumJson).subscribe(() => {});
				this.localStorage.setItem('quoteJson', this.quoteJson).subscribe(() => {});
			}
		}
	}

	globalCoverChecked(event, v,bool=true)
	{
		if (event.checked)
		{
			if (v == 1) { this.quoteJson.pa_owner = 1; }
			this.globalAdditionalCover[v].isChecked = true;
			this.localStorage.setItem('globalAdditionalCover', this.globalAdditionalCover).subscribe(() => { });

			if (this.premiumJson.COVER_ITEMS[v] && !this.premiumJson.COVER_ITEMS[v].isChecked == true)
			{
				let total_addon_val = 0;
				let rsa_val = 0;
				if(bool==true && (v == 1)){
				total_addon_val = total_addon_val + parseFloat(this.premiumJson.COVER_ITEMS[v].value);
				}
				else
				{
					total_addon_val = parseFloat(this.premiumJson.COVER_ITEMS[v].value);

				}


				let total_net_premium = parseFloat(this.premiumJson.NET_PREMIUM) + total_addon_val;
				let service_tax;
				service_tax = Math.round(total_net_premium * .18);
				let total_premium = total_net_premium + service_tax;
				this.premiumJson.NET_PREMIUM = total_net_premium;
				this.premiumJson.SERVICE_TAX = service_tax;
				this.premiumJson.TOTAL_PREMIUM = total_premium+rsa_val;
				let prem_key = this.premiumJson.PROVIDER_ID;
				this.globalPremCoverArray[prem_key]=this.premiumJson.COVER_ITEMS;
				this.localStorage.setItem('globalAdditionalCover', this.globalPremCoverArray).subscribe(() => { });
				this.localStorage.setItem('premiumJson', this.premiumJson).subscribe(() => {});
				this.localStorage.setItem('quoteJson', this.quoteJson).subscribe(() => {});
			}
		}
		else
		{
			if (v == 1) { this.quoteJson.pa_owner = 0; }
			this.globalAdditionalCover[v].isChecked = false;
			this.localStorage.setItem('globalAdditionalCover', this.globalAdditionalCover).subscribe(() => { });
			if (this.premiumJson.COVER_ITEMS[v] && this.premiumJson.COVER_ITEMS[v].isChecked== false)
			{
				let total_addon_val = 0;
				let rsa_val =0;
				let total_net_premium = parseFloat(this.premiumJson.NET_PREMIUM);

				if(bool==true && (v == 1))
				{
					total_addon_val = parseFloat(this.premiumJson.COVER_ITEMS[v].value);
					total_net_premium = parseFloat(this.premiumJson.NET_PREMIUM) - total_addon_val;
				}
				else
				{
					total_addon_val = parseFloat(this.premiumJson.COVER_ITEMS[v].value);
					total_net_premium = parseFloat(this.premiumJson.NET_PREMIUM) - total_addon_val;
				}
				let service_tax;
				service_tax = Math.round(total_net_premium * .18);
				let total_premium = total_net_premium + service_tax;
				this.premiumJson.NET_PREMIUM = total_net_premium;
				this.premiumJson.SERVICE_TAX = service_tax;
				this.premiumJson.TOTAL_PREMIUM = total_premium-rsa_val;
				let prem_key = this.premiumJson.PROVIDER_ID;
				this.globalPremCoverArray[prem_key]=this.premiumJson.COVER_ITEMS;
				this.localStorage.setItem('globalAdditionalCover', this.globalPremCoverArray).subscribe(() => { });
				this.localStorage.setItem('premiumJson', this.premiumJson).subscribe(() => {});
				this.localStorage.setItem('quoteJson', this.quoteJson).subscribe(() => {});
			}
		}
	}

	getQuoteJson() {
		this.localStorage.getItem('premiumJson').subscribe((data) => {
			this.premiumJson = data;
			if(this.premiumJson.PROVIDER_ID==6 && this.premiumJson.IS_BREAKIN)
			{
				this.apiService.getHDFCBreakinLocation().subscribe(data => {
					let resData=JSON.parse(JSON.stringify(data));
					this.inspectionLocJson = resData;
					this.filteredOptionsHDFCLoc = this.myHDFCLocControl.valueChanges
						.pipe(
							startWith(''),
							map(value => this._filterLoc(value))
					);
				});
			}
		})
		this.localStorage.getItem('quoteJson').subscribe((data) => {
			this.quoteJson = data;
			// CHANGE DONE BY ARIT
			this.calculateCoverAccCount();
			// CHANGE DONE BY ARIT ENDS HERE
			let ped = this.quoteJson.pre_policy_expiry_date;
			let previous_policy_exp_date = ped.month + '/' + ped.day + '/' + ped.year;
			this.pre_policy_expiry_date = new Date(previous_policy_exp_date);
			let ped_month = this.pre_policy_expiry_date.toLocaleString('default', { month: 'short' });
			this.pre_policy_expiry_date_text = ped.day + ' ' + ped_month + ' ' + ped.year;
			this.quoteUrl=window.location.href;
			this.quoteUrl=this.quoteUrl+"?QID="+this.quoteJson.quoteID;

			let userTrackData={
				"unique_id":this.quoteJson.uniqueID,
				"quote_id":this.quoteJson.quoteID,
				"page_id":"5",
				"created_by":this.quoteJson.source_user,
			};

			this.apiService.TrackUserSubmit(userTrackData).subscribe(data => {
			});

			if (this.quoteJson.isThirdParty)
			{
				this.prev_policy_type = 'thirdParty';
			}
			else
			{
				this.prev_policy_type = 'Comprehensive';
			}
			this.car_fullname = this.quoteJson.car_fullname;
			this.showQuotedata = true;
			this.formtype = this.quoteJson.form_premium_type;
			if (this.formtype == 0) {
				this.carDetailForm.get('rtoregNumber').setValidators([]);
				this.carDetailForm.get('rtoregNumber').updateValueAndValidity();
				this.carDetailForm.get('prevPolicyNo').setValidators([]);
				this.carDetailForm.get('prevPolicyNo').updateValueAndValidity();
			}
			this.proposalConfirmationJson.quoteJson = this.quoteJson;
			var rto = this.quoteJson.rto_code; //.replace('-', '');
			var stringArray = rto.split(" ");
			rto = stringArray[0];
			this.carDetailForm.patchValue({
				"rtoCode": stringArray[0].replace('-', '')
			});
			this.rtoCodeTmp = stringArray[0].replace('-', '');
			this.getPremiumJson();
		});
	}


	private _filter(value: string): any {
		const filterValue = value.toLowerCase();
		return this.prevInsurer.filter(option => option.name.toLowerCase().includes(filterValue));
	}
	setInsurer(name, id) {
		this.prevInsurerError = false;
		this.carDetailForm.get('prevInsurer').setValue(name);
		this.carDetailForm.get('prevInsurer_id').setValue(id);
	}
	keyinputPrevInsurer(value) {
		this.prevInsurerError = true;
		this.carDetailForm.get('prevInsurer').setValue('');
	}
	private _filterState(value: string): any {
		const filterValue = value.toLowerCase();
		return this.stateJson.filter(option => option.sname.toLowerCase().includes(filterValue));
	}
	private _filterLoc(value: string): any {
		const filterValue = value.toLowerCase();
		return this.inspectionLocJson.filter(option => option.TXT_LOCATIONNAME.toLowerCase().includes(filterValue));
	}
	private _filterCity(value: string): any {
		const filterValue = value.toLowerCase();
		return this.filtercityJson.filter(option => option.city_name.toLowerCase().includes(filterValue));
	}
	ageRangeValidator(min: number, max: number): any {
		return (control: any): {
			[key: string]: boolean
		} | null => {
			if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
				return {
					'ageRange': true
				};
			}
			return null;
		};
	}
	setState(id, name) {
		this.setStateErr = false;
		this.addressDetailForm.get('custState').setValue(id);
		this.addressDetailForm.get('custStateLabel').setValue(name);
		this.filteredOptionsCity = this.myCityControl.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCity(value))
			);
	}
	resetStateErr(value) {
		this.myCityControl.setValue('');
		this.setStateErr = true;
		this.addressDetailForm.get('custState').setValue('');
	}
	setCity(id, name) {
		this.setCityErr = false;
		this.addressDetailForm.get('custCity').setValue(id);
		this.addressDetailForm.get('custCityLabel').setValue(name);
	}
	resetCityErr(value) {
		this.setCityErr = true;
		this.addressDetailForm.get('custCity').setValue('');
	}
	setTabDisplay(v) {
		if (v == 1 && this.tab1 == false)
			this.tab1 = true;
		else
			this.tab1 = false;
		if (v == 2 && this.tab2 == false)
			this.tab2 = true;
		else
			this.tab2 = false;
		if (v == 3 && this.tab3 == false)
			this.tab3 = true;
		else
			this.tab3 = false;
		if (v == 4 && this.tab4 == false)
			this.tab4 = true;
		else
			this.tab4 = false;
	}
	payNow(event) {
		if (event.checked)
			this.isPayChecked = true;
		else
			this.isPayChecked = false;
	}
	get f() {
		return ( < FormGroup > this.registerForm.get('personalDetailForm')).controls;
	}
	get c() {
		return ( < FormGroup > this.registerForm.get('carDetailForm')).controls;
	}
	get n() {
		return ( < FormGroup > this.registerForm.get('nomineeDetailForm')).controls;
	}
	get a() {
		return ( < FormGroup > this.registerForm.get('addressDetailForm')).controls;
	}

	step = -1;

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}

	email = new FormControl('', [Validators.required, Validators.email]);

	getErrorMessage() {
		return this.email.hasError('required') ? 'You must enter a value' :
			this.email.hasError('email') ? 'Not a valid email' :
			'';
	}


	getPremiumJson()
	{
		this.localStorage.getItem('premiumJson').subscribe((data) => {
			this.premiumJson = data;
			if (this.premiumJson.COVER_ITEMS[0].isChecked)
				this.pa_cover = true;
			this.responseUrlRELIANCE = this.responseUrlRELIANCE + this.premiumJson.PROVIDER_ID;
			this.showPremiumdata = true;
			this.idv = this.premiumJson.IDV;
			this.PROVIDER_ID = this.premiumJson.PROVIDER_ID;
			this.COMPANY_LOGO = this.premiumJson.COMPANY_LOGO;
			this.COMPANY_NAME = this.premiumJson.COMPANY_NAME;
			this.PREMIUM_YEAR = this.premiumJson.PREMIUM_YEAR;
			this.TOTAL_PREMIUM = this.premiumJson.TOTAL_PREMIUM;
			this.NET_PREMIUM = this.premiumJson.NET_PREMIUM;
			this.SERVICE_TAX = this.premiumJson.SERVICE_TAX;
			this.proposalConfirmationJson.premiumJson = this.premiumJson;
			this.getProposalJson();

			this.showPremiumData = true;
		});
	}

	getProposalJson()
	{
		this.loading = false;
		this.localStorage.getItem('proposalJson').subscribe((data) => {
			this.proposalJson = data;
			this.personalDetailJson = this.proposalJson.personalDetailForm;
			this.carDetailJson = this.proposalJson.carDetailForm;
			this.nomineeDetailJson = this.proposalJson.nomineeDetailForm;
			this.addressDetailJson = this.proposalJson.addressDetailForm;

			this.showProposaldata = true;
			this.proposalConfirmationJson.proposalJson = this.proposalJson;
			this.proposalConfirmationJson.proposalJson.paymentUrl = this.quoteUrl;
			this.personalDetailForm.get('custTitle').setValue(this.proposalJson.personalDetailForm.custTitle);
			this.personalDetailForm.get('custName').setValue(this.proposalJson.personalDetailForm.custName);
			this.personalDetailForm.get('isOwnerCompany').setValue(this.proposalJson.personalDetailForm.isOwnerCompany);
			this.personalDetailForm.get('companyName').setValue(this.proposalJson.personalDetailForm.companyName);
			this.personalDetailForm.get('OrganizationContactPersonName').setValue(this.proposalJson.personalDetailForm.OrganizationContactPersonName);
			this.personalDetailForm.get('custGstNo').setValue(this.proposalJson.personalDetailForm.custGstNo);
			this.personalDetailForm.get('custPhone').setValue(this.proposalJson.personalDetailForm.custPhone);
			this.personalDetailForm.get('custPancard').setValue(this.proposalJson.personalDetailForm.custPancard);
			this.personalDetailForm.get('custEmail').setValue(this.proposalJson.personalDetailForm.custEmail);
			this.personalDetailForm.get('custDOBDD').setValue(this.proposalJson.personalDetailForm.custDOBDD);
			this.personalDetailForm.get('custDOBMM').setValue(this.proposalJson.personalDetailForm.custDOBMM);
			this.personalDetailForm.get('custDOBYY').setValue(this.proposalJson.personalDetailForm.custDOBYY);
			this.personalDetailForm.get('custDOBYY').setValue(this.proposalJson.personalDetailForm.custDOBYY);
			this.personalDetailForm.get('custId').setValue(this.proposalJson.personalDetailForm.custId);
			this.carDetailForm.get('rtoregNumber').setValue(this.proposalJson.carDetailForm.rtoregNumber);

			this.carDetailForm.get('isLoan').setValue(this.proposalJson.carDetailForm.isLoan);
			this.isLoanVm(this.proposalJson.carDetailForm.isLoan);
			this.carDetailForm.get('financierName').setValue(this.proposalJson.carDetailForm.financierName);
			this.carDetailForm.get('financierBranchName').setValue(this.proposalJson.carDetailForm.financierBranchName);
			this.carDetailForm.get('prevInsurer').setValue(this.proposalJson.carDetailForm.prevInsurer);
			this.carDetailForm.get('prevInsurer_id').setValue(this.proposalJson.carDetailForm.prevInsurer_id);
			this.myControl.setValue(this.proposalJson.carDetailForm.prevInsurer);
			this.carDetailForm.get('prevPolicyNo').setValue(this.proposalJson.carDetailForm.prevPolicyNo);
			this.carDetailForm.get('engineNo').setValue(this.proposalJson.carDetailForm.engineNo);
			this.carDetailForm.get('chassisNo').setValue(this.proposalJson.carDetailForm.chassisNo);

			this.addressDetailForm.get('custAddress').setValue(this.proposalJson.addressDetailForm.custAddress);
			//this.getCity(event, this.proposalJson.addressDetailForm.custState);

			this.addressDetailForm.get('custStateLabel').setValue(this.proposalJson.addressDetailForm.custStateLabel);
			this.addressDetailForm.get('custState').setValue(this.proposalJson.addressDetailForm.custState);
			this.myStateControl.setValue(this.proposalJson.addressDetailForm.custStateLabel);
			this.addressDetailForm.get('custCityLabel').setValue(this.proposalJson.addressDetailForm.custCityLabel);
			this.addressDetailForm.get('custCity').setValue(this.proposalJson.addressDetailForm.custCity);
			this.myCityControl.setValue(this.proposalJson.addressDetailForm.custCityLabel);
			this.addressDetailForm.get('custPincode').setValue(this.proposalJson.addressDetailForm.custPincode);

			this.nomineeDetailForm.get('nomineeTitle').setValue(this.proposalJson.nomineeDetailForm.nomineeTitle);
			this.nomineeDetailForm.get('nomineeName').setValue(this.proposalJson.nomineeDetailForm.nomineeName);
			this.nomineeDetailForm.get('nomineeAge').setValue(this.proposalJson.nomineeDetailForm.nomineeAge);
			this.nomineeDetailForm.get('nomineeDOBDD').setValue(this.proposalJson.nomineeDetailForm.nomineeDOBDD);
			this.nomineeDetailForm.get('nomineeDOBMM').setValue(this.proposalJson.nomineeDetailForm.nomineeDOBMM);
			this.nomineeDetailForm.get('nomineeDOBYY').setValue(this.proposalJson.nomineeDetailForm.nomineeDOBYY);
			this.nomineeDetailForm.get('nomineeRelation').setValue(this.proposalJson.nomineeDetailForm.nomineeRelation);
			this.updateProposalRawJson(); // update Proposal_raw_json column in quote table
		});
	}
	updateProposalRawJson()
	{
		this.localStorage.getItem('userJson').subscribe((data: any) => {
			this.proposalConfirmationJson.userJson = data;
			if(this.proposalJson.isSubmitted=="1")
			{
				this.storeProposalJson();
				//this.updateQuote();
			}
			else
			{
				this.isPayChecked = true;
			}
		});
	}
	storeProposalJson()
	{
		//this.loading = true;
		//this.showPaymentdata = false;

		if(this.quoteJson.user_code==0)
		{
			this.createUser();
		}
		else
		{
			this.registerForm.get('userCode').setValue(this.retailerID);

			this.registerForm.get('createdBy').setValue(this.quoteJson.user_code);
			this.localStorage.setItem('proposalJson', this.registerForm.value).subscribe((data) => {

			});
			this.createCustomer();
		}
		this.saveCar();
	}
	createUser()
	{
		let userJson = {
			proposalJson: this.registerForm.value,
			serviceUrl: ""
		}
		userJson.serviceUrl = this.USERURL + "registration.php";
		this.apiService.registration(userJson).subscribe(data => {
			let user_code_res = data.toString();
			this.registerForm.get('userCode').setValue(user_code_res);

			this.proposalJson.userCode=user_code_res;
			this.localStorage.setItem('proposalJson', this.registerForm.value).subscribe((data) => {
				this.createCustomer();
			});
		})
	}
	/*
	createCustomer(){
		this.apiService.saveCustomer(this.proposalConfirmationJson).subscribe((response:any) => {
			console.log("save Customer", response);
			if(response.success == true)
			{
				this.isPayChecked = true;
				this.proposalJson.isSubmitted='0';
				this.localStorage.setItem('proposalJson', this.proposalJson).subscribe(() => {});
				this.customerDetailsRes = response.data;
				 this.customerID = this.customerDetailsRes.custID;
				 console.log("save proposal", this.customerID);
				 //this.createProposal();
			}else{

				this.openSnackBar(response.message, '');
			}
		})
	}
	*/
	track_button(buttonClassname)
	{
		let userTrackData={
			"unique_id":this.quoteJson.uniqueID,
			"quote_id":this.quoteJson.quoteID,
			"page_id":"5",
			"btn_id":buttonClassname,
			"serviceUrl":""
		};
		this.apiService.track_button(userTrackData).subscribe(data => {});
	}
	createCustomer()
	{
		this.apiService.createCustomerByPHP(this.proposalConfirmationJson).subscribe((response:any) => {
			this.isPayChecked = true;
			this.proposalJson.isSubmitted='0';
			this.localStorage.setItem('proposalJson', this.proposalJson).subscribe(() => {});
		})
	}

	saveCar(){
		this.apiService.saveCarData(this.proposalConfirmationJson).subscribe(data => {});
	}
	updateQuote()
	{
		this.apiService.updateQuote(this.proposalConfirmationJson).subscribe(data => {
			//console.log('UpdateQuote',data);
		});
	}

	magmaAddon(event)
	{
		if (event.checked)
		{
			this.isAddon = 1;
		}
		else
		{
			this.isAddon = 0;
		}
		this.proposalJson.isAddon= this.isAddon;
		this.localStorage.setItem('proposalJson', this.proposalJson).subscribe(() => {});
	}

	get personalDetailForm() {
		return this.registerForm.get('personalDetailForm');
	}
	get carDetailForm() {
		return this.registerForm.get('carDetailForm');
	}
	get nomineeDetailForm() {
		return this.registerForm.get('nomineeDetailForm');
	}
	get addressDetailForm() {
		return this.registerForm.get('addressDetailForm');
	}
	personalDetailSubmit() {
		this.localStorage.setItem('proposalJson', this.registerForm.value).subscribe(() => {
			this.localStorage.getItem('proposalJson').subscribe((data) => {
				this.proposalJson = data;
				this.isPayChecked = false;
				this.getProposalJson();
			});
		});
	}
	getUserJsonAgainstAC(associate_code)
	{
		associate_code =associate_code.trim();
		if(associate_code!="")
		{
			this.associateMapping = false;
			this.acodeMapMessage = "";
			this.showacodeMapErrormsg = false;

			let loginJson = {
				"acode": associate_code,
				"serviceUrl": ""
			};
			loginJson.serviceUrl = this.USERURL + "login.php?TYPE=4";
			this.apiService.signIn(loginJson).subscribe(data => {
				let res:any=data;
				let rd=JSON.parse(res);
				let userCode = rd.user_code;
				if(userCode > 0)
				{
					let user_json={"role_type":rd.role_type};
					this.proposalConfirmationJson['userJson'] = user_json;
					this.proposalConfirmationJson.quoteJson.user_code = userCode;
					this.localStorage.setItem('userJson', this.proposalConfirmationJson.userJson).subscribe(() => {});
					this.localStorage.setItem('quoteJson', this.proposalConfirmationJson.quoteJson).subscribe(() => {
						this.associateMapping = true;
						this.acodeMapMessage = "Successfully mapped with associate code.";
						this.showacodeMapErrormsg = true;
						this.mapAcodeWithQuote(userCode);
					});
				}
				else
				{
					this.acodeMapMessage = "You have entered wrong associate code.";
					this.showacodeMapErrormsg = true;
				}
			});
		}
	}
	mapAcodeWithQuote(userCode)
	{
		let getquoteJson={
			"QID":this.proposalConfirmationJson.premiumJson.QUOTE_ID,
			"userCode":userCode,
			"serviceUrl":""
		};

		this.apiService.mapAssoc(getquoteJson).subscribe(data => {
		});
	}
	isLoanVm(flag) {
		if (flag == 1) {
			this.carDetailForm.get('financierName').setValidators([Validators.required]);
			this.carDetailForm.get('financierBranchName').setValidators([Validators.required]);
		} else {
			this.carDetailForm.get('financierName').setValidators([]);
			this.carDetailForm.get('financierBranchName').setValidators([]);
		}
		this.carDetailForm.get('financierName').updateValueAndValidity();
		this.carDetailForm.get('financierBranchName').updateValueAndValidity();
	}

	getCity(id) {
		var filter_city = [];
		this.cityJson.forEach(el => {
			if (el.state_id == id) {
				filter_city.push(el);
			}
		});
		this.filtercityJson = filter_city;
	}
	cityChanged(event) {
		let target = event.source.selected._element.nativeElement;
		this.custCityLabel = target.innerText.trim();
		this.addressDetailForm.get('custCityLabel').setValue(target.innerText.trim());
	}
	premiumBreakup(premiumItem)
	{
		this.premiumBreakupJson = [];
		this.premiumBreakupJson.push(premiumItem);
	}
	openDialog2(content): void {
		//this.dialogRef.updatePosition({ top: '50px' });
		this.dialogRef = this.dialog.open(content, {
			width: '610px',
			//panelClass:'newpop',
			//height: '90%'
		});
		this.dialogRef.disableClose = true;
		this.dialogRef.afterClosed().subscribe(result => {
		});
	}
	userTrack()
	{
		this.localStorage.getItem('quoteJson').subscribe((data: any) => {
			let quoteID = data.quoteID;
			let trackingdetails = data;
			this.PremiumType = data.form_premium_type;
			this.proposalConfirmationJson.premiumJson.LAST_QUOTE_ID = quoteID;
			this.proposalConfirmationJson.premiumJson.QUOTE_ID = this.quoteID;
			this.customerData = this.proposalConfirmationJson.proposalJson.personalDetailForm;
			/** Tracking visitor */
			let userTrackData={
				"unique_id":trackingdetails.uniqueID,
				"quote_id":trackingdetails.quoteID,
				"page_id":"6",
				"created_by":this.customerID,
			};
			this.apiService.TrackUserSubmit(userTrackData).subscribe(data => {});
		})
	}
	checkPOSWallet(){
		if( this.proposalConfirmationJson.userJson && this.proposalConfirmationJson.userJson.role_type
		&& this.B2B_AND_B2C_USER_TYPE.includes(+this.proposalConfirmationJson.userJson.role_type) ){
			let wallet_balance	=+this.proposalConfirmationJson.userJson.wallet_balance;
			let total_amount	=+this.premiumJson.TOTAL_PREMIUM;
			if( total_amount>wallet_balance ){
				this.statusB2B=false;
				this.posWalletPopup();
			}
		}
	}

	createProposal(){
		if((this.IS_LIVE=='2' && !this.hideKycForm) || this.premiumJson.PROVIDER_ID==13){
			this.openDialogFileUpload(this.OfflineFileUploadForm);return;
		}
		else{
			dht('GIBL_PAYMENT_PROCESS', this.premiumJson);
			if( this.quoteJson.b2b==1 ){
				this.checkPOSWallet();
			}

			if(this.statusB2B) {
				if(this.premiumJson.PROVIDER_ID==6 && this.premiumJson.IS_BREAKIN && !this.proposalJson.inspectionJson) {
					this.inspectionMsg="Please select inspection location";
					return false;
				}

				if (this.errorContinueBuy) {
					this.inspectionMsg="";
					this.loading = true;
					this.showPaymentdata = false;

					/** Define Service mode */
					this.localStorage.getItem('quoteJson').subscribe((data: any) => {
						let quoteID = data.quoteID;
						this.userTrack();
						if (this.premiumJson.SERVICE_MODE == 'OFFLINE') {
							this.proposalConfirmationJson.premiumJson.LAST_QUOTE_ID = quoteID;
							this.offLineOrderNo = new Date().valueOf();
							this.proposalConfirmationJson.OrderID = this.offLineOrderNo;
							this.IS_OFFLINE = true;

							this.proposalConfirmationJson.serviceUrl=this.PHPAPIURL+"service.php?action=CREATE_PROPOSAL_OFFLINE&PROVIDER_ID="+this.premiumJson.PROVIDER_ID+"&PREMIUM_TYPE="+this.premiumJson.premium_type+"&OrderID="+this.offLineOrderNo;
							if(this.premiumJson.PROVIDER_ID ==13)
							{
								this.offLineProposal(quoteID, 1);
							}else{
								this.offLineProposal(quoteID);
							}

						} else {
							// Online quote without CD only wallet deduction
							if (this.proposalConfirmationJson.userJson != null
							&& ( this.proposalConfirmationJson.userJson.role_type == "20" || this.loginUserdata.parent_user_code=='158814' )
							&& this.premiumJson.ACC_TYPE == '0') {
								this.proposalConfirmationJson.premiumJson.LAST_QUOTE_ID = quoteID;
								this.offLineOrderNo = new Date().valueOf();
								this.proposalConfirmationJson.OrderID = this.offLineOrderNo;
								this.IS_OFFLINE = true;

								this.proposalConfirmationJson.serviceUrl=this.PHPAPIURL+"service.php?action=CREATE_PROPOSAL_OFFLINE&PROVIDER_ID="+this.premiumJson.PROVIDER_ID+"&PREMIUM_TYPE="+this.premiumJson.premium_type+"&OrderID="+this.offLineOrderNo;

								this.offLineProposal(quoteID);
							} else {
								// Online quote with CD OR Normal online payment
								// console.log(" ====== go digit, ====== ");

								this.localStorage.getItem('proposalJson').subscribe((data) => {
									this.proposalConfirmationJson.proposalJson = data;

									//////////// For Vehicle info check start/////////
									/////////////////////////////////////////////////
									let reg_no=this.proposalConfirmationJson.proposalJson.carDetailForm.rtoCode+this.proposalConfirmationJson.proposalJson.carDetailForm.rtoregNumber;

									let vehiJson={"quote_id":this.proposalConfirmationJson.quoteJson.quoteID,"reg_no":reg_no};
									this.apiService.getVehicleInfo(vehiJson).subscribe(vehiRes =>{
										// let vehiData=vehiRes;
										let vehiResJson : any;
										vehiResJson=vehiRes;
										this.vehicleRes=JSON.parse(vehiResJson);

										if(this.vehicleRes.status=='1')
										{
											// console.log('vehicleRes 1');return;
											this.onLineProposal();
										}
										else{
											// console.log('vehicleRes 2');return;
											this.offLineOrderNo = new Date().valueOf();
											this.proposalConfirmationJson.OrderID=this.offLineOrderNo;
											this.proposalConfirmationJson.serviceUrl=this.PHPAPIURL+"service.php?action=CREATE_PROPOSAL_OFFLINE&PROVIDER_ID="+this.premiumJson.PROVIDER_ID+"&PREMIUM_TYPE="+this.premiumJson.premium_type+"&OrderID="+this.offLineOrderNo;
											this.offLineProposal(quoteID, 1);
										}
									});
									return;
									//////////// For Vehicle info check END /////////
									/////////////////////////////////////////////////

									// this.onLineProposal();
								});
							}
						}
					});
				}
			}
		}
	}

	offLineProposal(quoteID, isVehicleMismatch=0) {
		if(this.premiumJson.PROVIDER_ID == '18' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.newindiaCOMProposal()
		}
		else if(this.premiumJson.PROVIDER_ID == '28' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.kotakCOMProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '16' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.sompoCOMProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '16' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.sompoTPProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '10' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.nationalCOMProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '10' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.nationalTPProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '5' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.futureCOMProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '5' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.futureTPProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '4' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.cholaCOMProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '4' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			this.cholaTPProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '4' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0' && isVehicleMismatch==0)
		{
			//this.cholaTPProposal();
		}
		else if(this.premiumJson.PROVIDER_ID == '29' && this.premiumJson.PREMIUM_TYPE == '3' && isVehicleMismatch==0) { // && this.premiumJson.CD == '1'
			// this.digitODProposal();
			this.digitODCDProposal();
		}
		else if(isVehicleMismatch==1)
		{
			this.apiService.createOfflineProposalPHP(this.proposalConfirmationJson).subscribe((resData)=>{

				let confirmationJSON : any;
				confirmationJSON=resData;
				this.DigitJsonData=JSON.parse(confirmationJSON);
				if (this.DigitJsonData.status == 1)
				{
					var obj = this.offLineSubmitBtn;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj.nativeElement.click();
					}, 3000);
				}
				else if(this.DigitJsonData.status == 2)
				{
					let data_output = this.DigitJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.DigitJsonData.order_id + "|" + "1";
					if (this.DigitJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.DigitJsonData.return_url;
					}
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});

		}
		 else {
			let GivenDateStr = this.quoteJson.pre_policy_expiry_date.year+"-"+this.quoteJson.pre_policy_expiry_date.month+"-"+this.quoteJson.pre_policy_expiry_date.day;
			let CurrentDate = new Date();
			CurrentDate.setHours(0,0,0,0);
			let GivenDate = new Date(GivenDateStr);
			let GivenDateTime=GivenDate.getTime();
			let CurrentDateTime=CurrentDate.getTime();

			if(GivenDateTime < CurrentDateTime) {
				this.loading = false;
				this.showPaymentdata = true;
				this.offlineBreakinDialog(quoteID);
			}
			else
			{
				this.proceedOfflinePayment(quoteID);
			}
		}
	}
	posWalletPopup()
	{
		const dialogRef = this.dialog.open(BreakinProceedConfirmDialog,
		{
		width: '610px',
		data:{'TYPE':'POSTOPUP'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result.msg && result.msg!='' && typeof result.msg !='undefined' && result.msg=='Y')
			{
				let topup_link = "https://crm.gibl.in/instant-login.php?src=appinstantlogin&ucode="+this.proposalConfirmationJson.userJson.user_code+"&akcode="+this.proposalConfirmationJson.userJson.user_enc_code+"&ptype=FW&QID="+this.quoteJson.quoteID;
				window.location.href=topup_link;
			}
		});
	}
	offlineBreakinDialog(quoteID)
	{
		const dialogRef = this.dialog.open(BreakinProceedConfirmDialog,
		{
		width: '610px',
		data:{'TYPE':'BREAKIN'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result.msg!='' && typeof result.msg !='undefined' && result.msg=='Y')
			{
				this.proceedOfflinePayment(quoteID);
			}
		});
	}
	proceedOfflinePayment(quoteID)
	{
		this.loading = true;
		this.showPaymentdata = false;
		this.apiService.offLineCreateProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE).subscribe(data => {
			if (this.loginUserdata != null)
			{
				if (this.loginUserdata.role_type == 20 || this.loginUserdata.parent_user_code=='158814')
				{
					this.nodeWalletCall(quoteID);
				}
				else
				{
					var obj = this.offLineSubmitBtn;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj.nativeElement.click();
					}, 3000);
				}
			}
			else
			{
				var obj = this.offLineSubmitBtn;
				setTimeout(() => {
					this.showPaymentdata = true;
					obj.nativeElement.click();
				}, 3000);
			}
		});
	}
	phpWalletCall()
	{
		//alert(this.premiumJson.CD);
	}
	nodeWalletCall(quoteID)
	{
		let ptype = 'FWT';
		if(this.premiumJson.PREMIUM_TYPE==1)
		{
			ptype = 'FWC';
		}
		let logdata = {
			'uname': this.loginUserdata.user_name,
			'source': this.loginUserdata.parent_user_code,
			'ptype': ptype,
			'amount': this.TOTAL_PREMIUM,
			'premiumid': this.PremiumType,
			'quote_id': quoteID,
			'provider_id': this.premiumJson.PROVIDER_ID,
			'token': this.loginUserdata.token,
			'tax': this.SERVICE_TAX,
			'od_basic': this.premiumJson.NUM_BASIC_OD_PREMIUM,
			'order_id': this.offLineOrderNo,
			'premium_data':this.premiumJson,
			'quote_data':this.proposalConfirmationJson.quoteJson,
		}
		this.premiumJson.TOTAL_PREMIUM = this.TOTAL_PREMIUM;
		this.localStorage.setItem('premiumJson', this.premiumJson).subscribe(() => {
			this.apiService.paymentWallet(logdata).subscribe(data =>
			{
				var result: any = data;
				if (result.data.status == 1)
				{
					let data_output = result.data.ref_no + "|" + "WALLET OFFLINE" + "|" + this.offLineOrderNo + "|" + "1";
					if (result.data.return_url == '')
					{
						if (result.data.message == '')
						{
							this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
								queryParams: {
									Output: data_output
								}
							});
						}
						else
						{
							this.premiumJson.SKVP = true;

							this.localStorage.setItem('premiumJson', this.premiumJson).subscribe(() => {});
							setTimeout(() => {
								this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
									queryParams: {
										Output: data_output
									}
								});
							}, 3000);
						}
					}
					else
					{
						this.document.location.href = result.data.return_url;
					}
					//this.window.location(result.data.return_url);
				}
				else if (result.data.status == 2)
				{
					this.loading = false;
					this.openSnackBar('Sorry, technical error occurred! Please contact support(1002)', '');
				}
				else if (result.data.status == 0)
				{
					this.loading = false;
					this.openSnackBar('Sorry, technical error occurred! Please contact support(1000)', '');
				}
				else if (result.data.status == 3)
				{
					this.loading = false;
					this.openSnackBar('You have insufficient balance in your wallet!(1003)', '');
				}
				else if (result.data.status == 5)
				{
					this.loading = false;
					this.openSnackBar('Sorry, technical error occurred! Please contact support(1005)', '');
				}
			});
		});
	}
	openCommonBreakinDialog()
	{
		const dialogRef = this.dialog.open(BreakinConfirmDialog,
		{
		width: '610px',
		data: {inspection_no: this.PinNumber}
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}
	bajajTPProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '2' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj = this.bajajSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,0).subscribe((data:any) => {
				let res=data;
				let proposalString =res.data[0];
				this.Txnamount = proposalString.TXNAMOUNT;
				this.TransactionNumber =proposalString.TRANSACTIONID;
				this.paymentUrlBajaj=proposalString.PG_URL;
				//this.paymentUrlBajaj=res.
				setTimeout(function () {
					this.showPaymentdata = true;
					obj.nativeElement.click();
				}, 2000);
			})
		}
	}
	bajajCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '2' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj = this.bajajSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,0).subscribe((data:any) => {
				let res=data;
				if(this.premiumJson.IS_BREAKIN == true)
				{
					let proposalString =res.data[0];
					this.loading = false;
					this.PinNumber = proposalString.PIN_NUMBER;
					this.openCommonBreakinDialog();
				}
				else
				{
					let proposalString =res.data[0];
					this.Txnamount = proposalString.TXNAMOUNT;
					this.TransactionNumber =proposalString.TRANSACTIONID;
					this.paymentUrlBajaj=proposalString.PG_URL;
					//this.paymentUrlBajaj=res.
					setTimeout(function () {
					this.showPaymentdata = true;
					obj.nativeElement.click();
					}, 2000);
				}
			});
		}
	}
	bajajODProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '2' && this.premiumJson.PREMIUM_TYPE == '3' && this.premiumJson.CD == '0')
		{
			let obj = this.bajajSubmitBtn;
			let proposalString;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,0).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				let confirmpationArr=JSON.parse(confirmationJSON);
				if (confirmpationArr.status == 1)
				{
					this.Txnamount = confirmpationArr.TxnAmount;
					this.paymentUrlBajaj=confirmpationArr.PaymentUrl;
					//this.paymentUrlBajaj=res.
					setTimeout(function () {
					this.showPaymentdata = true;
					obj.nativeElement.click();
					}, 2000);

				}
				else if (confirmpationArr.status == 3)
				{
					// ======== This elseif is For BAJAJ KYC  =========
					this.openSnackBar(confirmpationArr.resMessage, "");
					this.loading = false;
					this.policyBajajDcoumentFormFd.append("selectDocType", "A");
					this.openDialogFileUpload(this.kycFileUploadFormBajaj);
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	bajajCOMCDProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '2' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '1')
		{
			let obj = this.bajajSubmitBtn;
			let proposalString;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,1).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				let confirmpationArr=JSON.parse(confirmationJSON);
				if(confirmpationArr.status == 4)
				{
					this.NewindiaJsonData = confirmpationArr;
					this.openDialog();
					this.loading = false;
				}
				else if (confirmpationArr.status == 1)
				{
					let data_output = confirmpationArr.response_track_id + "|" + "WALLET OFFLINE" + "|" + confirmpationArr.order_id + "|" + "1|"+confirmpationArr.policy_no;
					if (confirmpationArr.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = confirmpationArr.return_url;
					}
					//this.window.location(result.data.return_url);
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			})
		}
	}
	IciciProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '7')
		{
			this.apiService.createProposalByPHP(this.proposalConfirmationJson,
			this.premiumJson.PROVIDER_ID,
			this.premiumJson.PREMIUM_TYPE,
			this.premiumJson.CD).subscribe(bharti_proposal_data => {
				this.BhartiJsonData=JSON.parse(bharti_proposal_data.toString());
				if(this.BhartiJsonData.status==1)
				{
					this.paymentUrlBharti=this.BhartiJsonData.PaymentUrl;
					this.document.location.href =this.paymentUrlBharti;
				}
				else if	(this.BhartiJsonData.status == 2)
				{
					let data_output = this.BhartiJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.BhartiJsonData.order_id + "|" + "1";
					if (this.BhartiJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.BhartiJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.BhartiJsonData.resMessage ){
						message_response	=this.BhartiJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}

	}
	futureTPProposal()
	{
		/* if(this.premiumJson.PROVIDER_ID == '5' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj = this.futureSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				if(data.success == true){
					let proposalString = data.data;
					if(proposalString.STATUS == 0){
						this.paymentRequestJson = data.data;
						this.paymentUrlFuture =this.paymentRequestJson.PG_URL;
						this.TOTAL_PREMIUM= this.paymentRequestJson.TOTAL_PREMIUM;
						this.futureTransaction_no = this.paymentRequestJson.TRANSACTION_ID;
						this.futureProposalNo=this.paymentRequestJson.PROPOSAL_NO;
						this.futureUserIdentifier= this.paymentRequestJson.UserIdentifier;
						this.futureResponseUrl = this.paymentRequestJson.ResponseURL;
						this.firstName=this.paymentRequestJson.FIRST_NAME;
						this.lastName= this.paymentRequestJson.LAST_NAME;
						// this.futureChecksum=this.paymentRequestJson.CheckSum;
						setTimeout(function () {
							this.showPaymentdata = true;
							obj.nativeElement.click();
						}, 2000);
					}
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		} */
		if(this.premiumJson.PROVIDER_ID == '5' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj = this.futureSubmitBtn;
			let proposalString;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				this.FutureJsonData=JSON.parse(data);
				if (this.FutureJsonData.status == 1)
				{
					this.paymentUrlFuture=this.FutureJsonData.PaymentUrl;
					this.paymentUrlFuture=this.paymentUrlFuture;
					if(this.FutureJsonData.PA_FLAG == '0')
					{
						setTimeout(function(){
						this.showPaymentdata=true;
						obj.nativeElement.click();
						}, 4000);
					}
					else
					{
						this.loading = false;
						this.openDialogFUTURE();
					}

				}
				else if(this.FutureJsonData.status == 2)
				{
					let data_output = this.FutureJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.FutureJsonData.order_id + "|" + "1";
					if (this.FutureJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.FutureJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.FutureJsonData.resMessage ){
						message_response	=this.FutureJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	futureCOMProposal()
	{
		/* if(this.premiumJson.PROVIDER_ID == '5' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj = this.futureSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				if(data.success == true){
					let proposalString = data.data;
					if(proposalString.STATUS == 0){
						this.paymentRequestJson = data.data;
						this.paymentUrlFuture =this.paymentRequestJson.PG_URL;
						this.TOTAL_PREMIUM= this.paymentRequestJson.TOTAL_PREMIUM;
						this.futureTransaction_no = this.paymentRequestJson.TRANSACTION_ID;
						this.futureProposalNo=this.paymentRequestJson.PROPOSAL_NO;
						this.futureUserIdentifier= this.paymentRequestJson.UserIdentifier;
						this.futureResponseUrl = this.paymentRequestJson.ResponseURL;
						this.firstName=this.paymentRequestJson.FIRST_NAME;
						this.lastName= this.paymentRequestJson.LAST_NAME;
						// this.futureChecksum=this.paymentRequestJson.CheckSum;
						setTimeout(function () {
							this.showPaymentdata = true;
							obj.nativeElement.click();
						}, 2000);
					}
				}else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		} */
		/****FUTURE Comprehensive Motor online RUTH*/
		if(this.premiumJson.PROVIDER_ID == '5' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj = this.futureSubmitBtn;
			let proposalString;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				this.FutureJsonData=JSON.parse(data);
				if (this.FutureJsonData.status == 1)
				{
					this.paymentUrlFuture=this.FutureJsonData.PaymentUrl;
					this.paymentUrlFuture=this.paymentUrlFuture;
					if(this.FutureJsonData.PA_FLAG == '0')
					{
						setTimeout(function(){
						this.showPaymentdata=true;
						obj.nativeElement.click();
						}, 4000);
					}
					else
					{
						this.loading = false;
						this.openDialogFUTURE();
					}

				}
				else if(this.FutureJsonData.status == 2)
				{
					let data_output = this.FutureJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.FutureJsonData.order_id + "|" + "1";
					if (this.FutureJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.FutureJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.FutureJsonData.resMessage ){
						message_response	=this.FutureJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	hdfcNEWProposal()
	{
		if (this.premiumJson.PROVIDER_ID == '6' && this.premiumJson.PREMIUM_TYPE == '0' && this.premiumJson.CD == '0')
		{
			let obj = this.hdfcSubmitBtn;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe(data => {
				this.responseCusId = data;
				this.custId = this.responseCusId.result;
				this.responseCusId = data;
				this.proposalres = this.responseCusId.result;
				this.hdfc_agentCode =this.proposalres.AgentCode;
				this.TransactionNumber=this.proposalres.TRANSACTIONID;
				this.paymentUrlHDFC =this.proposalres.Payment_url;
				let paymentdata = {
					status: 'success'
				}
				if(this.proposalres.STATUS == 0){
					setInterval(function () {
						this.showPaymentdata = true;
						obj.nativeElement.click();
					}, 2000);
				}else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	hdfcCOMProposal()
	{
		if (this.premiumJson.PROVIDER_ID == '6' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj = this.hdfcSubmitBtn;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe(data => {
				this.responseCusId = data;
				this.custId = this.responseCusId.result;
				this.responseCusId = data;
				this.proposalres = this.responseCusId.result;
				this.hdfc_agentCode =this.proposalres.AgentCode;
				this.TransactionNumber=this.proposalres.TRANSACTIONID;
				this.paymentUrlHDFC =this.proposalres.Payment_url;
				let paymentdata = {
					status: 'success'
				}
				if(this.proposalres.STATUS == 0){
					if(this.proposalres.IS_BREAKIN == 'true'){
						//this.openSnackBar('Your Inspection Number is :"'+this.proposalres.TRANSACTIONID+'"', '');
						this.loading = false;
						this.openBreakinDialog();
					}
					else
					{
						setTimeout(function () {
							this.showPaymentdata = true;
							obj.nativeElement.click();
						}, 2000);
					}
				}
				else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	hdfcCOMRenewlProposal()
	{
		if (this.premiumJson.PROVIDER_ID == '6' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.IS_RENEWAL == '1')
		{
			let obj = this.hdfcSubmitBtn;

			this.apiService.createProposalRenewal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE).subscribe(data => {
				this.responseCusId = data;
				this.custId = this.responseCusId.result;
				this.responseCusId = data;
				this.proposalres = this.responseCusId.result;
				this.hdfc_agentCode =this.proposalres.AgentCode;
				this.TransactionNumber=this.proposalres.TRANSACTIONID;
				this.paymentUrlHDFC =this.proposalres.Payment_url;
				let paymentdata = {
					status: 'success'
				}
				if(this.proposalres.STATUS == 0){
					if(this.proposalres.IS_BREAKIN == 'true'){
						//this.openSnackBar('Your Inspection Number is :"'+this.proposalres.TRANSACTIONID+'"', '');
						this.loading = false;
						this.openBreakinDialog();
					}
					else
					{
						setTimeout(function () {
							this.showPaymentdata = true;
							obj.nativeElement.click();
						}, 2000);
					}
				}
				else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	hdfcCOMCDProposal()
	{
		if (this.premiumJson.PROVIDER_ID == '6' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '1')
		{
			let obj = this.hdfcCDSubmitBtn;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				this.proposalres = data;
				this.custId = this.proposalres.result;
				if(this.proposalres.success == true){
					var result: any= this.custId;
					if (result.WALLET_SATUS == 1) {
						if(result.PAYBINGO_URL ==""){
							this.hdfc_agentCode =result.AgentCode;
							this.TransactionNumber=result.TRANSACTIONID;
							this.paymentUrlHDFC =result.Payment_url;
							this.paymentMode = result.PAYMENT_MODE;
							this.additionalinfo2=result.AdditionalInfo2
                            this.hdfc_prodcutCode=result.ProductCd;

							setTimeout(function () {
								this.showPaymentdata = true;
								obj.nativeElement.click();
							}, 2000);
						}else {
							this.document.location.href = result.PAYBINGO_URL;
						}
					} else if (result.WALLET_SATUS == 2) {
						this.loading = false;
						this.openSnackBar('Sorry, technical error occurred! Please contact support(1002) Ph No. 6290821653', '');
					} else if (result.WALLET_SATUS == 0) {
						this.loading = false;
						this.openSnackBar('Sorry, technical error occurred! Please contact support(1000) Ph No. 6290821653', '');
					} else if (result.WALLET_SATUS == 3) {
						this.loading = false;
						this.openSnackBar('You have insufficient balance in your wallet!(1003) Ph No. 6290821653', '');
					} else if (result.WALLET_SATUS == 5) {
						this.loading = false;
						this.openSnackBar('Sorry, technical error occurred! Please contact support(1005) Ph No. 6290821653', '');
					}
				}
				else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	hdfcTPProposal()
	{
		if (this.premiumJson.PROVIDER_ID == '6' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj = this.hdfcSubmitBtn;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,0).subscribe((data:any) => {
				this.responseCusId = data;
				this.proposalres = this.responseCusId.result;
				this.hdfc_agentCode =this.proposalres.AgentCode;
				this.TransactionNumber=this.proposalres.TRANSACTIONID;
				this.paymentUrlHDFC =this.proposalres.Payment_url;
				let paymentdata = {
					status: 'success'
				}
				if(this.proposalres.STATUS == 0){
					setTimeout(function () {
						this.showPaymentdata = true;
						obj.nativeElement.click();
					}, 2000);
				}else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	hdfcTPCDProposal()
	{
		if (this.premiumJson.PROVIDER_ID == '6' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '1')
		{
			//this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,1).subscribe((data:any) => {
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,1).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.HdfcJsonData=JSON.parse(confirmationJSON);
				this.paymentUrlHDFC=this.HdfcJsonData.PaymentUrl;

				if(this.HdfcJsonData.status==2)
				{
					if( this.HdfcJsonData.return_url !='' ){
						this.document.location.href = this.HdfcJsonData.return_url;
					}
					else{
						this.hdfcTPCDPaymentData.action_url	=this.HdfcJsonData.PaymentUrl;
						this.hdfcTPCDPaymentData.Checksum	=this.HdfcJsonData.CheckSum;
						this.hdfcTPCDPaymentData.AgentCode	=this.HdfcJsonData.FeatureID;
						this.hdfcTPCDPaymentData.CustomerId	=this.HdfcJsonData.Trnsno;
						this.hdfcTPCDPaymentData.TxnAmount	=this.HdfcJsonData.total_premium;
						this.hdfcTPCDPaymentData.AdditionalInfo2	=this.HdfcJsonData.Trnsno;
						this.hdfcTPCDPaymentData.UserName	=this.HdfcJsonData.customer_name;
						this.hdfcTPCDPaymentData.UserMailId	=this.HdfcJsonData.customer_email;
						this.hdfcTPCDPaymentData.ProductCd	=this.HdfcJsonData.productCD;
						this.hdfcTPCDPaymentData.ProducerCd	=this.HdfcJsonData.ProducerCd;

						let obj = this.hdfcTPCDSubmitBtn;
						this.loading = false;
						setTimeout(() => {
							this.showPaymentdata = true;
							obj.nativeElement.click();
						}, 4000);
					}
				}
				if(this.HdfcJsonData.status==0)
				{
					this.showPaymentdata=true;
					this.showErrormsg=true;
					this.resMessage=this.HdfcJsonData.resMessage;
					this.loading = false;
				}
			});
		}
	}
	nationalTPProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '10' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj1 = this.nationalSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.NationalJsonData=JSON.parse(confirmationJSON);
				if (this.NationalJsonData.status == 1)
				{
					this.paymentUrlNational = this.NationalJsonData.PaymentUrl;
					this.CHECKSUM_KEY =  this.NationalJsonData.CHECKSUM_KEY;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				}
				else if	(this.NationalJsonData.status == 2)
				{
					let data_output = this.NationalJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.NationalJsonData.order_id + "|" + "1";
					if (this.NationalJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.NationalJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.NationalJsonData.resMessage ){
						message_response	=this.NationalJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	nationalCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '10' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj1 = this.nationalSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.NationalJsonData=JSON.parse(confirmationJSON);
				if (this.NationalJsonData.status == 1)
				{
					this.paymentUrlNational = this.NationalJsonData.PaymentUrl;
					this.CHECKSUM_KEY =  this.NationalJsonData.CHECKSUM_KEY;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				}
				else if	(this.NationalJsonData.status == 2)
				{
					let data_output = this.NationalJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.NationalJsonData.order_id + "|" + "1";
					if (this.NationalJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.NationalJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.NationalJsonData.resMessage ){
						message_response	=this.NationalJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	cholaCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '4' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{

			//return;
			let obj1 = this.cholaSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.CholaJsonData=JSON.parse(confirmationJSON);
				if (this.CholaJsonData.status == 1)
				{
					this.paymentUrlChola = this.CholaJsonData.PaymentUrl;
					this.CHECKSUM_KEY =  this.CholaJsonData.CHECKSUM_KEY;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				}
				else if	(this.CholaJsonData.status == 2)
				{
					let data_output = this.CholaJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.NationalJsonData.order_id + "|" + "1";
					if (this.CholaJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.NationalJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.NationalJsonData.resMessage ){
						message_response	=this.NationalJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	orientalCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '11' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj = this.orientalSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) =>
			{
				if(data.success == true){
					let proposalString = data.data;

					this.oriental_finalData=proposalString.FINAL_STRING;
					this.paymentUrlOriental =proposalString.PAYMENT_URL;
					setTimeout(function () {
						this.showPaymentdata = true;
						obj.nativeElement.click();
					}, 4000);
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			})
		}
	}
	relianceCOMCDProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '12' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '1')
		{
			let obj1 = this.relianceSubmitBtn;
			this.apiService.createProposalByPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {

				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				let confirmpationArr=JSON.parse(confirmationJSON);
				if(confirmpationArr.status == 4)
				{
					this.NewindiaJsonData = confirmpationArr;
					this.openDialog();
					this.loading = false;
				}
				else if(confirmpationArr.status==2)
				{
					let data_output = confirmpationArr.response_track_id + "|" + "WALLET OFFLINE" + "|" + confirmpationArr.order_id + "|" + "1|"+confirmpationArr.policy_no;

					let return_url = confirmpationArr.return_url;
					if(return_url=="")
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						window.location.href= return_url;
					}
				}
				else
				{
					this.loading = false;
					this.openSnackBar(confirmpationArr.resMessage, '');
				}
			})
		}
	}
	relianceTPProposal()
	{
		if (this.premiumJson.PROVIDER_ID == '12' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj1 = this.relianceSubmitBtn;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe(data => {
				this.reliancedata = data;
				if(this.reliancedata.status == 4)
				{
					this.NewindiaJsonData = this.reliancedata;
					this.openDialog();
					this.loading = false;
				}
				else if (this.reliancedata.success == true) {
					this.relianceproposalno = this.reliancedata.data.cust_id;
					this.relianceTotalprem = this.reliancedata.data.TOTAL_PREMIUM;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				} else {
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	relianceTPCDProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '12' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '1')
		{
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,1).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				let confirmpationArr=JSON.parse(confirmationJSON);
				if(confirmpationArr.status == 4)
				{
					this.NewindiaJsonData = confirmpationArr;
					this.openDialog();
					this.loading = false;
				}
				else if(confirmpationArr.status==2)
				{
					let data_output = confirmpationArr.response_track_id + "|" + "WALLET OFFLINE" + "|" + confirmpationArr.order_id + "|" + "1|"+confirmpationArr.policy_no;

					let return_url = confirmpationArr.return_url;
					if(return_url=="")
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						window.location.href= return_url;
					}
				}
				else
				{
					this.loading = false;
					this.openSnackBar(confirmpationArr.resMessage, '');
				}
			});
		}
	}
	relianceODProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '12' && this.premiumJson.PREMIUM_TYPE == '4' && this.premiumJson.CD == '0')
		{
			let obj1 = this.relianceSubmitBtn;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				this.reliancedata = data;
				if(this.reliancedata.status == 4)
				{
					this.NewindiaJsonData = this.reliancedata;
					this.openDialog();
					this.loading = false;
				}
				else if (this.reliancedata.success == true) {
					this.relianceproposalno = this.reliancedata.data.cust_id;
					this.relianceTotalprem = this.reliancedata.data.TOTAL_PREMIUM;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				} else {
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			})
		}
	}
	relianceNEWProposal()
	{
		if (this.premiumJson.PROVIDER_ID == '12' && this.premiumJson.PREMIUM_TYPE == '0' && this.premiumJson.CD == '0')
		{
			let obj = this.relianceSubmitBtn;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,0).subscribe(data => {
				this.custId = data;
				this.reliancedata = this.custId.data;
				this.relianceproposalno = this.reliancedata.cust_id;
				this.relianceTotalprem = this.reliancedata.TOTAL_PREMIUM;
			});
		}
	}
	relianceCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '12' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj1 = this.relianceSubmitBtn;
			this.apiService.createProposalByPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let reliancedata = JSON.parse(data);
				if(reliancedata.status == 4)
				{
					this.NewindiaJsonData = reliancedata;
					this.openDialog();
					this.loading = false;
				}
				else if (reliancedata.status == 1)
				{
					this.relianceproposalno = reliancedata.ProposalNo;
					this.relianceTotalprem =  reliancedata.FinalPremium;
					this.paymentUrlRELIANCE = reliancedata.PaymentUrl;
					this.USERID= reliancedata.userId;
					this.responseUrlRELIANCE = reliancedata.ResponseRelianceUrl;

					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				} else {
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			})
		}
	}
	cholaTPProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '4' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj1 = this.cholaSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.CholaJsonData=JSON.parse(confirmationJSON);
				if (this.CholaJsonData.status == 1)
				{
					this.paymentUrlChola = this.CholaJsonData.PaymentUrl;
					this.CHECKSUM_KEY =  this.CholaJsonData.CHECKSUM_KEY;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				}
				else if	(this.CholaJsonData.status == 2)
				{
					let data_output = this.CholaJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.CholaJsonData.order_id + "|" + "1";
					if (this.CholaJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.CholaJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.CholaJsonData.resMessage ){
						message_response	=this.CholaJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	cholaODProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '4' && this.premiumJson.PREMIUM_TYPE == '3' && this.premiumJson.CD == '0')
		{
			let obj1 = this.cholaSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.CholaJsonData=JSON.parse(confirmationJSON);
				if (this.CholaJsonData.status == 1)
				{
					this.paymentUrlChola = this.CholaJsonData.PaymentUrl;
					this.CHECKSUM_KEY =  this.CholaJsonData.CHECKSUM_KEY;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				}
				else if	(this.CholaJsonData.status == 2)
				{
					let data_output = this.CholaJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.CholaJsonData.order_id + "|" + "1";
					if (this.CholaJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.CholaJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.CholaJsonData.resMessage ){
						message_response	=this.CholaJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	sompoCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '16' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj1 = this.sompoSubmitBtn;
			this.apiService.createProposalSompo(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.SompoJsonData=JSON.parse(confirmationJSON);
				if (this.SompoJsonData.status == 1)
				{
					this.paymentUrlSompo = this.SompoJsonData.PaymentUrl;
					this.Txnamount =  this.SompoJsonData.TxnAmount;
					this.quoteJson.isThirdParty = false;

					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				}
				else if	(this.SompoJsonData.status == 2)
				{
					let data_output = this.SompoJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.SompoJsonData.order_id + "|" + "1";
					if (this.SompoJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.SompoJsonData.return_url;
					}
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	sompoTPProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '16' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj1 = this.sompoSubmitBtn;
			this.apiService.createProposalSompo(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.SompoJsonData=JSON.parse(confirmationJSON);
				if (this.SompoJsonData.status == 1)
				{
					this.paymentUrlSompo = this.SompoJsonData.PaymentUrl;
					this.Txnamount =  this.SompoJsonData.TxnAmount;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);
				}
				else if	(this.SompoJsonData.status == 2)
				{
					let data_output = this.SompoJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.SompoJsonData.order_id + "|" + "1";
					if (this.SompoJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.SompoJsonData.return_url;
					}
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	tataCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '17' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj = this.tataSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				if(data.success == true){
					let proposalString = data.result;
					if(proposalString.STATUS ==1){
						this.tatasrc=proposalString.SRC;
						this.tataProposal_no=proposalString.PROPOSAL_NO;
						this.paymentUrlTata=proposalString.PAYMENT_URL;
						setTimeout(function ()
						{
							this.showPaymentdata = true;
							obj.nativeElement.click();
						}, 2000);
					}
					else
					{
						var message = proposalString.MESSAGE;
						this.loading = false;
						this.openSnackBar(message, '');
					}
				}
			});
		}
	}
	newindiaCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '18' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj1 = this.newindiaSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.NewindiaJsonData=JSON.parse(confirmationJSON);
				if (this.NewindiaJsonData.status == 4)
				{
					this.openDialog();
					this.loading = false;
				}
				else if (this.NewindiaJsonData.status == 1)
				{
					this.paymentUrlNewindia = this.NewindiaJsonData.PaymentUrl;
					this.CHECKSUM_KEY =  this.NewindiaJsonData.CHECKSUM_KEY;
					this.quoteJson.isThirdParty = false;
					setTimeout(() => {
						this.showPaymentdata = true;
						obj1.nativeElement.click();
					}, 2000);

				}
				else if	(this.NewindiaJsonData.status == 2)
				{
					let data_output = this.NewindiaJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.NewindiaJsonData.order_id + "|" + "1";
					if (this.NewindiaJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.NewindiaJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.NewindiaJsonData.resMessage ){
						message_response	=this.NewindiaJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	magmaCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '21' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj1 = this.magmaSubmitBtn;
			this.apiService.createProposalMagma(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.MagmaJsonData=JSON.parse(confirmationJSON);
				// console.log(" ===================> ", this.MagmaJsonData); return 0;

				this.resMessage = this.MagmaJsonData.resMessage;
				if (this.MagmaJsonData.status == 1 && this.MagmaJsonData.IS_BREAKING ==0)
				{
					this.paymentUrlMagma = this.MagmaJsonData.PaymentUrl;
					this.quoteJson.isThirdParty = false;
					if(this.MagmaJsonData.IIB_flag == '0')
					{
						setTimeout(() => {
							this.showPaymentdata = true;
							obj1.nativeElement.click();
						}, 2000);
					}
					else
					{
						this.loading = false;
						this.openDialogMagma();
					}
				}
				else if (this.MagmaJsonData.status == 1 && this.MagmaJsonData.IS_BREAKING ==1)
				{
					this.quoteJson.isThirdParty = false;
					this.loading = false;
					this.openDialogMagmaBreakin();
				}
				else if	(this.MagmaJsonData.status == 2)
				{
					let data_output = this.MagmaJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.MagmaJsonData.order_id + "|" + "1";
					if (this.MagmaJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.MagmaJsonData.return_url;
					}
				}
				else
				{
					let message_response	='Someting went wrong please contact with the support team 6290821653';
					if( this.MagmaJsonData.resMessage ){
						message_response	=this.MagmaJsonData.resMessage;
					}
					this.openSnackBar(message_response, '');
					this.loading = false;
				}
			});
		}
	}
	kotakCOMProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '28' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0')
		{
			let obj = this.kotakSubmitBtn;
			let proposalString;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.KotakJsonData=JSON.parse(confirmationJSON);
				if(this.KotakJsonData.status == 4)
				{
					this.NewindiaJsonData = this.KotakJsonData;
					this.openDialog();
					this.loading = false;
				}
				else if(this.KotakJsonData.status == 1)
				{
					if(this.KotakJsonData.Quote_id != null)
					{
						setTimeout(function () {
							this.showPaymentdata = true;
							obj.nativeElement.click();
						}, 2000);
					}
					else
					{
						this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
						this.loading = false;
					}
				}
				else if	(this.KotakJsonData.status == 2)
				{
					let data_output = this.KotakJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.KotakJsonData.order_id + "|" + "1";
					if (this.KotakJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.KotakJsonData.return_url;
					}
				}
				else if(this.KotakJsonData.status == 3)
				{
					this.PinNumber = this.KotakJsonData.PIN_NUMBER;
					this.openCommonBreakinDialog();
					this.loading = false;
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	kotakCOMCDProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '28' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '1')
		{
			let proposalString;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,1).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				let confirmpationArr=JSON.parse(confirmationJSON);
				if (confirmpationArr.status == 1)
				{
					let data_output = confirmpationArr.response_track_id + "|" + "WALLET OFFLINE" + "|" + confirmpationArr.order_id + "|" + "1|"+confirmpationArr.policy_no;
					if (confirmpationArr.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = confirmpationArr.return_url;
					}
					//this.window.location(result.data.return_url);
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			})
		}
	}
	kotakNEWProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '28' && this.premiumJson.PREMIUM_TYPE == '0' && this.premiumJson.CD == '0')
		{
			let obj = this.kotakSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				if(data.success == true){
					let proposalString = data.result;

					if(proposalString.Quote_id != null){
						this.Txnamount = proposalString.TXNAMOUNT;
						this.TransactionNumber =proposalString.Quote_id;
						this.fname  =proposalString.fname;
						this.lname  =proposalString.lname;
						this.surl  =proposalString.surl;
						this.curl  =proposalString.curl;
						this.furl  =proposalString.furl;
						this.kotak_productinfo  =proposalString.Product_info;
						this.hash_key  =proposalString.hash_key;
						this.merchant_key  =proposalString.Merchant_key;
						this.paymentUrlKotak = proposalString.Payment_url;

						setTimeout(function () {
							this.showPaymentdata = true;
							obj.nativeElement.click();
						}, 2000);
					}else{
						this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
						this.loading = false;
					}
				}
			});
		}
	}

	digitODProposal() {
		if(this.premiumJson.PROVIDER_ID == '29' && this.premiumJson.PREMIUM_TYPE == '3' && this.premiumJson.CD == '0')
		{
			let obj = this.digitSubmitBtn;
			let proposalString;
			this.apiService.createProposalPHPUAT(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				this.digitdata=JSON.parse(data);
				if (this.digitdata.status == 1) {
					this.loading = false;
					this.document.location.href = this.digitdata.digitPaymenturl;
				} else {
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}

	digitODCDProposal() {
		if(this.premiumJson.PROVIDER_ID == '29' && this.premiumJson.PREMIUM_TYPE == '3') {// && this.premiumJson.CD == '1'
			let obj = this.digitSubmitBtn;
			let proposalString;
			this.apiService.createProposalPHPUAT(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE, 1).subscribe((data:any) => {
				this.digitdata=JSON.parse(data);
				if (this.digitdata.status == 1) {
					this.loading = false;
					let data_output = this.digitdata.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.digitdata.order_id + "|" + "1|"+this.digitdata.policy_no;
					if (this.digitdata.return_url == '') {
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					} else {
						this.document.location.href = this.digitdata.return_url;
					}
				} else {
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}

	digitCOMProposal() {
		if(this.premiumJson.PROVIDER_ID == '29' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0'){
			// alert('hi');
			let obj = this.digitSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
			// this.apiService.createProposalPHPUAT(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.DigitJsonData=JSON.parse(confirmationJSON);
				if (this.DigitJsonData.status == 1){

					this.digitPaymenturl=this.DigitJsonData.digitPaymenturl;
					setTimeout(function(){
						this.showPaymentdata=true;
						obj.nativeElement.click();
					}, 2000);
				} else if(this.DigitJsonData.status == 2) {
					let data_output = this.DigitJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.DigitJsonData.order_id + "|" + "1";
					if (this.DigitJsonData.return_url == '') {
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					} else {
						this.document.location.href = this.DigitJsonData.return_url;
					}
				} else {
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}

	digitCOMCDProposal(){
		if(this.premiumJson.PROVIDER_ID == '29' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '1')
		{
			let obj = this.digitSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,1).subscribe((data:any) => {
				this.digitdata=JSON.parse(data);
				if (this.digitdata.status == 1)
				{
					let data_output = this.digitdata.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.digitdata.order_id + "|" + "1|"+this.digitdata.policy_no;
					if (this.digitdata.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.digitdata.return_url;
					}
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}
	digitTPCDProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '29' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '1')
		{
			let obj = this.digitSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,1).subscribe((data:any) => {
				this.digitdata=JSON.parse(data);
				if (this.digitdata.status == 1)
				{
					let data_output = this.digitdata.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.digitdata.order_id + "|" + "1|"+this.digitdata.policy_no;
					if (this.digitdata.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.digitdata.return_url;
					}
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}

	digitTPProposal() {
		/* if(this.premiumJson.PROVIDER_ID == '29' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj = this.digitSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				if(data.success == true){
					this.digitPaymenturl=data.data;
					setInterval(function () {
						this.showPaymentdata = true;
						obj.nativeElement.click();
					}, 4000);
				}else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		} */
		if(this.premiumJson.PROVIDER_ID == '29' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0') {
			// alert('hi');
			let obj = this.digitSubmitBtn;
			this.apiService.createProposalPHP(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				let resData=data;
				let confirmationJSON : any;
				confirmationJSON=resData;
				this.DigitJsonData=JSON.parse(confirmationJSON);
				if (this.DigitJsonData.status == 1)
				{

					this.digitPaymenturl=this.DigitJsonData.digitPaymenturl;
					setTimeout(function(){
						this.showPaymentdata=true;
						obj.nativeElement.click();
					}, 2000);
				}
				else if(this.DigitJsonData.status == 2)
				{
					let data_output = this.DigitJsonData.response_track_id + "|" + "WALLET OFFLINE" + "|" + this.DigitJsonData.order_id + "|" + "1";
					if (this.DigitJsonData.return_url == '')
					{
						this.router.navigate(['/payment/offlinepayment/' + this.premiumJson.PROVIDER_ID], {
							queryParams: {
								Output: data_output
							}
						});
					}
					else
					{
						this.document.location.href = this.DigitJsonData.return_url;
					}
				}
				else
				{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}

	dhflCOMProposal() {
		if(this.premiumJson.PROVIDER_ID == '37' && this.premiumJson.PREMIUM_TYPE == '1' && this.premiumJson.CD == '0'){
			let obj = this.dhflSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				if(data.success == true){
					this.paymentData=data.result;
					this.encryptData= this.paymentData.encrypt_req;
					this.access_code = this.paymentData.access_code;
					this.dhflPaymenturl=this.paymentData.payment_url;

					setTimeout(function () {
						this.showPaymentdata = true;
						obj.nativeElement.click();
					}, 4000);
				}else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}

	dhflTPProposal()
	{
		if(this.premiumJson.PROVIDER_ID == '37' && this.premiumJson.PREMIUM_TYPE == '2' && this.premiumJson.CD == '0')
		{
			let obj = this.dhflSubmitBtn;
			let proposalString;
			this.apiService.createProposal(this.proposalConfirmationJson, this.premiumJson.PROVIDER_ID, this.premiumJson.PREMIUM_TYPE,this.premiumJson.CD).subscribe((data:any) => {
				if(data.success == true){
					this.paymentData=data.result;
					this.encryptData= this.paymentData.encrypt_req;
					this.access_code = this.paymentData.access_code;
					this.dhflPaymenturl=this.paymentData.payment_url;
					setTimeout(function () {
						this.showPaymentdata = true;
						obj.nativeElement.click();
					}, 4000);
				}else{
					this.openSnackBar('Someting went wrong please contact with the support team 6290821653', '');
					this.loading = false;
				}
			});
		}
	}

	onLineProposal() {
		this.bajajTPProposal(); //NODE
		this.bajajCOMProposal(); //NODE

		this.hdfcNEWProposal(); //NODE
		this.hdfcCOMProposal(); //NODE
		this.hdfcCOMRenewlProposal(); //NODE
		this.hdfcCOMCDProposal(); //NODE
		this.hdfcTPProposal(); //NODE
		this.hdfcTPCDProposal(); //NODE

		this.relianceTPProposal(); //NODE
		this.relianceTPCDProposal(); //NODE
		this.relianceODProposal(); //NODE
		this.relianceNEWProposal(); //NODE

		this.tataCOMProposal(); //NODE
		this.kotakNEWProposal(); //NODE

		this.digitODProposal(); //NODE
		this.digitCOMProposal(); //PHP
		this.digitTPProposal(); //PHP
		this.cholaODProposal(); //PHP
		this.bajajODProposal(); //PHP
		this.bajajCOMCDProposal(); //PHP
		this.IciciProposal(); //PHP
		this.futureTPProposal(); //PHP
		this.futureCOMProposal(); //PHP
		this.nationalTPProposal(); //PHP
		this.nationalCOMProposal();  //PHP
		this.cholaCOMProposal();  //PHP
		this.cholaTPProposal();  //PHP
		this.relianceCOMCDProposal(); //PHP
		this.relianceCOMProposal(); //PHP
		this.sompoCOMProposal(); //PHP
		this.sompoTPProposal(); //PHP
		this.newindiaCOMProposal(); //PHP
		this.magmaCOMProposal(); //PHP
		this.kotakCOMProposal(); //PHP
		this.kotakCOMCDProposal(); //PHP
		this.digitCOMCDProposal(); //PHP
		this.digitTPCDProposal(); //PHP

	}

	callPHPWalletService(){
		console.log('this.proposalConfirmationJson.userJson',this.proposalConfirmationJson.userJson);
	}

	setInpecction(inspectionJson)
	{
		this.inspectionMsg="";
		this.proposalJson.inspectionJson=inspectionJson;
	}

	paymentFormSubmit(hdfcForm: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit1(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit2(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit3(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit4(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit6(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit7(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit5(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit8(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit9(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit10(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit11(form: any, e: any): void {
		e.target.submit();
	}
	paymentFormSubmit12(form: any, e: any): void {
		e.target.submit();
	}
	offLineFormSubmit(form: any, e: any): void {
		e.target.submit();
	}

	cannotSpace(control: AbstractControl): ValidationErrors | null {
		if((control.value as string).indexOf(' ') >= 0){
			return {cannotContainSpace: true}
		}
		return null;
	}

	// CHANGE DONE BY ARIT
	addonLoopFn(items) {
		this.providerAddonCount	=0;
		let curObj	=this;
		items.forEach(function (item) {
			if( item.isChecked && (item.value>0 || item.isInclude) ){
				curObj.providerAddonCount	=curObj.providerAddonCount+1;
			}
		});
    }

	calculateCoverAccCount(){
		this.providerCoverCount	=0;
		if( this.quoteJson.paid_driver == 1 ){
			this.providerCoverCount	=this.providerCoverCount+1;
		}
		if( this.quoteJson.pa_owner == 1 ){
			this.providerCoverCount	=this.providerCoverCount+1;
		}
		if( this.quoteJson.is_unnamed_passenger == 1 ){
			this.providerCoverCount	=this.providerCoverCount+1;
		}

		this.providerAccCount	=0;
		if( this.quoteJson.elec_acc_type ){
			this.providerAccCount	=this.providerAccCount+1;
		}
		if( this.quoteJson.non_elec_acc_type == 1 ){
			this.providerAccCount	=this.providerAccCount+1;
		}
		if( this.quoteJson.CNG_LPG_Kit_type == 1 ){
			this.providerAccCount	=this.providerAccCount+1;
		}
	}

	/**************************************************************Remove Default Cover********************************************************/
	resetCoverAddon(premiumJson) {
		let coverItems = premiumJson.COVER_ITEMS;
		let total_addon_val = 0;
		var i2 = 0;
		coverItems.forEach(el => {
			if (i2 <= 4) {
				let addon_value = parseFloat(el.value);
				if (!isNaN(addon_value))
				{
					total_addon_val = total_addon_val + addon_value;
				}
			}
			i2++;
		});
		let addonItems = premiumJson.ADDON_ITEMS;
		addonItems.forEach(el => {
			let addon_value = parseFloat(el.value);
			if (!isNaN(addon_value))
			{
				if(el.isDisplay == false)
				{
					total_addon_val = total_addon_val + addon_value;
				}
			}
		});

		let total_net_premium = parseFloat(premiumJson.NET_PREMIUM) - total_addon_val;
		if(premiumJson.PROVIDER_ID == '28')
		{
			let voluntary_amount = parseInt(premiumJson.VOLUNTARY_DISCOUNT);
			total_net_premium = total_net_premium + voluntary_amount;
		}
		let service_tax = Math.round(total_net_premium * .18);
		let total_premium = total_net_premium + service_tax;
		this.premiumJson.NET_PREMIUM = total_net_premium;
		this.premiumJson.SERVICE_TAX = service_tax;
		this.premiumJson.TOTAL_PREMIUM = total_premium;
	}

	checkLastYearClaim(event){
		this.isPayChecked =false;
		this.loading =false;
		this.renewalCheckEnable	= !this.renewalCheckEnable;
		 if( event.target.checked === true )
		 {
			this.route.queryParams.subscribe(params => {
				if(params.QID!=null)
				{
					this.getProposalData(params.QID);
					this.renewalCheckEnable	= !this.renewalCheckEnable;
				}
			});
		}
		else
		{
			this.quoteJson.new_ncb = 0;
			this.quoteJson.prev_ncb = 0;
			this.quoteJson.last_claimed_year	=1;
			this.quoteJson.lastClaim	="1";
			this.quoteJson.serviceUrl=this.APIURL+"service.php?action=PREMIUM_REQUEST&PROVIDER_ID="+this.premiumJson.PROVIDER_ID+"&PREMIUM_TYPE=1";
			this.apiService.getCommonNodePremium(this.quoteJson, 1,this.premiumJson.PROVIDER_ID).subscribe((data:any) => {

				let premiumJson = data.data;
				this.resetCoverAddon(premiumJson[0]);

				this.TOTAL_PREMIUM = this.premiumJson.TOTAL_PREMIUM;
				this.NET_PREMIUM = this.premiumJson.NET_PREMIUM;
				this.SERVICE_TAX = this.premiumJson.SERVICE_TAX;
				this.isPayChecked =true;
				this.renewalCheckEnable	= !this.renewalCheckEnable;
			});
		}
	}

	redirectTo(urlPath:any){
		if( this.affiliateParam!='' ){
			this.router.navigate([`/${this.affiliateParam}${urlPath}`]);
		}else{
			this.router.navigate([`${urlPath}`]);
		}
	}
}

@Component({
  selector: 'amount-confirm-popup',
  templateUrl: 'amount-confirm-popup.html',
})
export class AmountConfirmDialog{

  closeMessage: string = "";
	new_premium:any;
	pev_premium:any;
  constructor(public dialogRef: MatDialogRef<AmountConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal(msg): void {
    // set the closeMessage property here
    this.closeMessage = msg;
    this.dialogRef.close('ref');
  }
}

@Component({
  selector: 'iib-confirm-popup',
  templateUrl: 'iib-confirm-popup.html',
})
export class IIBConfirmDialog{

  closeMessage: string = "";
  constructor(public dialogRef: MatDialogRef<IIBConfirmDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal(msg): void {
    // set the closeMessage property here
    this.closeMessage = msg;
    this.dialogRef.close('ref');
  }
}


@Component({
  selector: 'magma-breakin-confirm-popup',
  templateUrl: 'magma-breakin-confirm-popup.html',
})
export class MAGMAConfirmDialog{

  closeMessage: string = "";
  constructor(public dialogRef: MatDialogRef<MAGMAConfirmDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal(msg): void {
    // set the closeMessage property here
    //this.closeMessage = msg;
    this.dialogRef.close('ref');
  }
}


@Component({
  selector: 'breakin-confirm-popup',
  templateUrl: 'breakin-confirm-popup.html',
})
export class BreakinConfirmDialog{

	inspection_no:any;
	pev_premium:any;
	constructor(public dialogRef: MatDialogRef<BreakinConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

	closeModal(): void {
		this.dialogRef.close('ref');
	}
}

@Component({
  selector: 'breakin-proceed-confirm-popup',
  templateUrl: 'breakin-proceed-confirm-popup.html',
})
export class BreakinProceedConfirmDialog{

	inspection_no:any;
	pev_premium:any;
	constructor(public dialogRef: MatDialogRef<BreakinProceedConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

	closeModal(msg): void {
		this.dialogRef.close('msg');
		this.dialogRef.close({'msg':msg});
	}
}
