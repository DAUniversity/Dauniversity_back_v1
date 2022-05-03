import { Owner } from "../models/OwnersModel";
import moment from "moment";

export function getRandomArbitrary(min, max, day) {
  let result = day + max + 1;
  while (result > max) {
    result -= max;
    if (result < min) result = min;
  }
  return result
  //return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomPrice(day) {
  return getRandomArbitrary(1, 60, day);
}

export function getOwner(day) {
  if (!moment(day, 'YYYYMMDD') || moment(day, 'YYYYMMDD') >= moment(moment().format('YYYY-MM-DD'))) return null
  const result = new Owner({
    id: getRandomPrice(day) + 4134,
    wallet: '0x' + getRandomPrice(day) + getRandomPrice(day) + day + (day * 5),
    walletShort: (day * 150).toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '.eth'
  });
  return result;
}

export function getOldOwnerDay(day, limit) {
  const dayMoment = moment(day, 'YYYYMMDD')
  const result = {};
  for (let i = 0; i < limit; i++){
    const currentDay = moment(dayMoment.subtract(limit+1, 'day')).format('YYYYMMDD');
    result[currentDay] = (new Owner({
      id: getRandomPrice(day) + 4134,
      wallet: '0x' + getRandomPrice(day) + getRandomPrice(day) + day + (day * 5),
      walletShort: (day * 550).toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '.eth'
    }));
  }
}

export function getPartRandom(max: number, folder: string, day: number) {
  return `/images/${folder}/${getRandomArbitrary(1, max, day)}.png`;
}

