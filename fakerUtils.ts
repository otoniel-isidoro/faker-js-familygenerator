import { fakerEN as faker } from '@faker-js/faker';

const imageDefaults = {
  width: 400,
  height: 400,
};

export const getPersonAvatarPicture = async (sex: string, age: number) => {
  switch (true) {
    case age <= 3:
      return faker.image.urlLoremFlickr({
        ...imageDefaults,
        category: `baby${sex == 'male' ? 'boy' : 'girl'},baby/all`,
      });
    case age > 3 && age < 12:
      return faker.image.urlLoremFlickr({
        ...imageDefaults,
        category: `child,${sex == 'male' ? 'boy' : 'girl'},kids/all`,
      });
    case age >= 12 && age <= 18:
      return faker.image.urlLoremFlickr({
        ...imageDefaults,
        category: `teenager,${sex == 'male' ? 'man' : 'woman'},person/all`,
      });
    case age >= 19 && age <= 25:
      return faker.image.urlLoremFlickr({
        ...imageDefaults,
        category: `adult,young,${sex == 'male' ? 'man' : 'woman'},person/all`,
      });
    case age >= 26 && age <= 50:
      return faker.image.urlLoremFlickr({
        ...imageDefaults,
        category: `adult,${sex == 'male' ? 'man' : 'woman'},person/all`,
      });
    case age >= 51 && age <= 64:
      return faker.image.urlLoremFlickr({
        ...imageDefaults,
        category: `adult,old,${sex == 'male' ? 'man' : 'woman'}/all`,
      });
    case age >= 65:
      return faker.image.urlLoremFlickr({
        ...imageDefaults,
        category: `elderly,${sex == 'male' ? 'man' : 'woman'},person/all`,
      });
    default:
      break;
  }
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
