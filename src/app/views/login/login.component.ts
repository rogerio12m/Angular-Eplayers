import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { faUser, faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faArrowLeft = faArrowLeft;

  userModel = new User() //modelo/model
  mensagem: string = ""

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  validaLogin(): boolean {

    let blackList = ["SELECT", "OR",' ""="" ', "-- ", "; ", "1 = 1", "1=1", "DROP", "\"\"=\"\"", "'='"];

    let ataque = 0;

    blackList.forEach((palavra) => {
      if(this.userModel.email?.toUpperCase().includes(palavra)) {
        ataque++;
      }
    })

    // if(ataque > 0){
    //   return false;
    // }

    if (
      this.userModel.nome === undefined || this.userModel.nome === '' ||
      this.userModel.email === undefined || this.userModel.email === '' ||
      this.userModel.password === undefined || this.userModel.password === '' || 
      ataque > 0
      ) { 
        return false;
      } else {
        return true;
      }
  }

  // Função de Login
  signin() {

    //fazer validação

    if ( this.validaLogin()) {

      this.userService.sigin(this.userModel).subscribe({
        next: (response) => {
          // arrow function pega o contexto local
          // console.log(responsse);
          this.mensagem = `Logado com sucesso! ${response.status} ${response.statusText}`
          // this.router.navigate([''])

        }, error: (e) => {
          // console.log('DEU RUIMMMMMM', e.error);
          this.mensagem = `${e.error} ${e.status} ${e.statusText}`
        }
      })

    } else {
      this.mensagem = "Preencher todos os campos corretamente"
    }

  }

}
