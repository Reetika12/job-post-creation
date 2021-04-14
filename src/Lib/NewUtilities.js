import qs from 'qs'
import _merge from 'lodash/merge'

export function parseUrl() {
    let urlParams = {}
    if (window.location.hash) {
        urlParams = qs.parse(window.decodeURIComponent(window.location.hash.substring(1))) || {}
    }
    if (window.location.search) {
        _merge(urlParams, qs.parse(window.decodeURIComponent(window.location.search.substring(1))) || {})
    }
    return urlParams
}