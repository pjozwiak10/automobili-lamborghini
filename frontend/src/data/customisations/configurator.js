import blackBonnet from '../../images/customisations/black-engine-bonnet.webp';
import transparentBonnet from '../../images/customisations/transparent-engine-bonnet.webp';
import carbonBonnet from '../../images/customisations/carbon-fiber-engine-bonnet.webp';
import carbonCover from '../../images/customisations/carbon-engine-cover.webp';
import carbonFrame from '../../images/customisations/carbon-x-frame.webp';
import carbonBay from '../../images/customisations/carbon-engine-bay.webp';
import carbonCap from '../../images/customisations/carbon-wheel-cap.webp';
import carbonMirrors from '../../images/customisations/carbon-mirrors.webp';
import carbonPart from '../../images/customisations/carbon-upper-part.webp';


export const parametersData = [
  {
    group: 'colors',
    parameter: 'paint',
    values: [
      {
        name: 'Bianco Isi',
        id: 'bianco',
        gradient: '#F2F2F2,#C1C1C1',
        color: '#DADADA',
      },
      {
        name: 'Giallo Spica',
        id: 'giallo',
        gradient: '#FFCB48,#DF9923',
        color: '#EFB236',
      },
      {
        name: 'Verde Scandal',
        id: 'verde',
        gradient: '#D1EB31,#8AA112',
        color: '#AEC622',
      },
      {
        name: 'Blu Glauco',
        id: 'blu',
        gradient: '#01BCB8,#007A77',
        color: '#019B98',
      },
      {
        name: 'Nero Aldebaran',
        id: 'nero',
        gradient: '#343434,#010101',
        color: '#1B1B1B',
      },
      {
        name: 'Rosso Leto',
        id: 'rosso',
        gradient: '#B9242D,#740108',
        color: '#97131B',
      },
      {
        name: 'Blu Nereid',
        id: 'nereid',
        gradient: '#0A52AE,#01256E',
        color: '#063C8E',
      },
      {
        name: 'Rosso Mars',
        id: 'mars',
        gradient: '#F71309,#AE0402',
        color: '#D30C06',
      },
      {
        name: 'Bronzo Zenas',
        id: 'bronzo',
        gradient: '#BAA58C,#5E4F3B',
        color: '#8C7A64',
      },
    ]
  },
  {
    group: 'colors',
    parameter: 'rims',
    values: [
      {
        name: 'Grigio Adamas',
        id: 'grigio',
        gradient: '#B2B2B2,#808080',
        color: '#999999',
      },
      {
        name: 'Nero Nemesis',
        id: 'nemesis',
        gradient: '#252524,#030303',
        color: '#141414',
      },
      {
        name: 'Giallo Evros',
        id: 'evros',
        gradient: '#E0A70C,#B58200',
        color: '#CB9506',
      },
      {
        name: 'Oro Elios',
        id: 'elios',
        gradient: '#DCB480,#735431',
        color: '#A88459',
      },
    ]
  },
  {
    group: 'options',
    parameter: 'top view',
    values: [
      {
        name: 'Black Engine Bonnet',
        id: 'black-bonnet',
        img: blackBonnet,
      },
      {
        name: 'Transparent Engine Bonnet',
        id: 'transparent-bonnet',
        img: transparentBonnet,
      },
      {
        name: 'Carbon Fiber Engine Bonnet',
        id: 'carbon-bonnet',
        img: carbonBonnet,
      },
    ]
  },
  {
    group: 'options',
    parameter: 'details',
    values: [
      {
        name: 'Carbon Engine Cover',
        id: 'carbon-cover',
        img: carbonCover,
      },
      {
        name: 'Carbon X-Frame',
        id: 'carbon-frame',
        img: carbonFrame,
      },
      {
        name: 'Carbon Engine Bay',
        id: 'carbon-bay',
        img: carbonBay,
      },
      {
        name: 'Carbon Wheel Cap',
        id: 'carbon-cap',
        img: carbonCap,
      },
      {
        name: 'Carbon Mirrors',
        id: 'carbon-mirrors',
        img: carbonMirrors,
      },
      {
        name: 'Carbon Upper Part',
        id: 'carbon-part',
        img: carbonPart,
      },
    ]
  },
]