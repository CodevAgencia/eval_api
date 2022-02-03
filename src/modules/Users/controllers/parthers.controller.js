import { PartnerService } from '../services';

// api/partner
export class PartnerController {
  static async getParthers(req, res) {
    try {
      const { userId } = req.params;
      const response = await PartnerService.getByUserId(userId);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async addPartners(req, res) {
    try {
      const { userId, parthers } = req.body;
      if (!userId || !parthers || parthers.length < 1) {
        res.status(400).json({ error: 'Bad request' });
      }
      await Promise.all(parthers.map((p) => PartnerService.addPartner(userId, p)));
      res.json({ status: 'ok' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
