const categories = [
    {
      id: 1,
      title: 'Виды и способы сварки',
      category_name: "vidy-i-sposoby-svarki",
      img: "/assets/images/categories/vidiisposobisvarki.jpeg",
      articles: [
        {
          id: 1,
          description: 'Подробный разбор процесса сварки полуавтоматом и с применением защитного газа',
          image: '/assets/images/articles/banner_be-staal.jpeg',
          date: '2024-02-08',
          blocks: [
            {
              type: 'image',
              content: 'url_to_image.jpg'
            },
            {
              type: 'text',
              content: 'Некоторый текст о виде сварки'
            },
          ]
        },
        {
          id: 2,
          description: 'Пластмасса как материал для сварки: необходимое оборудование и нюансы сварочных работ',
          image: '/assets/images/articles/plastyk-copy.jpeg',
          date: '2023-02-09',
          blocks: [
            {
              type: 'image',
              content: 'url_to_image.jpg'
            },
            {
              type: 'text',
              content: 'Некоторый текст о виде сварки'
            },
          ]
        },
      ]
    },
    {
      id: 2,
      title: 'Изделия и конструкции',
      category_name: "izdeliya-i-konstruktsii",
      img: "/assets/images/categories/izdeliaikonstructions.jpeg",
      articles: [
        {
          id: 2,
          description: 'Как выполнить сварку металлоконструкций своими руками',
          image: '/assets/images/articles/banner_be-staal.jpeg',
          date: '2023-02-09',
          blocks: [
            {
              type: 'image',
              content: 'url_to_image.jpg'
            },
            {
              type: 'text',
              content: 'Некоторый текст о виде сварки'
            },
          ]
        },
      ]
    },
    {
      id: 3,
      title: 'Интересности',
      category_name: "interesnosti",
      img: "/assets/images/categories/izdeliaikonstructions.jpeg",
      articles: []
    },
  ];
  

export {categories}