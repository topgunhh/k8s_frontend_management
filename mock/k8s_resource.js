const Mock = require('mockjs')
const { ip } = require('mockjs/src/mock/random/web')

const List = []
const count = 5

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let m = 0; m < count; m++) {
  List.push(Mock.mock({
    id: '@increment',
    name: 'k8s_node_@first',
    'readyif|1': ['Not Ready', 'Ready'],
    'status|1': ['published', 'draft'],
    IP: '@ip',
    roles: '@first',
    age: '@title(5, 10)',
    version: 'mock data',
    internal_ip: baseContent,
    external_ip: '@float(0, 100, 2, 2)',
    os_image: '@integer(1, 3)',
    kernel_version: ['CN', 'US', 'JP', 'EU'],
    container_runtime: ['published', 'draft'],
    podNum: '@natural(60,200)'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/k8s_resource/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/k8s_resource/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/k8s_resource/podNum',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          podNumData: [
            { key: 'NUM', pv: 1524 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },
  {
    url: '/vue-element-admin/k8s_resource/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/k8s_resource/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/k8s_resource/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

