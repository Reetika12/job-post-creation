import _get from 'lodash/get';
import _intersection from 'lodash/intersection';
import AppConfig from '../Config/AppConfig';

export function parseUrl(url) {
    url = url || window.location.href;
    url = window.decodeURIComponent(url)
    let urlParams = {};
    let hashs = url.split('?');
    hashs.forEach((params) => {
        let paramList = params.split('&');
        paramList.forEach((param) => {
            if (param.length) {
                let keys = param.split('=');
                urlParams[keys[0]] = keys[1];
            }
        });
    });
    return urlParams;
}

export function parseParamsUrl(paramsStr = '') {
    let list = paramsStr.split('?');
    if (list.length > 1) {
        let paramsList = list[1].split('&');
        let paramsObject = {};
        paramsList.reduce((result, param) => {
            let keys = param.split('=');
            result[keys[0]] = keys[1];
            return result;
        }, paramsObject);
        return paramsObject;
    }
    return {};
}

export function fetchPageNumber(data, filterBy) {
    return (_get(data, `${filterBy}_recency.data.meta.current_page`) || 0) + 1;
}

export function isUserAdmin(session) {
    let roles = _get(session, 'data.post_sales_roles') || [];
    let isAdminRole = _intersection(roles, AppConfig.adminRole) || [];
    return isAdminRole.length > 0;
}

export function fetchErrorMessage(data, message) {
    let isError = false;
    let fetching = _get(data, `fetching`) || false;
    if (fetching) {
        message = 'Loading...';
    } else if (_get(data, `error.error.code`) || '') {
        message = _get(data, `error.error.message`) || '';
        isError = true;
    }
    return { message, isError, fetching };
}

export function filterK3Profiles(profiles) {
    return profiles.filter((profile) => {
        if (!profile.offline) return true;
        let courseSetupStatuses = _get(profile, 'courseSetupStatuses') || [];
        return courseSetupStatuses.find((c) => c.setupStatus === 'setup_done');
    });
}

export function k3SearchQuery(search) {
    return `query {
  user(search: "${search}") {
    id
    verifiedPhone
    premiumAccount
    profiles {
      id
      nickname
      activeCourse
      offline
      isPaid
      courseSetupStatuses {
        course
        setupStatus
      }
    }
  }
}`;
}
