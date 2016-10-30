import App from '../App'

export default [
  {
    path: '/',
    component: App,
    indexRoute: [
      {
        onEnter: (nextState, replace) => replace('/login')
      }
    ],
    childRoutes: [
      {
        path: 'home',
        getComponents (location, callback) {
          require.ensure([], function (require) {
            callback(null, require('../Home').default)
          })
        },
        indexRoute: {
          onEnter: (nextState, replace) => replace('/home/courseware')
        },
        childRoutes: [
          {
            path: 'course',
            getComponents (location, callback) {
              require.ensure([], function (require) {
                callback(null, require('../Course').default)
              })
            },
            indexRoute: [
              {
                getComponents (location, callback) {
                  require.ensure([], function (require) {
                    callback(null, require('../Course/components/Catalog').default)
                  })
                }
              }
            ],
            childRoutes: [
            ]
          },
          {
            path: 'courseware',
            getComponents (location, callback) {
              require.ensure([], function (require) {
                callback(null, require('../Courseware').default)
              })
            },
            indexRoute: {
              onEnter: (nextState, replace) => replace('/home/courseware/recommend')
            },
            childRoutes: [
              {
                path: 'mine',
                getComponents (location, callback) {
                  require.ensure([], function (require) {
                    callback(null, require('../Courseware/components/MyCourseware').default)
                  })
                }
              },
              {
                path: 'recommend',
                getComponents (location, callback) {
                  require.ensure([], function (require) {
                    callback(null, require('../Courseware/components/Recommend').default)
                  })
                }
              }
            ]
          },
          {
            path: 'wallet',
            getComponents (location, callback) {
              require.ensure([], function (require) {
                callback(null, require('../Wallet').default)
              })
            }
          }
        ]
      },
      {
        path: 'login',
        getComponents (location, callback) {
          require.ensure([], function (require) {
            callback(null, require('../Login').default)
          })
        }
      }
    ]
  }
]
