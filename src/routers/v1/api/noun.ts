import { Router } from "express";
import moment from "moment";
import NounsService from '../../../services/NounsServices'

const router = Router();

router.get('/:day', async (req, res) => {
  if(!Number.isInteger(parseInt(req.params.day))) {
    return res.status(400).end();
  }
  const day = parseInt(req.params.day)
  const result = NounsService.getNounForCurrentDay(day)
  return res.status(200).send(result);
});

router.get('/', async (req, res) => {
  if(!req.query.limit) req.query.limit = '1';
  if(!Number.isInteger(parseInt(req.query.limit.toString()))) {
    return res.status(400).end();
  }
  const limit = parseInt(req.query.limit.toString())
  const day = parseInt(moment().format('YYYYMMDD'))
  const result = NounsService.getOldNouns(day, limit)
  return res.status(200).send(result);
});

export default router;
