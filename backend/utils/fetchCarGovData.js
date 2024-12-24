import axios from 'axios';
import * as cheerio from 'cheerio';

const ENTRY_URL = 'https://historiapojazdu.gov.pl';

const KEY_FORM = '_historiapojazduportlet_WAR_historiapojazduportlet_:formularz';

const KEY_TITLE = '_historiapojazduportlet_WAR_historiapojazduportlet_:formularz';
const KEY_ENCODED = 'javax.faces.encodedURL';
const KEY_REG = '_historiapojazduportlet_WAR_historiapojazduportlet_:rej';
const KEY_VIN = '_historiapojazduportlet_WAR_historiapojazduportlet_:vin';
const KEY_DATE = '_historiapojazduportlet_WAR_historiapojazduportlet_:data';
const KEY_CONFIRM = '_historiapojazduportlet_WAR_historiapojazduportlet_:btnSprawdz';
const KEY_STATE = 'javax.faces.ViewState';

const KEY_MAKE = '_historiapojazduportlet_WAR_historiapojazduportlet_\\:j_idt10\\:marka';
const KEY_MODEL = '_historiapojazduportlet_WAR_historiapojazduportlet_\\:j_idt10\\:model';
const KEY_YEAR = 'year';
const KEY_MILEAGE = 'km';

const fetchInputData = async (registrationNumber, VIN, dateOfFirstRegistration) => {
  const { data, headers } = await axios.get(ENTRY_URL);

  const $ = cheerio.load(data);
  const form = $(`form[name="${KEY_FORM}"]`).first();

  const url = form.attr('action');

  const body = {
    [KEY_TITLE]: form.find(`input[name="${KEY_TITLE}"]`).attr('value'),
    [KEY_ENCODED]: form.find(`input[name="${KEY_ENCODED}"]`).attr('value'),
    [KEY_REG]: registrationNumber,
    [KEY_VIN]: VIN,
    [KEY_DATE]: dateOfFirstRegistration,
    [KEY_CONFIRM]: form.find(`input[name="${KEY_CONFIRM}"]`).attr('value'),
    [KEY_STATE]: form.find(`input[name="${KEY_STATE}"]`).attr('value'),
  };

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: headers['set-cookie'],
    },
  };

  return { url, body, config };
};

const fetchOutputData = async (url, body, config) => {
  const { data } = await axios.post(url, body, config);

  const $ = cheerio.load(data);

  const year = $(`p.${KEY_YEAR}>span`).first().text().trim();
  const make = $(`span#${KEY_MAKE}`).first().text().trim();
  const model = $(`span#${KEY_MODEL}`).first().text().trim();
  const mileage = $(`p.${KEY_MILEAGE}>span`).first().text().trim();

  return { year, make, model, mileage };
};

const fetchCarGovData = async (registrationNumber, VIN, dateOfFirstRegistration) => {
  try {
    const { url, body, config } = await fetchInputData(registrationNumber, VIN, dateOfFirstRegistration);
    const data = await fetchOutputData(url, body, config);
    return { data };
  } catch (error) {
    return { error: error instanceof axios.AxiosError ? 'Communication failure' : 'Unknown error occurred' };
  }
};

export default fetchCarGovData;
