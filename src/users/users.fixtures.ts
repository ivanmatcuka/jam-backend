import { User } from './entities/user.entity';
import { Role } from 'src/users/role.enum';
import { faker } from '@faker-js/faker';
import { Country } from 'src/enums/countries.enum';

export const generateUser = (overrides?: Partial<User>): User => {
  const user = new User();

  user.id = faker.datatype.uuid();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.country = faker.helpers.arrayElement(Object.values(Country)) as Country;
  user.city = faker.address.city();
  user.role = faker.helpers.arrayElement(Object.values(Role)) as Role;

  return { ...user, ...overrides };
};

export const generateUsers = (
  count: number,
  overrides?: Partial<User>,
): User[] => {
  return Array(count)
    .fill(null)
    .map(() => generateUser(overrides));
};
