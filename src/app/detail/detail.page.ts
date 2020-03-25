import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { Note } from '../interfaces/note';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  note: Note;

  constructor(private activatedRoute: ActivatedRoute, private notesService: NotesService,  private navCtrl: NavController) { }

  ngOnInit() {

    const noteId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.notesService.loaded) {
      this.note = this.notesService.getNote(noteId);

      console.log('what is my note details');
      console.log(this.note);

    } else {

      this.notesService.getNotes().then((rslvr) => {
      
        this.note = rslvr.find(note => note.id === noteId);
        console.log('what is my note details 2');
        console.log(this.note);      
      });


    }


    console.log('what happend');

  }


  noteChanged() {
    this.notesService.save();
  }


  deleteNote() {

    this.notesService.deleteOneNote(this.note).then(() => {
  

      this.navCtrl.navigateBack('/notes');

    });
    
  }

}
