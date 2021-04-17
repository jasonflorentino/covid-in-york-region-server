const knexConfig = require('./knexConfig');
const knex = require('knex')(knexConfig);
const csv = require('csv-parser');
const https = require('https');

const RESULTS = [];
const URL = 'https://ww4.yorkmaps.ca/COVID19/Data/YR_CaseData.csv';

https.get(URL, res => {
  res.pipe(csv())
     .on('data', data => RESULTS.push(data))
     .on('end', () => {
       updateDbAsync(RESULTS)
        .then(() => process.exit())
        .catch(e => console.error(e))
     })
});

async function updateDbAsync(data) {
  const stats = countStatus(data);
  stats.total_active = stats.self_isolating + stats.hospitalized + stats.hospitalized_icu;
  stats.date = getYYYYMMDDStringFromDate(new Date());
  await insertIntoDb(stats);
}

function countStatus(data) 
{
  let index = 0;
  let len = data.length
  const status = {date:             null,
                  total:            len,
                  total_active:     null,
                  resolved:         0,
                  deceased:         0,
                  self_isolating:   0,
                  hospitalized:     0,
                  hospitalized_icu: 0
                  };
  
  while (index < len)
  {
    const currStatus = data[index].Status;
    switch (currStatus) {
      case 'Resolved':
        status.resolved += 1;
        break;
      case 'Deceased':
        status.deceased += 1;
        break;
      case 'Self-Isolating':
        status.self_isolating += 1;
        break;
      case 'Hospitalized':
        status.hospitalized += 1;
        break;
      case 'Hospitalized-ICU':
        status.hospitalized_icu += 1;
        break;
      default:
        console.warn('Warning - Unrecognized Status:', currStatus);
        break;
    }
    index++;
  }
  return status;
}

function getYYYYMMDDStringFromDate(date) {
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() + (offset*60*1000))
  return date.toISOString().split('T')[0]
}

function insertIntoDb(stats) {
  return knex('dailies')
    .insert(stats)
    .then(result => console.log("Record created in 'dailies' with ID:", result))
    .catch(err => console.error(err))
}