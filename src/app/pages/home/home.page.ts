import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SwPlayerService } from '../../services/sw-player.service';
import { subscribeOn } from 'rxjs/operators';
import { TransferService } from 'src/app/services/transfer.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public players = [];
  searchQuery = '';
  items: string[];
  searchText;

  constructor(
    private playerService: SwPlayerService,
    private transferService: TransferService,
  ) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = this.players;
  }
  ngOnInit() {
    this.playerService.getPlayers()
      .subscribe(data => this.players = data)
  }

  getItems(ev: any) {
    this.initializeItems();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  addPlayer(player) {
    this.transferService.addPlayer(player);
  }

}



