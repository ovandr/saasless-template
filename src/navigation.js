export default [
  {
    path: '/images',
    icon: 'image',
    name: 'Upload Images'
  },
  {
    path: '/publicpage',
    icon: 'mail',
    name: 'Public Page'
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
