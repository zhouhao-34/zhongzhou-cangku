/* eslint-disable no-param-reassign */

import axios from 'axios';
import Vue from 'vue';
import baseURL from '../configs/base-url';
import store from '../store';
import router from '../router';

const prop = Vue.prototype;
// 请求列表
const requestList = [];
const { CancelToken } = axios;
const sources = {};

let messageCount = 0;
const oneMessage = message => {
  if (messageCount >= 1) {
    return;
  }
  messageCount += 1;
  prop.$message({
    message,
    onClose: () => {
      messageCount = 0;
    },
    type: 'error',
  });
};

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  config => {
    const request = ['url', 'method'].map(v => config[v]).join('-');
    if (requestList.includes(request)) {
      sources[request]('取消重复请求');
    } else {
      requestList.push(request);
      store.dispatch('changeGlobalState', { loading: true });
    }
    config.cancelToken = new CancelToken(cancel => {
      sources[request] = cancel;
    });

    const { userToken, userId } = store.getters;
    config.headers.token = userToken;
    config.headers.userId = userId;
    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => {
    const request = ['url', 'method'].map(v => response.config[v]).join('-');
    requestList.splice(
      requestList.findIndex(item => item === request),
      1,
    );
    if (requestList.length === 0) {
      store.dispatch('changeGlobalState', { loading: false });
    }
    if (response.data.errorCode === prop.$CODE.disabled) {
      prop.$message.error(prop.$MSG.M0020);
    }
    return response;
  },
  error => {
    if (axios.isCancel(error)) {
      store.dispatch('changeGlobalState', { loading: false });
      throw new axios.Cancel('cancel request');
    } else {
      const errorCode = Number(/\d+/.exec(error.message));
      if (errorCode >= 500) {
        return prop.$message.error(prop.$MSG.M0037);
      }
      if (errorCode === 404) {
        return prop.$message.error(prop.$MSG.M0036);
      }
      const errorCodeInData = error.response.data.errorCode;
      if (errorCodeInData === prop.$CODE.noAccess) {
        prop.$message.error(prop.$MSG.M0038);
        return error.response;
      }
      if (
        errorCodeInData === prop.$CODE.unmatchedToken ||
        errorCodeInData === prop.$CODE.invalidToken
      ) {
        router.push('/login');
        store.commit('resetPageTab');
        return oneMessage(prop.$MSG.M0064);
      }
      return prop.$message.error(error.response.data.errorMsg);
    }
  },
);

const request = function request(url, params, config, method) {
  return new Promise((resolve, reject) => {
    axios[method](url, params, Object.assign({}, config))
      .then(
        response => {
          resolve(response.data);
        },
        err => {
          if (err.Cancel) {
            console.log('canceled', err);
          } else {
            reject(err);
          }
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

export default {
  install(VueClass) {
    ['post', 'get', 'delete', 'put'].forEach(method => {
      VueClass.prototype[`$_${method}`] = function requestMethod(url, params, config = {}) {
        return request(url, params, config, method);
      };
    });
  },
};
