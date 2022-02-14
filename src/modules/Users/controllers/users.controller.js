import { UserService } from '../services';

// api/user
export class UserController {
  constructor() {
    this.service = new UserService();
    this.getAllEntrepreneurs = this.getAllEntrepreneurs.bind(this);
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
    res.json({
      dataResultTable: [
        {
          id: 1,
          thematic: 'Equipo',
          data: [
            {
              id: 1,
              subThematic: 'Experiencia',
              values: [
                {
                  id: 1,
                  code: 'E_1',
                  title: 'Experiencia Laboral',
                  subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
                  results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
                  total: 20,
                },
                {
                  id: 2,
                  code: 'E_2',
                  title: 'Experiencia Laboral',
                  subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
                  results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
                  total: 20,
                },
              ],
            },
            {
              id: 1,
              subThematic: 'Capacidad de Gestión',
              values: [
                {
                  id: 1,
                  code: 'F_1',
                  title: 'Experiencia Laboral',
                  subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
                  results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
                  total: 20,
                },
              ],
            },
            {
              id: 1,
              subThematic: 'Funcadores Involucrados',
              values: [
                {
                  id: 1,
                  code: 'G_1',
                  title: 'Experiencia Laboral',
                  subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
                  results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
                  total: 20,
                },
                {
                  id: 2,
                  code: 'G_2',
                  title: 'Experiencia Laboral',
                  subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
                  results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
                  total: 20,
                },
              ],
            },
          ],
        },
        {
          id: 1,
          thematic: 'Idea y Modelo de Negocio',
          data: [
            {
              id: 1,
              subThematic: 'Propuesta de Valor',
              values: [
                {
                  id: 1,
                  code: 'PE_1',
                  title: 'Experiencia Laboral',
                  subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
                  results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
                  total: 20,
                },
                {
                  id: 2,
                  code: 'PE_2',
                  title: 'Experiencia Laboral',
                  subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
                  results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
                  total: 20,
                },
              ],
            },
            {
              id: 1,
              subThematic: 'Idea de Negocio',
              values: [
                {
                  id: 1,
                  code: 'IN_1',
                  title: 'Experiencia Laboral',
                  subTitle: 'Experiencia de los Emprendedores ¿Han trabajado en una gran corporación?',
                  results: [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 4, 1, 0],
                  total: 20,
                },
              ],
            },
          ],
        },
      ],
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
