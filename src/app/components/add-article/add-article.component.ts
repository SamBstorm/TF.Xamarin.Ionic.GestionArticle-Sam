import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IArticle } from 'src/app/models/iarticle';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {

  public formGroup : FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleSrv : ArticleService,
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name : ['',Validators.required],
      price : ['',Validators.required],
      desc: ['']
    });
  }

  public onSubmit(){
    if(!this.formGroup.valid) console.warn('Article non conforme...')
    const values = this.formGroup.value;
    this.articleSrv.insert(values);
    this.modalCtrl.dismiss(true);
  }

  public onCancel(){
    this.modalCtrl.dismiss(false);
  }

}
