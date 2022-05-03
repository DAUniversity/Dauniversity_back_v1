import { Noun } from '../models/NounsModel';
import { Service } from 'typedi';
import { getPartRandom, getRandomPrice, getOwner } from '../utils/general';
import moment from 'moment';

const MAX_ACCESSORIES = 137
const MAX_BACKGROUNDS = 2
const MAX_BODIES = 31
const MAX_GLASSES = 21
const MAX_HATS = 11

const FOLDER_ACCESSORIES = 'accessories'
const FOLDER_BACKGROUNDS = 'backgrounds'
const FOLDER_BODIES = 'bodies'
const FOLDER_GLASSES = 'glasses'
const FOLDER_HATS = 'hats'

@Service()
export default class UserService {
    static getNounForCurrentDay(day: number) {
        return new Noun(
            {
                id: day + '',
                body: getPartRandom(MAX_BODIES, FOLDER_BODIES, day),
                background: getPartRandom(MAX_BACKGROUNDS, FOLDER_BACKGROUNDS, day),
                accessory: getPartRandom(MAX_ACCESSORIES, FOLDER_ACCESSORIES, day),
                glass: getPartRandom(MAX_GLASSES, FOLDER_GLASSES, day),
                hat: getPartRandom(MAX_HATS, FOLDER_HATS, day),
                price: getRandomPrice(day),
                owner: getOwner(day),
            }
        );
    }
    static getOldNouns(day: number, limit: number) {
        const result = {};
        for (let i = 0; i < limit; i++) {
            const dayMoment = moment(day, 'YYYYMMDD')
            const currentDay = parseInt(moment(dayMoment.subtract(i, 'days')).format('YYYYMMDD'));
            result[currentDay] = this.getNounForCurrentDay(currentDay);
        }
        return result;
    }
}
