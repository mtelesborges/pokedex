import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: number[] = [];

  constructor() {
    this.favorites = this.getFavorites();
  }

  isFavorite(id: number|undefined){

    if(!id){
      return false;
    }

    return this.favorites.includes(id);

  }

  getFavorites(){

    const _favoritesLocalStorage = localStorage.getItem('favorites');
    const _favorites: any[] = _favoritesLocalStorage ? JSON.parse(_favoritesLocalStorage) : [];

    return _favorites;
  }

  onFavorite(id: number|undefined){

    if(!id){
      return;
    }

    let _favorites = this.getFavorites();

    if(!_favorites.includes(id)){
      _favorites.push(id);
    }else{
      _favorites = _favorites.filter(favorite => favorite != id);
    }

    this.favorites = _favorites;

    localStorage.setItem('favorites', JSON.stringify(_favorites));

  }

}
