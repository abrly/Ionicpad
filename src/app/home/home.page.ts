import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Note } from '../interfaces/note';
import { NotesService } from '../services/notes.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private notesService: NotesService, private alertCtrl: AlertController, private navCtrl: NavController) { }
 
  notes: Note[] = [];

  ngOnInit() {


      /*   this.notesService.getNotes().then((rslnts) => {


            console.log('you you come back');
            console.log(rslnts);

            this.notes = rslnts;

            this.notesService.loaded = true;


         }); */

         this.notesService.load();


    }





  addNote() {

    this.alertCtrl.create({
      header: 'New Note',
      message: 'What should the title of this note be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.notesService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });

  }

}
