import {Component, OnInit} from '@angular/core';
import {OwnerSummary} from '../model/OwnerSummary';

@Component({
  selector: 'app-owner-search',
  templateUrl: './owner-search.component.html',
  styleUrls: ['./owner-search.component.css']
})
export class OwnerSearchComponent implements OnInit {

  displayedColumns: string[] = ['name', 'address', 'city', 'telephone', 'petNames'];
  dataSource = OWNERS;

  constructor() {
  }

  ngOnInit() {
  }

}

const OWNERS: OwnerSummary[] = [
  {
    id: 1,
    name: 'George Franklin',
    address: '110 W. Liberty St.',
    city: 'Madison',
    telephone: '6085551023',
    petNames: 'Leo',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/1'
      }
    }
  },
  {
    id: 2,
    name: 'Betty Davis',
    address: '638 Cardinal Ave.',
    city: 'Sun Prairie',
    telephone: '6085551749',
    petNames: 'Basil',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/2'
      }
    }
  },
  {
    id: 3,
    name: 'Eduardo Rodriquez',
    address: '2693 Commerce St.',
    city: 'McFarland',
    telephone: '6085558763',
    petNames: 'Jewel, Rosy',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/3'
      }
    }
  },
  {
    id: 4,
    name: 'Harold Davis',
    address: '563 Friendly St.',
    city: 'Windsor',
    telephone: '6085553198',
    petNames: 'Iggy',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/4'
      }
    }
  },
  {
    id: 5,
    name: 'Peter McTavish',
    address: '2387 S. Fair Way',
    city: 'Madison',
    telephone: '6085552765',
    petNames: 'George',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/5'
      }
    }
  },
  {
    id: 6,
    name: 'Jean Coleman',
    address: '105 N. Lake St.',
    city: 'Monona',
    telephone: '6085552654',
    petNames: 'Max, Samantha',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/6'
      }
    }
  },
  {
    id: 7,
    name: 'Jeff Black',
    address: '1450 Oak Blvd.',
    city: 'Monona',
    telephone: '6085555387',
    petNames: 'Lucky',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/7'
      }
    }
  },
  {
    id: 8,
    name: 'Maria Escobito',
    address: '345 Maple St.',
    city: 'Madison',
    telephone: '6085557683',
    petNames: 'Mulligan',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/8'
      }
    }
  },
  {
    id: 9,
    name: 'David Schroeder',
    address: '2749 Blackhawk Trail',
    city: 'Madison',
    telephone: '6085559435',
    petNames: 'Freddy',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/9'
      }
    }
  },
  {
    id: 10,
    name: 'Carlos Estaban',
    address: '2335 Independence La.',
    city: 'Waunakee',
    telephone: '6085555487',
    petNames: 'Lucky, Sly',
    _links: {
      owner: {
        href: 'http://localhost:8080/my-petclinic/owners/10'
      }
    }
  }
];

