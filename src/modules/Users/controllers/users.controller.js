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

    res.json({ dataResultTable: results });

    // res.json({
    //   dataResultTable: [
    //     {
    //       id: 1,
    //       thematic: 'Equipo',
    //       data: [
    //         {
    //           id: 1,
    //           subThematic: 'Experiencia',
    //           values: [
    //             {
    //               id: 1,
    //               code: 'E_1',
    //               title: 'Experiencia Laboral',
    //               subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
    //               results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
    //               total: 20,
    //             },
    //             {
    //               id: 2,
    //               code: 'E_2',
    //               title: 'Experiencia como emprendedores',
    //               subTitle: '¿Han emprendido previamente?',
    //               results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
    //               total: 20,
    //             },
    //           ],
    //         },
    //         {
    //           id: 1,
    //           subThematic: 'Capacidad de Gestión',
    //           values: [
    //             {
    //               id: 1,
    //               code: 'F_1',
    //               title: 'Experiencia Laboral',
    //               subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
    //               results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
    //               total: 20,
    //             },
    //           ],
    //         },
    //         {
    //           id: 1,
    //           subThematic: 'Fundadores Involucrados',
    //           values: [
    //             {
    //               id: 1,
    //               code: 'G_1',
    //               title: 'Experiencia Laboral',
    //               subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
    //               results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
    //               total: 20,
    //             },
    //             {
    //               id: 2,
    //               code: 'G_2',
    //               title: 'Experiencia Laboral',
    //               subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
    //               results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
    //               total: 20,
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: 2,
    //       thematic: 'Idea y Modelo de Negocio',
    //       data: [
    //         {
    //           id: 1,
    //           subThematic: 'Propuesta de Valor',
    //           values: [
    //             {
    //               id: 1,
    //               code: 'PE_1',
    //               title: 'Experiencia Laboral',
    //               subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
    //               results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
    //               total: 20,
    //             },
    //             {
    //               id: 2,
    //               code: 'PE_2',
    //               title: 'Experiencia Laboral',
    //               subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
    //               results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
    //               total: 20,
    //             },
    //           ],
    //         },
    //         {
    //           id: 1,
    //           subThematic: 'Idea de Negocio',
    //           values: [
    //             {
    //               id: 1,
    //               code: 'IN_1',
    //               title: 'Experiencia Laboral',
    //               subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
    //               results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
    //               total: 20,
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: 3,
    //       thematic: 'Producto',
    //       data: [],
    //     },
    //     {
    //       id: 4,
    //       thematic: 'Mercado',
    //       data: [],
    //     },
    //     {
    //       id: 5,
    //       thematic: 'Compañia',
    //       data: [],
    //     },
    //     {
    //       id: 6,
    //       thematic: 'Oportunidad',
    //       data: [],
    //     },
    //   ],
    //   dataTotalTable: [
    //     {
    //       id: 1,
    //       name: 'total',
    //       total: 43,
    //       results: [4, 5, 2, 1, 2, 2, 2, 2, 2, 3, 3, 5, 3, 2, 3, 2],
    //     },
    //     {
    //       id: 2,
    //       name: 'Prom',
    //       total: 1,
    //       results: [
    //         0.025, 0.02, 0.05, 0.1, 0.025, 0.025, 0.025, 0.025, 0.025, 0.0167, 0.01666666667, 0.01,
    //         0.01666666667, 0.025, 0.01666666667, 0.025,
    //       ],
    //     },
    //     {
    //       id: 3,
    //       name: 'calculated',
    //       total: 1,
    //       results: [
    //         0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
    //       ],
    //     },
    //     {
    //       id: 4,
    //       name: 'calculated total',
    //       results: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    //     },
    //   ],
    // });
  }
}
