export default [
  {
    path: '/',
    name: '/',
    meta: { hidden: true, title: '登录', value: 'login' },
    component: () => import('src/views/Login'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('src/views/Login'),
    meta: { hidden: true, title: '登录', value: 'login' },
  }, {
    path: '/home',
    component: () => import('src/views/Home'),
    meta: { hidden: true, title: '首页', value: 'home' },
    children: [{
      path: '/',
      name: 'passHomepage',
      component: () => import('src/views/content/passHomepage/Index'),
      meta: { title: '首页' },
    },],
  }, {
    path: '/letClue',
    name: 'letClue',
    component: () => import('src/views/Home'),
    meta: { title: '线索管理', value: '7' },
    children: [
      {
        path: 'letterClue',
        name: 'letClue-letterClue',
        component: () => import('src/views/content/letter/LetterClue'),
        meta: { title: '表单填写', value: 'letClue', }
      }, {
        path: 'letterClueClassify',
        name: 'letClue-letterClueClassify',
        component: () => import('src/views/content/letter/LetterClueClassify'),
        meta: { title: '表单分类', value: 'letClueType', }
      }, {
        path: 'review',
        name: 'letClue-review',
        component: () => import('src/views/content/letter/Review'),
        meta: { title: '表单审批', value: 'reviewLetClue', }
      }
    ]
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('src/views/Home'),
    meta: { auth: true, title: '系统管理', value: '1', },
    children: [
      {
        path: 'user',
        name: 'manage-user',
        component: () => import('src/views/content/systemManagement/User'),
        meta: { title: '用户管理', value: 'user', }
      }, {
        path: 'role',
        name: 'manage-role',
        component: () => import('src/views/content/systemManagement/Role'),
        meta: { title: '角色管理', value: 'role', }
      }, {
        path: 'authority',
        name: 'manage-authority',
        component: () => import('src/views/content/systemManagement/Permission/Index'),
        meta: { title: '权限管理', value: 'permission', }
      }, {
        path: 'organizationStructure',
        name: 'manage-organizationStructure',
        component: () => import('src/views/content/systemManagement/Unit/Index'),
        meta: { title: '组织机构管理', value: 'unit', }
      }, {
        path: 'dataDictionary',
        name: 'manage-dataDictionary',
        component: () => import('src/views/content/systemManagement/DataDictionary'),
        meta: { title: '数据字典', value: 'dicAll', }
      }
    ],
  },
];
