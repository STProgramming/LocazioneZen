import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Icomuni } from '../interface/Icomuni';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  cities : Icomuni[] = [];
  formContract: FormGroup = null;
  formLessor: FormGroup = null;
  formConductor: FormGroup = null;
  formLocation: FormGroup = null;
  formEconomic: FormGroup = null;
  typeOfContracts : string[] = ['Uso Abitativo (4+4 Anni)', 'Uso Abitativo Agevolato (3+2 Anni)', 'Transitorio (1-18 mesi)', 'Studenti Universitari (6-36 mesi)']; 
  formOne: boolean = false;
  formTwo: boolean = false;
  formThree: boolean = false;
  formFour: boolean = false;
  loading: boolean = false;
  tokenNamePosition = "MyLocationZenPosition";

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    let values = this.getValuesForms(this.getTokenPosition());
    setTimeout(() =>{
      this.getAllCities();
      this.initializeFormContract();
      this.initializeFormLessor();
      this.initializeFormConductor();
      this.initializeFormLocation();
      this.initializeFormEconomic();
      switch(this.getTokenPosition()){
        case "1":
          this.fetchFormContract(values);
          break;
        case "2": 
          this.formOne = true;
          this.fetchFormLessor(values);
          break;
        case "3":
          this.formOne = true;
          this.formTwo = true;
          this.fetchFormConductor(values);
          break;
        case "4": 
        this.formOne = true;
        this.formTwo = true;
        this.formThree = true;
        this.fetchFormLocation(values);
          break;
        case "5":
          this.formOne = true;
          this.formTwo = true;
          this.formThree = true;
          this.formFour = true;
          this.fetchFormEconomic(values);
        break;
        default : 
          console.log('tranqui');
      }
      this.loading = false;
    }, 2000);
  }

  async getAllCities(){
    await this.httpClient.get<Icomuni[]>('https://comuni-ita.herokuapp.com/api/comuni').subscribe(
      value => {
        if(value){
          this.cities = value;
        }
      },
      error => console.log(error)
    )
  }

  initializeFormContract(){
    this.formContract = new FormGroup ({
      contractType: new FormControl('', Validators.required),
      startDate: new FormControl ('', Validators.required),
      endDate: new FormControl ('', Validators.required),
      monthsNotice: new FormControl ('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  fetchFormContract(value: any){
    if(value !== null){
      this.formContract = new FormGroup ({
        contractType: new FormControl(value.contractType, Validators.required),
        startDate: new FormControl (value.startDate, Validators.required),
        endDate: new FormControl (value.endDate, Validators.required),
        monthsNotice: new FormControl (value.monthsNotice, [Validators.required, Validators.pattern("^[0-9]*$")])
      });
    }
  }

  initializeFormLessor(){
    this.formLessor = new FormGroup ({
      nameLessor: new FormControl('', Validators.required),
      birthLocationLessor: new FormControl ('', Validators.required),
      birthdateLessor: new FormControl ('', Validators.required),
      fiscalCodeLessor: new FormControl ('', Validators.required),
      residenceLessor: new FormControl('', Validators.required)
    });
  }

  fetchFormLessor(value: any){
    if(value !== null){
      this.formLessor = new FormGroup ({
        nameLessor: new FormControl(value.nameLessor, Validators.required),
        birthLocationLessor: new FormControl (value.birthLocationLessor, Validators.required),
        birthdateLessor: new FormControl (value.birthdateLessor, Validators.required),
        fiscalCodeLessor: new FormControl (value.fiscalCodeLessor, Validators.required),
        residenceLessor: new FormControl(value.residenceLessor, Validators.required)
      });
    }
  }

  initializeFormConductor(){
    this.formConductor = new FormGroup ({
      nameConductor: new FormControl('', Validators.required),
      birthLocationConductor: new FormControl ('', Validators.required),
      birthdateConductor: new FormControl ('', Validators.required),
      fiscalCodeConductor: new FormControl ('', Validators.required),
      residenceConductor: new FormControl('', Validators.required)
    });
  }

  fetchFormConductor(value: any){
    if(value !== null){
      this.formConductor = new FormGroup ({
        nameConductor: new FormControl(value.nameConductor, Validators.required),
        birthLocationConductor: new FormControl (value.birthLocationConductor, Validators.required),
        birthdateConductor: new FormControl (value.birthdateConductor, Validators.required),
        fiscalCodeConductor: new FormControl (value.fiscalCodeConductor, Validators.required),
        residenceConductor: new FormControl(value.residenceConductor, Validators.required)
      });
    }
  }

  initializeFormLocation(){
    this.formLocation = new FormGroup ({
      address: new FormControl ('', Validators.required),
      space: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      roomsNumber: new FormControl('', Validators.required),
      paper: new FormControl('', Validators.required),
      parcel: new FormControl('', Validators.required),
      subordinate: new FormControl('', Validators.required)
    });
  }

  fetchFormLocation(value: any){
    if(value !== null){
      this.formLocation = new FormGroup ({
        address: new FormControl (value.address, Validators.required),
        space: new FormControl(value.space, Validators.required),
        floor: new FormControl(value.floor, Validators.required),
        roomsNumber: new FormControl(value.roomsNumber, Validators.required),
        paper: new FormControl(value.paper, Validators.required),
        parcel: new FormControl(value.parcel, Validators.required),
        subordinate: new FormControl(value.subordinate, Validators.required)
      });
    }
  }

  initializeFormEconomic(){
    this.formEconomic = new FormGroup ({
      securityDeposit: new FormControl('', Validators.required),
      rent: new FormControl('', Validators.required),
      condominiumFees: new FormControl('', Validators.required),
      iban: new FormControl('', Validators.required),
      bankAccountOwner: new FormControl('', Validators.required)
    });
  }

  fetchFormEconomic(value: any){
    if(value !== null){
      this.formEconomic = new FormGroup ({
        securityDeposit: new FormControl(value.securityDeposit, Validators.required),
        rent: new FormControl(value.rent, Validators.required),
        condominiumFees: new FormControl(value.condominiumFees, Validators.required),
        iban: new FormControl(value.iban, Validators.required),
        bankAccountOwner: new FormControl(value.bankAccountOwner, Validators.required)
      });
    }
  }

  nextForm(form: FormGroup, levelForm: number){
    if(form.valid){
      switch(levelForm){
        case 2:
          this.formOne = true;
          this.createToken(levelForm, form);
          break;
        case 3:
          this.formTwo = true;
          this.createToken(levelForm, form);
          break;
        case 4:
          this.formThree = true;
          this.createToken(levelForm, form);
          break;
        case 5:
          this.formFour = true;
          this.createToken(levelForm, form);
          break;
        default:
          console.log('dunno');
      }
      window.location.reload();
    }
  }

  backForm(levelForm: number){
    switch(levelForm){
      case 1:
        this.removeToken(levelForm);
        this.formOne = false;
        break;
      case 2:
        this.removeToken(levelForm);
        this.formTwo = false;
        break;
      case 3:
        this.removeToken(levelForm);
        this.formThree = false;
        break;
      case 4:
        this.removeToken(levelForm);
        this.formFour = false;
        break;
      default:
        console.log('dunno');
    }
    window.location.reload();
  }

  cancelAllForms(){
    this.formOne = false;
    this.formTwo = false;
    this.formThree = false;
    this.formFour = false;
    localStorage.clear();
    window.location.reload();
  }

  createToken(numberValidation: number, form: FormGroup){
    if(localStorage.getItem(this.tokenNamePosition) !== null){
      localStorage.removeItem(this.tokenNamePosition);
    }
    localStorage.setItem(this.tokenNamePosition, numberValidation.toString());
    numberValidation --;
    localStorage.setItem(numberValidation.toString(), JSON.stringify(form.value))
  }

  getTokenPosition(){
    return localStorage.getItem(this.tokenNamePosition); 
  }

  getValuesForms(numberForm: string){
    return JSON.parse(localStorage.getItem(numberForm));
  }

  removeToken(numberValidation: number){
    localStorage.removeItem(this.tokenNamePosition);
    localStorage.setItem(this.tokenNamePosition, numberValidation.toString());
  }

  goToSignature(){
    this.router.navigateByUrl('signature');
  }
}
