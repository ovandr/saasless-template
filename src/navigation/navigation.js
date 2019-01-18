export default [
  {
    path: '/images',
    icon: 'image',
    name: 'Upload Images'
  },
  {
    path: '/page2',
    icon: 'mail',
    name: 'Page2'
  },
  {
    header: 'List Group Header'
  },
  {
    divider: true
  },
  {
    name: 'User',
    icon: 'person',
    children: [
      {
        path: '/profile',
        icon: 'info',
        name: 'Info'
      }
    ]
  },
  {
    divider: true
  }
];
