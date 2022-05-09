import { Noun } from '../models/NounsModel';
import { Service } from 'typedi';
import { getPartRandom, getRandomPrice, getOwner, getOfferors } from '../utils/general';
import moment from 'moment';
import ImageData from '../assets/image-data.json';
import { buildSVG } from '../utils/decodeImage';


const MAX_ACCESSORIES = 137
const MAX_BODIES = 30
const MAX_GLASSES = 21
const MAX_HATS = 11
const MAX_HEADS = 234
const MAX_BG_COLORS = 2
@Service()
export default class UserService {
    static async getNounForCurrentDay(day: number) {
        const bgColors = getPartRandom(MAX_BG_COLORS, day)
        const body = getPartRandom(MAX_BODIES, day)
        const accessory = getPartRandom(MAX_ACCESSORIES, day)
        const glass = getPartRandom(MAX_GLASSES, day)
        const hat = getPartRandom(MAX_HATS, day)
        const head = getPartRandom(MAX_HEADS, day)
        const parts = [
            { data: ImageData.images.bodies[body].data },
            { data: ImageData.images.heads[head].data },
            { data: ImageData.images.accessories[accessory].data },
            { data: ImageData.images.hats[hat].data },
            { data: ImageData.images.glasses[glass].data }
        ]

        const nounImage = buildSVG(parts, ImageData.palette, ImageData.bgColors[bgColors]);

        const newNoun = new Noun(
            {
                id: day + '',
                nounImage,
                price: getRandomPrice(day),
                owner: getOwner(day),
                offerors: getOfferors(day, 5),
            }
        );
        return newNoun
    }
    static getOldNouns(day: number, limit: number) {
        const result = {};
        for (let i = 0; i < limit; i++) {
            const currentDay = parseInt(moment(moment(day, 'YYYYMMDD').subtract(i, 'days')).format('YYYYMMDD'));
            result[currentDay] = this.getNounForCurrentDay(currentDay);
        }
        return result;
    }
}


