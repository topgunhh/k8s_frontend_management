import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/k8s_resource/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/k8s_resource/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPodNum(podNum) {
  return request({
    url: '/vue-element-admin/k8s_resource/podNum',
    method: 'get',
    params: { podNum }
  })
}
export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/k8s_resource/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/k8s_resource/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/k8s_resource/update',
    method: 'post',
    data
  })
}
