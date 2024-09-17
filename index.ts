import './styles.css';

import { fakerEN as faker } from '@faker-js/faker';
import { areaCodeMappingByUSState } from './areaCodeMappingByUSState';
import { getRandomInt, getPersonAvatarPicture } from './fakerUtils';

(async () => {
  const appDiv: HTMLElement = document.querySelector('#app');

  const lastName = faker.person.lastName();

  const familyMembersAges = [
    [0, 3],
    [0, 3],
    [4, 12],
    [4, 12],
    [12, 16],
    [12, 16],
    [16, 64],
    [16, 64],
    [65, 130],
    [65, 130],
  ];

  const state = faker.location.state();
  const areaCodesByState = areaCodeMappingByUSState[state];
  const areaCode = areaCodesByState[getRandomInt(areaCodesByState.length)];
  for (const familyMember of familyMembersAges) {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const birthDate = faker.date.birthdate({
      mode: 'age',
      min: familyMember[0],
      max: familyMember[1],
    });
    const age = Math.abs(
      new Date(Date.now() - birthDate.getTime()).getUTCFullYear() - 1970
    );
    let avatarUrl = await getPersonAvatarPicture(sex, age);

    const zipCode = faker.location.zipCode();

    const pattern = new RegExp(`[+]1${areaCode}55501[0-9]{2}`);

    const phoneNumber = faker.helpers.fromRegExp(pattern);
    appDiv.innerHTML += `
<div class="card">
  <div class="card__image">
    <img src="${faker.image.url()}" alt="Background image for ${firstName} ${lastName}"/>
  </div>
  <div class="card__profile">
    <img src="${avatarUrl}" alt="Avatar image of ${firstName} ${lastName}"/>
  </div>
  <div class="card__body">
    <h2>${firstName} ${lastName}</h2>
    <p><b>Sex:</b> ${sex} </p>
    <p><b>Birth Date:</b> ${birthDate.toLocaleDateString('en-US')} (${age}y)</p>
    <p><b>Phone Number:</b> ${phoneNumber}</p>
    <p><b>Address:</b>${faker.location.streetAddress()}, ${faker.location.city()}, ${state}</p>
    <p><b>Zip Code:</b> ${zipCode}</p>
  </div>  
</div>
`;
  }
})();
