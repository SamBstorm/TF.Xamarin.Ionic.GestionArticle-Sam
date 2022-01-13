import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AddArticleComponent } from 'src/app/components/add-article/add-article.component';
import { IArticle } from 'src/app/models/iarticle';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: 'articles.page.html',
  styleUrls: ['articles.page.scss']
})
export class ArticlesPage implements OnInit, OnDestroy, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave{

  public listArticle : IArticle[];

  constructor(
    private articleSrv: ArticleService,
    private modalCtrl : ModalController
  ) {}

  async openModal(){
    const modal = await this.modalCtrl.create({
      component : AddArticleComponent
    });

    modal.present();
  }













  /** Cycle de vie de la page */
  ngOnInit(): void {
    console.log('articles est appelé');
    this.listArticle = this.articleSrv.get();
  }
  ionViewWillEnter(): void {
    console.log('articles se charge.');
  }
  ionViewDidEnter(): void {
    console.log('articles est chargé.');
  }

  ionViewWillLeave(): void {
    console.log('articles va être déchargé.');
  }
  ionViewDidLeave(): void {
    console.log('articles a été déchargé');
  }

  ngOnDestroy(): void {
    console.log('articles n\'existe plus');
  }


}
