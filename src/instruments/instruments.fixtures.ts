import { Instrument } from './entities/instrument.entity';
import { generateUser } from '../users/users.fixtures';
import { faker } from '@faker-js/faker';

export const generateInstrument = (
  overrides?: Partial<Instrument>,
): Instrument => {
  const instrument = new Instrument();

  instrument.id = faker.datatype.uuid();
  instrument.name = faker.commerce.productName();
  instrument.users = [generateUser()];

  return { ...instrument, ...overrides };
};

export const generateInstruments = (
  count: number,
  overrides?: Partial<Instrument>,
): Instrument[] => {
  return Array(count)
    .fill(null)
    .map(() => generateInstrument(overrides));
};
