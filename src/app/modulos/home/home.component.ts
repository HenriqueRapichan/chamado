import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // Correção na propriedade styleUrls
})

export class HomeComponent implements OnInit {
  ngOnInit(): void {
   
  }
  highlightNavItem(event: Event): void {
    const target = event.target as HTMLAnchorElement | null;

    if (target && target.parentNode instanceof HTMLElement) {
      // Remover a classe 'active' de todos os itens de navegação
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach((item: Element) => {
        item.classList.remove('active');
      });

      // Adicionar a classe 'active' ao item de navegação clicado
      target.parentNode.classList.add('active');
    }
  }
 
}
