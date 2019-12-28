import { Insurer } from './../_models/insurer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsurerService {
  private insurers: Insurer[] = [
    {
      id: 'be_0145',
      name: 'Athora (Generali Belgium)',
      serviceAbout: 'Bike Assist, Home Assistance & Car',
      phone: '+32 2 533 79 39',
      email: 'help@europ-assistance.be',
      fax: '+32 2 533 77 75',
      imageUrl: 'be_0145.png'
    },
    {
      id: 'be_0096',
      name: 'Baloise Insurance',
      serviceAbout: '',
      phone: '+32 3 870 95 70',
      email: 'assistance@baloise.be',
      fax: '',
      imageUrl: 'be_0096.png'
    },
    {
      id: 'be_1401',
      name: 'Europ Assistance',
      serviceAbout: '',
      phone: '+32 2 533 75 75',
      email: 'help@europ-assistance.be',
      fax: '+32 2 533 77 75',
      imageUrl: 'be_1401.png'
    },
    {
      id: 'be_0739',
      name: 'D.K.V.',
      serviceAbout: 'Aangifte Zorgverzekering',
      phone: '+32 2 287 64 11',
      email: 'zorg@dkv.be',
      fax: '',
      imageUrl: 'be_0739.png'
    },
    {
      id: 'be_2393',
      name: 'Optimco',
      serviceAbout: 'Assistance en aangiftes',
      phone: '+32 3 231 83 17',
      email: 'aangifteongevallen@optimco.be',
      fax: '',
      imageUrl: 'be_2393.png'
    },
    {
      id: 'be_0687',
      name: 'Das Rechtsbijstand',
      serviceAbout: 'Schade?',
      phone: '+32 9 233 56 58',
      email: 'gent.schade@das.be',
      fax: '',
      imageUrl: 'be_0687.png'
    },
    {
      id: 'be_0985',
      name: 'Dela',
      serviceAbout: 'Melding overlijden',
      phone: '078 05 05 78',
      email: '',
      fax: '',
      imageUrl: 'be_0985.png'
    },
    {
      id: 'be_0097',
      name: 'Allianz Belgium',
      serviceAbout: 'Voertuig, ongeval of schade',
      phone: '+32 2 773 61 04',
      email: '',
      fax: '',
      imageUrl: 'be_0097.png'
    },
    {
      id: 'be_0039',
      name: 'Axa Belgium',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0039.png'
    },
    {
      id: 'be_1037',
      name: 'Piette & Partners',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_1037.png'
    },
    {
      id: 'be_0463',
      name: 'Euromex',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0463.png'
    },
    {
      id: 'be_0664',
      name: 'NN (Delta Lloyd Life)',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0664.png'
    },
    {
      id: 'be_0051',
      name: 'Vivium (ex Vaderlandsche)',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0051.png'
    },
    {
      id: 'be_0058',
      name: 'Vivium',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0058.png'
    },
    {
      id: 'be_0079',
      name: 'AG Insurance',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0079.png'
    },
    {
      id: 'be_0033',
      name: 'Fidea',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0033.png'
    },
    {
      id: 'be_0339',
      name: 'Mensura',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0339.png'
    },
    {
      id: 'be_0445',
      name: 'Arag',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0445.png'
    },
    {
      id: 'be_0014',
      name: 'KBC Verzekeringen',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0014.png'
    },
    {
      id: 'be_0037',
      name: 'Belfius',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0037.png'
    },
    {
      id: 'be_0196',
      name: 'Ethias',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0196.png'
    },
    {
      id: 'be_0858',
      name: 'Argenta Verzekeringen',
      serviceAbout: '',
      phone: '',
      email: '',
      fax: '',
      imageUrl: 'be_0858.png'
    }
  ];

  constructor() {}

  getAllInsurers() {
    return [...this.insurers];
  }

  getInsurer(insurerId: string) {
    return {
      ...this.insurers.find(insurer => {
        return insurer.id === insurerId;
      })
    };
  }
}
