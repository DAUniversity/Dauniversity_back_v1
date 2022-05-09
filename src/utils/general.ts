import { Owner } from "../models/OwnersModel";
import { Offeror } from "../models/OfferorsModel";
import moment from "moment";


export function getRandomArbitrary(min: number, max: number, day: number) {
  let result = day + max;
  while (result >= max) {
    result -= max;
    if (result <= min) result = min;
  }
  return result
  //return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomPrice(day: number) {
  return getRandomArbitrary(1, 60, day);
}

export function getOwner(day: number) {
  if (!moment(day, 'YYYYMMDD') || moment(day, 'YYYYMMDD') >= moment(moment().format('YYYY-MM-DD'))) return null
  const result = new Owner({
    id: (getRandomPrice(day) + 4134) + '',
    wallet: '0x' + getRandomPrice(day) + getRandomPrice(day) + day + (day * 5),
    walletShort: (day * 1550).toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '.eth'
  });
  return result;
}

export function getPartRandom(max: number, day: number) {
  return getRandomArbitrary(0, max, day)
}

export function getOfferors(day: number, limit: number) {
  const result = []
  for (let i = 0; i < limit; i++) {
    const randPrice = getRandomPrice(day) - (i + 2)
    result.push(new Offeror({
      id: (Math.floor(day/3) + 1 * i) + '',
      owner: getOwner((Math.floor(day/2) + i)),
      price: randPrice < 0 ? 0.1 : randPrice,
    }));
  }
  return result;
}

