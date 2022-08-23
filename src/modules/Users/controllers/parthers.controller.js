import { PartnerService, UserService } from '../services';

// api/partner
export class PartnerController {
  constructor() {
    this.userService = new UserService();
    this.partnerService = new PartnerService();

    this.addPartners = this.addPartners.bind(this);
    this.getParthers = this.getParthers.bind(this);
  }

  async getParthers(req, res) {
    try {
      const { userId } = req.params;
      const response = await this.partnerService.getByUserId(userId);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async addPartners(req, res) {
    try {
      const { userId, parthers } = req.body;
      if (!userId || !parthers || parthers.length < 1) {
        res.status(400).json({ error: 'Bad request' });
      }
      await Promise.all(parthers.map((p) => this.partnerService.addPartner(userId, p)));
      await this.userService.update({ status: 1 }, { id: userId });
      res.json({ status: 'ok' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
