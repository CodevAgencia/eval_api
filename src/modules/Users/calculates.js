/* eslint-disable no-unused-vars */
export const evaluates = {
  E_1: (value) => value && value.includes('Si'),
  E_2: (value) => value && value.includes('Si'),
  E_3: (value) => value && value.includes('Si'),
  E_4: (value) => value && (value.includes('Mercado') || value.includes('Sector') || value.includes('Industria') || value.includes('Tecnología')),
  E_5: (value) => !!value,
  E_6: (value) => value && value.includes('Si'),
  E_7: (value) => !!value,
  C_1: (value) => value && value.includes('Si'),
  C_2: (value) => value && value.includes('Si'),
  FI_1: (value) => !!value,
  FI_2: (value) => value >= 2,
  PF_1: (value) => value && value.includes('Si'),
  PF_2: (value) => value && Number(value) >= 50,
  IF_1: (value) => true,
  VD_1: (value) => value && value.includes('Si'),
  PV_1: (value) => value && value.includes('3'),
  PV_2: (value) => value && value.includes('3'),
  PV_3: (value) => value && value.includes('3'),
  PV_4: (value) => value && value.includes('3'),
  PV_5: (value) => value && value.includes('3'),
  PV_6: (value) => value && value.includes('3'),
  PV_7: (value) => value && value.includes('3'),
  PV_8: (value) => value && value.includes('3'),
  PV_9: (value) => value && value.includes('3'),
  MN_1: (value) => value && value.includes('3'),
  MN_2: (value) => value && value.includes('3'),
  MN_3: (value) => value && value.includes('3'),
  MN_4: (value) => value && value.includes('3'),
  MN_5: (value) => value && value.includes('3'),
  MN_6: (value) => value && value.includes('3'),
  MN_7: (value) => value && value.includes('3'),
  PMF_1: (value) => value && value.includes('Si'),
  PMF_2: (value) => value && value.includes('Si'),
  PMF_3: (value) => value && value.includes('Si'),
  PMF_4: (value) => value && value.includes('Si'),
  PMF_5: (value) => value && value.includes('2'),
  DPP_1: (value) => value && value.includes('Si'),
  DPP_2: (value) => !!value, // Informativa
  TD_1: (value) => value && value.includes('Si'),
  TD_2: (value) => value && value.includes('Si'),
  TD_3: (value) => value && value.includes('Si'),
  TD_4: (value) => !!value, // Informativa
  BER_1: (value) => value && value.includes('No'),
  BER_2: (value) => value && value.includes('Si'),
  TRL: (value) => value && (value.includes('5') || value.includes('6') || value.includes('7') || value.includes('8') || value.includes('9')),
  PEXP_1: (value) => value && value.includes('Si'),
  PEXP_2: (value) => (value ? Number(value) <= 24 : false),
  COMP_1: (value) => value && value.includes('No'),
  COMP_2: (value) => value && value.includes('No'),
  COMP_3: (value) => value && value.includes('3'),
  COMP_4: (value) => value && value.includes('3'),
  FIX_1: (value) => value && value.includes('Si'),
  FIX_2: (value) => value && Number(value) >= 80,
  UE_1: (value) => !!value, // Informativa
  UE_2: (value) => !!value, // Informativa
  UE_3: (value) => !!value, // Informativa
  UE_4: (value) => !!value, // Informativa
  UE_5: (value) => !!value, // Informativa
  UE_6: (value) => !!value, // Informativa
  UE_7: (value) => !!value, // Informativa
  UE_8: (value) => !!value, // Informativa
  PE_1: (value) => !!value, // Informativa
  PE_2: (value) => !!value, // Informativa
  PE_3: (value) => !!value, // Informativa
  PE_4: (value) => !!value, // Informativa
  PE_5: (value) => !!value, // Informativa
  DF_1: (value) => value && Number(value) >= 3,
  RI_1: (value) => !!value, // Informativa
  VC_1: (value) => !!value, // Informativa
  CN_1: (value) => !!value, // Informativa
  CN_2: (value) => !!value, // Informativa
  CN_3: (value) => !!value, // Informativa
  CN_4: (value) => !!value, // Informativa
  CN_5: (value) => !!value, // Informativa
  CN_6: (value) => !!value, // Informativa
  CN_7: (value) => !!value, // Informativa
  PAV_1: (value) => !!value, // Informativa
  PAV_2: (value) => !!value, // Informativa
  PAV_3: (value) => !!value, // Informativa
  PAV_4: (value) => !!value, // Informativa
};

export const subTematics = ['T1', 'T2', 'T3', 'T4', 'D1', 'D2', 'D3', 'D4', 'O1', 'O2', 'O3', 'O4', 'C1', 'C2', 'C3', 'C4'];

export const getPositionInResultRow = (t) => subTematics.indexOf(t);

export const dataTable = [
  {
    id: 1,
    thematic: 'Equipo',
    subThematics: ['E_0', 'C_0', 'FL_0', 'PF_0', 'IF_0'],
  },
  {
    id: 2,
    thematic: 'Idea y Modelo de Negocio',
    subThematics: ['PV_0', 'MN_0'],
  },
  {
    id: 3,
    thematic: 'Producto',
    subThematics: ['PMF_0', 'DPP_0', 'TD_0'],
  },
  {
    id: 4,
    thematic: 'Mercado',
    subThematics: ['POPN_0', 'TAM_0', 'BER_0', 'PEXP_0', 'COMP_0'],
  },
  {
    id: 5,
    thematic: 'Compañia',
    subThematics: ['FI_0', 'UE_1', 'PE_0', 'DF_0', 'NE_0'],
  },
  {
    id: 6,
    thematic: 'Oportunidad',
    subThematics: ['RI_0', 'VC_0', 'CN_0', 'PAV_0'],
  },
];
