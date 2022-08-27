/* eslint-disable max-len */
import { Op } from 'sequelize';

import { UserService } from '../services';
import { ThematicService } from '../../Thematic/services';
import { ResponseService } from '../../Response/services';
import { dataTable, evaluates, getPositionInResultRow } from '../calculates';

// api/user
export class UserController {
  constructor() {
    this.service = new UserService();
    this.responseService = new ResponseService();
    this.getAllEntrepreneurs = this.getAllEntrepreneurs.bind(this);
    this.getResults = this.getResults.bind(this);
    this.thematicService = new ThematicService();
  }

  async getAllEntrepreneurs(req, res) {
    try {
      const response = await this.service.getAllEntrepreneurs();
      res.json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getResults(req, res) {
    const { userId } = req.params;

    const results = await Promise.all(dataTable.map(async (item) => {
      const subThematics = await this.thematicService.getAllWithFilter({
        code: {
          [Op.in]: item.subThematics,
        },
      });

      return {
        id: item.id,
        thematic: item.thematic,
        data: await Promise.all(subThematics.map(async (sub) => {
          const responses = await this.responseService.findAllWithResponse(userId, sub.id);

          const resultsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

          return {
            id: sub.id,
            subThematic: sub.name,
            values: responses.map((resp) => {
              const thisResult = [...resultsArr];
              const position = getPositionInResultRow(resp?.question?.subtema);
              if (position >= 0) {
                const resultPosition = evaluates[resp?.question?.code](resp.value);
                thisResult[position] = Number(resultPosition);
              }
              return {
                id: resp.id,
                title: resp?.question?.criterion,
                subTitle: resp?.question?.question,
                value: resp.value,
                code: resp?.question?.code,
                type: resp?.question?.type,
                thematicId: resp.question?.thematicId,
                subtema: resp?.question?.subtema,
                percentage: resp?.question?.percentage,
                results: thisResult,
                totals: thisResult.reduce((a, b) => a + b, 0),
              };
            }),
          };
        })),
      };
    }));

    // const results = [
    //   {
    //     id: 1,
    //     thematic: 'Equipo',
    //     data: [
    //       {
    //         id: 4,
    //         subThematic: 'Experiencia',
    //         values: [
    //           {
    //             id: 10,
    //             title: 'Experiencia del Emprendimiento en el Ecosistema',
    //             subTitle: '¿Han participado en aceleradoras, incubadoras, o en espacios de coworking? ',
    //             value: 'Si',
    //             code: 'E_6',
    //             type: 'BOOLEAN',
    //             thematicId: 4,
    //             subtema: 'T3',
    //             percentage: 0.5,
    //             results: [
    //               0,
    //               0,
    //               1,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //             ],
    //             totals: 1,
    //           },
    //         ],
    //       },
    //       {
    //         id: 5,
    //         subThematic: 'Capacidad de Gestión',
    //         values: [
    //           {
    //             id: 12,
    //             title: 'Existencia de un equipo gestor',
    //             subTitle: '¿Ya existe un equipo gestor?',
    //             value: 'No',
    //             code: 'C_1',
    //             type: 'BOOLEAN',
    //             thematicId: 5,
    //             subtema: 'T1',
    //             percentage: 0.025,
    //             results: [
    //               1,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //             ],
    //             totals: 1,
    //           },
    //         ],
    //       },
    //       {
    //         id: 6,
    //         subThematic: 'Fundadores Involucrados',
    //         values: [
    //           {
    //             id: 11,
    //             title: 'Compromiso del equipo mínimo requerido',
    //             subTitle: 'Número de Miembros del equipo trabajando tiempo completo en el emprendimiento',
    //             value: '18',
    //             code: 'FI_2',
    //             type: 'NUMBER',
    //             thematicId: 6,
    //             subtema: 'T1',
    //             percentage: 0.025,
    //             results: [
    //               1,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //             ],
    //             totals: 1,
    //           },
    //         ],
    //       },
    //       {
    //         id: 7,
    //         subThematic: 'Participación Fundadores',
    //         values: [
    //           {
    //             id: 13,
    //             title: 'Paquetes Accionarios para miembros clave',
    //             subTitle: '¿Tienen planeado otorgar paquetes accionarios para los miembros del equipo clave?',
    //             value: 'Si',
    //             code: 'PF_1',
    //             type: 'BOOLEAN',
    //             thematicId: 7,
    //             subtema: 'T1',
    //             percentage: 0.025,
    //             results: [
    //               1,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //             ],
    //             totals: 1,
    //           },
    //           {
    //             id: 15,
    //             title: 'Número de miembros con paquetes accionarios',
    //             subTitle: ' ¿Porcentaje de miembros del equipo clave que  tienen participación u opción de acciones?',
    //             value: '15',
    //             code: 'PF_2',
    //             type: 'DOUBLE',
    //             thematicId: 7,
    //             subtema: 'T1',
    //             percentage: 0.025,
    //             results: [
    //               1,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //             ],
    //             totals: 1,
    //           },
    //         ],
    //       },
    //       {
    //         id: 8,
    //         subThematic: 'Inversión Fundadores',
    //         values: [
    //           {
    //             id: 14,
    //             title: 'Monto Invertido por los fundadores',
    //             subTitle: '¿Cuánto dinero han invertido los fundadores?',
    //             value: '1256',
    //             code: 'IF_1',
    //             type: 'NUMBER',
    //             thematicId: 8,
    //             subtema: 'T1',
    //             percentage: 0.025,
    //             results: [
    //               1,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //               0,
    //             ],
    //             totals: 1,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     thematic: 'Idea y Modelo de Negocio',
    //     data: [
    //       {
    //         id: 9,
    //         subThematic: 'Propuesta de Valor',
    //         values: [],
    //       },
    //       {
    //         id: 10,
    //         subThematic: 'Modelo de Negocio',
    //         values: [],
    //       },
    //     ],
    //   },
    //   {
    //     id: 3,
    //     thematic: 'Producto',
    //     data: [
    //       {
    //         id: 11,
    //         subThematic: 'Product_Market Fit',
    //         values: [],
    //       },
    //       {
    //         id: 12,
    //         subThematic: 'Desempeño Potencial del Producto',
    //         values: [],
    //       },
    //       {
    //         id: 13,
    //         subThematic: 'Tecnología Disruptiva',
    //         values: [],
    //       },
    //     ],
    //   },
    //   {
    //     id: 4,
    //     thematic: 'Mercado',
    //     data: [
    //       {
    //         id: 14,
    //         subThematic: 'Población Objetivo',
    //         values: [],
    //       },
    //       {
    //         id: 15,
    //         subThematic: 'Tamaño del Mercado y Tendencias',
    //         values: [],
    //       },
    //       {
    //         id: 16,
    //         subThematic: 'Barreras de Entrada y Regulación',
    //         values: [],
    //       },
    //       {
    //         id: 17,
    //         subThematic: 'Plan de Expansión',
    //         values: [],
    //       },
    //       {
    //         id: 18,
    //         subThematic: 'Competidores Locales y regionales',
    //         values: [],
    //       },
    //     ],
    //   },
    //   {
    //     id: 5,
    //     thematic: 'Compañia',
    //     data: [
    //       {
    //         id: 19,
    //         subThematic: 'Financiación',
    //         values: [],
    //       },
    //       {
    //         id: 20,
    //         subThematic: 'Unit Economics',
    //         values: [],
    //       },
    //       {
    //         id: 21,
    //         subThematic: 'Punto de Equilibrio',
    //         values: [],
    //       },
    //       {
    //         id: 22,
    //         subThematic: 'Disponibilidad de Fondos',
    //         values: [],
    //       },
    //       {
    //         id: 23,
    //         subThematic: 'Número de Empleados',
    //         values: [],
    //       },
    //     ],
    //   },
    //   {
    //     id: 6,
    //     thematic: 'Oportunidad',
    //     data: [
    //       {
    //         id: 24,
    //         subThematic: 'Ronda de Inversión',
    //         values: [],
    //       },
    //       {
    //         id: 25,
    //         subThematic: 'Valoración de la Compañía',
    //         values: [],
    //       },
    //       {
    //         id: 26,
    //         subThematic: 'Condiciones de negociación',
    //         values: [],
    //       },
    //       {
    //         id: 27,
    //         subThematic: 'Potencial de Agregar valor',
    //         values: [],
    //       },
    //     ],
    //   },
    // ];

    const totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const valuesArray = results.map(({ data }) => data).flat().map(({ values }) => values).map((v) => v.map((obj) => {
      if (obj) { return obj.results; }
      return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }));

    valuesArray.flat().forEach((v) => {
      v.forEach((value, index) => {
        totals[index] += value;
      });
    });
    const proms = [
      // Puntaje de equipo
      totals[0] > 0 ? 0.1 / totals[0] : 0,
      totals[1] > 0 ? 0.1 / totals[1] : 0,
      totals[2] > 0 ? 0.1 / totals[2] : 0,
      totals[3] > 0 ? 0.1 / totals[3] : 0,
      // Puntaje del acuerdo
      totals[4] > 0 ? 0.05 / totals[4] : 0,
      totals[5] > 0 ? 0.05 / totals[5] : 0,
      totals[6] > 0 ? 0.05 / totals[6] : 0,
      totals[7] > 0 ? 0.05 / totals[7] : 0,
      // Puntaje de la Oportunidad
      totals[8] > 0 ? 0.05 / totals[8] : 0,
      totals[9] > 0 ? 0.05 / totals[9] : 0,
      totals[10] > 0 ? 0.05 / totals[10] : 0,
      totals[11] > 0 ? 0.05 / totals[11] : 0,
      // Puntaje del Contexto
      totals[12] > 0 ? 0.05 / totals[12] : 0,
      totals[13] > 0 ? 0.05 / totals[13] : 0,
      totals[14] > 0 ? 0.05 / totals[14] : 0,
      totals[15] > 0 ? 0.05 / totals[15] : 0,
    ];
    const calculateds = proms.map((v, i) => Number((v * totals[i]).toFixed(2)));
    const calculatedsTotal = [
      // Puntaje de equipo
      calculateds[0] > 0 ? (0.1 / calculateds[0]) * 5 : 0,
      calculateds[1] > 0 ? (0.1 / calculateds[1]) * 5 : 0,
      calculateds[2] > 0 ? (0.1 / calculateds[2]) * 5 : 0,
      calculateds[3] > 0 ? (0.1 / calculateds[3]) * 5 : 0,
      // Puntaje del acuerdo
      calculateds[4] > 0 ? (0.05 / calculateds[4]) * 5 : 0,
      calculateds[5] > 0 ? (0.05 / calculateds[5]) * 5 : 0,
      calculateds[6] > 0 ? (0.05 / calculateds[6]) * 5 : 0,
      calculateds[7] > 0 ? (0.05 / calculateds[7]) * 5 : 0,
      // Puntaje de la Oportunidad
      calculateds[8] > 0 ? (0.05 / calculateds[8]) * 5 : 0,
      calculateds[9] > 0 ? (0.05 / calculateds[9]) * 5 : 0,
      calculateds[10] > 0 ? (0.05 / calculateds[10]) * 5 : 0,
      calculateds[11] > 0 ? (0.05 / calculateds[11]) * 5 : 0,
      // Puntaje del Contexto
      calculateds[12] > 0 ? (0.05 / calculateds[12]) * 5 : 0,
      calculateds[13] > 0 ? (0.05 / calculateds[13]) * 5 : 0,
      calculateds[14] > 0 ? (0.05 / calculateds[14]) * 5 : 0,
      calculateds[15] > 0 ? (0.05 / calculateds[15]) * 5 : 0,
    ];
    res.json({
      dataResultTable: results,
      dataTotalTable: [
        {
          id: 1,
          name: 'total',
          total: totals.reduce((prev, curr) => prev + curr, 0),
          results: totals,
        },
        {
          id: 2,
          name: 'Prom',
          total: Number(proms.reduce((prev, curr) => prev + curr, 0).toFixed(2)),
          results: proms.map((v) => Number(v.toFixed(2))),
        },
        {
          id: 3,
          name: 'calculated',
          total: Number(calculateds.reduce((prev, curr) => prev + curr, 0).toFixed(2)),
          results: calculateds,
        },
        {
          id: 4,
          name: 'calculated total',
          results: calculatedsTotal.map((v) => Number(v.toFixed(2))),
        },
      ],
    });
  }
}
