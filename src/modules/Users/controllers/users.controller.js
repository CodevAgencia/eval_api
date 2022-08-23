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

    // const totals = [4, 5, 2, 1, 2, 2, 2, 2, 2, 3, 3, 5, 3, 2, 3, 2];
    // const valuesArray = results.map(({ data }) => data).flat().map(({ values }) => values).map((v) => v.map((obj) => {
    //   if (obj) { return obj.results; }
    //   return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // }));
    // console.log('🚀 ~ file: users.controller.js ~ line 422 ~ UserController ~ getResults ~ valuesArray', valuesArray);

    res.json({
      dataResultTable: results,
      dataTotalTable: [
        {
          id: 1,
          name: 'total',
          total: 43,
          results: [4, 5, 2, 1, 2, 2, 2, 2, 2, 3, 3, 5, 3, 2, 3, 2],
        },
        {
          id: 2,
          name: 'Prom',
          total: 1,
          results: [
            0.025, 0.02, 0.05, 0.1, 0.025, 0.025, 0.025, 0.025, 0.025, 0.0167, 0.01666666667, 0.01,
            0.01666666667, 0.025, 0.01666666667, 0.025,
          ],
        },
        {
          id: 3,
          name: 'calculated',
          total: 1,
          results: [
            0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
          ],
        },
        {
          id: 4,
          name: 'calculated total',
          results: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        },
      ],
    });
  }
}
