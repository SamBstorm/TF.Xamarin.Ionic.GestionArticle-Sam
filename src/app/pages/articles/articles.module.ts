import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesPage } from './articles.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ArticlesPageRoutingModule } from './articles-routing.module';
import { AddArticleComponent } from 'src/app/components/add-article/add-article.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    ArticlesPageRoutingModule
  ],
  declarations: [ArticlesPage, AddArticleComponent]
})
export class ArticlesPageModule {}
