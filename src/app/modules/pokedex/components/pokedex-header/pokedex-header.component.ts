import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pokedex-header',
  templateUrl: './pokedex-header.component.html',
  styleUrls: ['./pokedex-header.component.scss']
})
export class PokedexHeaderComponent implements OnInit {

  @Input() totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 20;

  form!: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.onActivatedRoute();
  }

  onActivatedRoute(){
    this.activatedRoute
      .queryParams
      .subscribe({
        next: (response) => {
          this.form.patchValue(response);
        }
    })
  }

  createForm(){
    this.form = this.formBuilder.group({
      id: [null]
    })
  }

  onPageChanged(ev: PageChangedEvent){
    this.currentPage = ev?.page;
    this.onFilter(this.currentPage);
  }

  onFilter(page: number){

    // os parâmetros são atribuídos a url porque se a página for recarregada, o estado atual dela é devolvido
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: page,
        id: this.form.get('id')?.value ?? ''
      }
    })
  }

}
