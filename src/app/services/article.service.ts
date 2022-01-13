import { Injectable } from '@angular/core';
import { IArticle } from '../models/iarticle';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private _listArticle: IArticle[] = [
    {
      name:"Ordinateur",
      price:999,
      desc : "Dernier PC portable à la mode",
      id : 1
    }
  ];

  constructor() { }

  public get(): IArticle[]{
    return this._listArticle;
  }

  public getById(id : number): IArticle{
    return this._listArticle[this._listArticle.findIndex(a => a.id === id)];
  }

  public insert(article: IArticle){
    const tab: number[] = [];
    this._listArticle.forEach( (a: IArticle) => {tab.push(a.id)})

    const maxId: number = Math.max(...tab) + 1;
    if(maxId > 0) article.id = maxId;
    else article.id = 1;
    this._listArticle.push(article);
  }

  public remove(id: number){
    this._listArticle.splice(this._listArticle.findIndex(a => a.id === id),1);
  }

  public update(id: number, newValue: IArticle){
    const index = this._listArticle.findIndex(a => a.id === id);
    this._listArticle[index].price = newValue.price;
    this._listArticle[index].name = newValue.name;
    this._listArticle[index].desc = newValue.desc;
  }
}
