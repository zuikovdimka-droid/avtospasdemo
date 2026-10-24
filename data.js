window.SITE_DATA = {
  name: "Автоспас",
  hours: "Пн–Вс, 9:00–21:00",
  phone: "+7 (495) 777-68-00",
  address: "Грохольский пер., 29, корп. 1, Москва",
  mapUrl: "https://yandex.ru/maps/org/avtospas/1070164398/",

  services: [
    { title: "Мойка а/м", price: "1500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/10022375/2a0000018ddaef95782b77f31a5ee877b20e/M_height" },
    { title: "Антибактериальная обработка кондиционера", price: "4750 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/2781182/2a000001979c32d350b4567b72f0b8896a01/M_height" },
    { title: "Диагностика системы парктроников", price: "5000 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/1644120/2a00000186077c53aa789e4b3e7a3bc272d9/M_height" },
    { title: "Диагностика ходовой части", price: "2500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/2413620/2a00000195bd287a28a4e1774abb714c97da/M_height" },
    { title: "Замена антифриза (охлаждающей жидкости)", price: "5000 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/1644120/2a00000194da0ca3d8e77ff52923108c8203/M_height" },
    { title: "Замена воздушного фильтра", price: "1500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/1356083/2a00000198db6ad8b42905a5f4f842746614/M_height" },
    { title: "Масляный сервис", price: "3500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/5236693/2a0000018b493052677d5f6d0be76eacb3d4/M_height" },
    { title: "Замена салонного фильтра", price: "2000 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/8331772/2a00000198db6ce1e28a9b2c76ee5d46127c/M_height" },
    { title: "Замена свечей зажигания", price: "2500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/1530321/2a000001979c2da254a19edb9699b10a1729/M_height" },
    { title: "Замена тормозной жидкости", price: "4500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/5280674/2a000001920a72a3a5295e0299b4a1d30731/M_height" },
    { title: "Заправка кондиционера фреоном", price: "5000 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/10118156/2a0000018e226c3a07e8333842150cb6a0ef/M_height" },
    { title: "Компьютерная диагностика (тест-блок)", price: "2500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/2808945/2a00000196b0cf7ca1c47bf7a2ef4f95c83e/M_height" },
    { title: "Мойка радиаторов охлаждения", price: "25000 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/10253960/2a00000196b06d05fb663ed76d05181674a8/M_height" },
    { title: "Обслуживание петель и замков дверей", price: "1200 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/1530321/2a00000198db8258334bdf2838d9d23d4faa/M_height" },
    { title: "Промывка инжектора", price: "9800 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/8331772/2a000001979c27410f724f47bc122036f4c4/M_height" },
    { title: "Регулировка света фар", price: "2400 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/2773996/2a000001979c36247916a77b18aac5cbf224/M_height" },
    { title: "Замена хомута глушителя", price: "1500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/8331772/2a00000198db770e948e300e777e7cbe812c/M_height" },
    { title: "Обслуживание тормозных механизмов", price: "4500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/8331772/2a00000198db8b63a8817f7531fe98f6c25e/M_height" },
    { title: "Регулировка развал-схождения колес", price: "7500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/1521147/2a00000196b0469f2b7a9645d7582f70b35d/M_height" },
    { title: "Ремонт колеса (установка жгута)", price: "1500 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/12411943/2a0000018c7334e3ff62de0cb390d6f40459/M_height" },
    { title: "Ремонт колеса (установка заплатки)", price: "3000 ₽", src: "https://avatars.mds.yandex.net/get-sprav-products/10324913/2a00000192006fcfff6df8de05011afdb12e/M_height" }
  ],

  // Пересказ отзывов. Имена авторов и сотрудников убраны, формулировки обобщены.
  // stars — оценка из выгрузки, по ней рисуются звёзды.
        reviews: [
    { stars: 5.0, date: "22 мая 2026", text: "Хороший сервис. Обратился с машиной не их профильного направления (Корея). Но помогли без проблем. Все очень четко, качественно и быстро. На приемке ребята профессионалы, объяснили ход работ и озвучили цену. Так и получилось. Сервис рекомендую однозначно." },
    { stars: 5.0, date: "20 февраля 2026", text: "Потрясающий сервис. От нас отказались 7 сервисов до этого. Нужен был срочный ремонт перед дальней дорогой. Не отказали. Встретили. Интеллигентные, вежливые,…" },
    { stars: 5.0, date: "27 июля 2026", text: "Отличный центр!!! Приветливые, знающие сотрудники! Все работы выполняют быстро, качественно и по очень приемлемым ценам. Обслуживают мои машины более 20 лет и я не на какую другую организацию этих замечательных специалистов я не заменю. Спасибо им…" },
    { stars: 5.0, date: "22 декабря 2025", text: "Уже не раз пользовалась данным автосервисом \"Спас\" на Грохольском. Грамотные вежливые ребята, рекомендации тоже толковые. Посчитали быстро цены на ремонт и заказ запчастей, распечатали лист диагностики с полным перечнем и ценами работ и запчастей, все подробно,…" },
    { stars: 5.0, date: "22 июля 2025", text: "Работу сотрудников сервиса оцениваю на 5+. Мастера свою работу знают, не навязывают дополнительные не нужные опции. Все по делу объясняют, помогут разобраться. Менял Сайлент блоки передней подвески на Audi Q5 в июле 2025. Болты…" },
    { stars: 5.0, date: "19 июня 2025", text: "Добрый день. Хочу порекомендовать всем этот автосервис. Хорошее качественное обслуживание, по умеренным ценам оригинальные запасные части. Персонал приемки внимательный, мастера хорошо знающие своё дело. Всегда буду приезжать только сюда." },
    { stars: 5.0, date: "19 февраля 2025", text: "Долго искал хорошую мойку, где действительно качественно делают работу, и наконец нашел! Машину отмыли идеально, даже диски и пороги блестят. Салон почистили до мелочей, никаких разводов на стеклах. Отличное соотношение цены и качества!" },
    { stars: 4.0, date: "29 января 2024", text: "Недёшево, но качественно" },
    { stars: 1.0, date: "7 февраля 2023", text: "По телефону объявляют одну сумму, приезжаешь объявляют совсем другую. Дорого." }
  ]
};