import axios from 'axios';
import mockResults from './mocksearch.js';

const API_BASE = 'http://localhost:4001';

export function subscriberSearch (options) {
  // http://anwas29:14127/EmployerBrokerServiceWeb/member?lastname=Hall&firstname=Chris&grpid=100000
  // http://anwas29:14127/EmployerBrokerServiceWeb/member?ssn=
  // const url = `http://anwas29:14127/EmployerBrokerServiceWeb/member?ssn=${params}`;

  const notEmpty = opt => options[opt] !== '';
  const keyToParam = opt => `${opt}=${options[opt]}`;
  const arrayOpts = Object.keys(options).filter(notEmpty).map(keyToParam).join('&');
  
  return new Promise((resolve, reject) => {
    console.log('options: ', arrayOpts);
    let url = `http://anwas29:14127/EmployerBrokerServiceWeb/member?`;
    url += arrayOpts;
    axios.defaults.headers.common['loggedInUserID'] = 'g100000';
    axios.get(url)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getTempCardPdf (params) {
  // TODO: 1) pass the params to the service
  //       2) use the proper URL for the service

  return new Promise((resolve, reject) => {
    axios({
      url: `${API_BASE}/idcard/subscriber/100.pdf`,
      method: 'GET',
      responseType: 'blob' // important
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (err) {
        reject(err);
      });
  });
}
