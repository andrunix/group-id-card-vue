import mockResults from './mocksearch.js';

const api = {
  subscriberSearch: () => new Promise(resolve => {
    resolve(mockResults);
  })
  /*
  subscriberSearch: function (params) {
    return new Promise(resolve => {
      // actually, we need to call the service here
      setTimeout(function () {
        resolve(mockResults);
      }, 2000);
    });
  }
  */
};

export default api;
