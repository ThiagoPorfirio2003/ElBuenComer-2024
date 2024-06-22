import { Component, OnInit } from '@angular/core';
import { enumClientState } from 'src/app/enums/clientState';
import { enumProfile } from 'src/app/enums/profile';
import { enumTypeTable } from 'src/app/enums/tableType';
import { Table } from 'src/app/interfaces/table';
import { client } from 'src/app/interfaces/user';

@Component({
  selector: 'app-maitre-home',
  templateUrl: './maitre-home.page.html',
  styleUrls: ['./maitre-home.page.scss'],
})
export class MaitreHomePage implements OnInit {

  /** para que la propiedad is es gratis */
  listMesas: Table[] = [
    { number: 1, type: enumTypeTable.VIP, peopleQuantity: 4, isFree: true, idCurrentClient: '' },
    { number: 2, type: enumTypeTable.Standar, peopleQuantity: 2, isFree: false, idCurrentClient: '' },
    { number: 3, type: enumTypeTable.Special, peopleQuantity: 6, isFree: true, idCurrentClient: '' },
    { number: 4, type: enumTypeTable.Standar, peopleQuantity: 4, isFree: false, idCurrentClient: '' },
    { number: 5, type: enumTypeTable.VIP, peopleQuantity: 2, isFree: true, idCurrentClient: '' },
    { number: 6, type: enumTypeTable.Special, peopleQuantity: 8, isFree: false, idCurrentClient: '' },
    { number: 7, type: enumTypeTable.Standar, peopleQuantity: 4, isFree: true, idCurrentClient: '' },
    { number: 8, type: enumTypeTable.Special, peopleQuantity: 5, isFree: false, idCurrentClient: '' }
];

 listClientes: client[] = [
  {
      id: 'c1',
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      profile: enumProfile.Client,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fusers%2F45632451?alt=media&token=95ff2ecd-a515-4c76-9179-ad9362a80849',
      dni: '12345678A',
      state: enumClientState.Accepted
  },
  {
      id: 'c2',
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      profile: enumProfile.Client,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fusers%2F45632451?alt=media&token=95ff2ecd-a515-4c76-9179-ad9362a80849',
      dni: '87654321B',
      state: enumClientState.Accepted
  },
  {
      id: 'c3',
      name: 'Alice',
      surname: 'Johnson',
      email: 'alice.johnson@example.com',
      profile: enumProfile.Client,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fusers%2F45632451?alt=media&token=95ff2ecd-a515-4c76-9179-ad9362a80849',
      dni: '11223344C',
      state: enumClientState.Accepted
  },
  {
      id: 'c4',
      name: 'Bob',
      surname: 'Brown',
      email: 'bob.brown@example.com',
      profile: enumProfile.Client,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fusers%2F45632451?alt=media&token=95ff2ecd-a515-4c76-9179-ad9362a80849',
      dni: '44332211D',
      state: enumClientState.Accepted
  },
  {
      id: 'c5',
      name: 'Charlie',
      surname: 'Davis',
      email: 'charlie.davis@example.com',
      profile: enumProfile.Client,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fusers%2F45632451?alt=media&token=95ff2ecd-a515-4c76-9179-ad9362a80849',
      dni: '55667788E',
      state: enumClientState.Accepted
  },
  {
      id: 'c6',
      name: 'Diana',
      surname: 'Miller',
      email: 'diana.miller@example.com',
      profile: enumProfile.Client,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fusers%2F45632451?alt=media&token=95ff2ecd-a515-4c76-9179-ad9362a80849',
      dni: '66778899F',
      state: enumClientState.Accepted
  },
  {
      id: 'c7',
      name: 'Eve',
      surname: 'Wilson',
      email: 'eve.wilson@example.com',
      profile: enumProfile.Client,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fusers%2F45632451?alt=media&token=95ff2ecd-a515-4c76-9179-ad9362a80849',
      dni: '77889900G',
      state: enumClientState.Accepted
  },
  {
      id: 'c8',
      name: 'Frank',
      surname: 'Moore',
      email: 'frank.moore@example.com',
      profile: enumProfile.Client,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/elbuencomer-dff17.appspot.com/o/img%2Fusers%2F45632451?alt=media&token=95ff2ecd-a515-4c76-9179-ad9362a80849',
      dni: '88990011H',
      state: enumClientState.Accepted
  }
];
  constructor() { }

  ngOnInit() {

  }

}
