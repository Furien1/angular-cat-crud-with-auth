import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Cat } from 'src/app/_models/cat';
import { FormBuilder, Validators } from '@angular/forms';
import { CatService } from 'src/app/_services/cat.service';
// import { first } from 'rxjs/operators'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[];
  cats: Cat[];

  catForm = this.fb.group({
    name: ['', Validators.required],
    food: ['', Validators.required],
    img: ['', Validators.required],
    task: 'add'
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private catService: CatService
  ) {
    // Ha nincs belepett felhasznalo, atiranyitas
    if(!this.authenticationService.userValue){
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {
    this.userService.getAll().subscribe( data => {
      // users tömb tartalmazza a visszakapott értékeket
      // console.log("A visszakapott adat: " + data);
      this.users = data;
    })

    this.getCats();
  }


  // Macskás form hozzáadás
  addCatToService() {
    console.log(this.catForm.value);
    this.catService.addCatToDatabase(this.catForm.value).subscribe(data => console.log(data));
    // this.catService.addCatToDatabase(this.catForm.value).subscribe();
  }

  getCats() {
    this.catService.getCatsFromDatabase().subscribe(data => {console.log(data)});
  }

}
