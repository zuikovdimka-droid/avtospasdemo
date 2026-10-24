(function () {
  var d = window.SITE_DATA || {};
  var q = function (s) { return document.querySelector(s); };
  var all = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var show = function (n, on) { if (n) n.hidden = !on; };

  // Название
  if (d.name) all('[data-name]').forEach(function (n) { n.textContent = d.name; });

  // Часы работы
  var hours = d.hours || null;
  all('[data-hours]').forEach(function (n) { n.textContent = hours || ''; });
  show(q('[data-hours-wrap]'), !!hours);
  show(q('[data-hours-card]'), !!hours);
  show(q('[data-hours-line]'), !!hours);
  show(q('[data-hours-line2]'), !!hours);
  var chip = q('[data-hours-chip]');
  if (chip) { chip.textContent = hours || ''; show(chip, !!hours); }

  // Телефон — нет данных → блок скрыт
  var phone = d.phone || null;
  all('[data-phone]').forEach(function (n) {
    if (!phone) { show(n.closest('[data-phone-card]') || n, false); return; }
    n.textContent = phone;
    if (n.tagName === 'A') n.href = 'tel:' + phone.replace(/[^\d+]/g, '');
  });
  show(q('[data-phone-card]'), !!phone);

  // Адрес — нет данных → блок скрыт
  var address = d.address || null;
  all('[data-address]').forEach(function (n) { n.textContent = address || ''; });
  show(q('[data-address-card]'), !!address);

  // Карта — только реальная ссылка
  all('[data-map]').forEach(function (a) {
    if (d.mapUrl) a.href = d.mapUrl; else show(a, false);
  });

  // Услуги (фото + название + цена)
  var services = d.services || [];
  var sGrid = document.getElementById('services-grid');
  show(document.getElementById('services'), services.length > 0);

  services.forEach(function (s) {
    var card = document.createElement('article');
    card.className = 'card';

    var photo = document.createElement('div');
    photo.className = 'card-photo';
    if (s.src) {
      var img = document.createElement('img');
      img.src = s.src;
      img.alt = s.title || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = function () {
        img.remove();
        photo.classList.add('no-photo');
        photo.textContent = 'Фото недоступно';
      };
      photo.appendChild(img);
    } else {
      photo.classList.add('no-photo');
      photo.textContent = 'Фото уточняется';
    }
    card.appendChild(photo);

    var body = document.createElement('div');
    body.className = 'card-body';

    var h = document.createElement('h3');
    h.textContent = s.title || 'Услуга уточняется';
    if (!s.title) h.classList.add('placeholder');
    body.appendChild(h);

    var price = document.createElement('p');
    price.className = 'price';
    if (s.price != null) {
      price.textContent = s.price;
    } else {
      price.classList.add('empty');
      price.textContent = '—';
      price.title = 'Нет данных о цене';
    }
    body.appendChild(price);

    card.appendChild(body);
    sGrid.appendChild(card);
  });

  // Отзывы (пересказ, без имён)
    // Отзывы (пересказ, без имён)
  var reviews = d.reviews || [];
  var rGrid = document.getElementById('reviews-grid');
  show(document.getElementById('reviews'), reviews.length > 0);

  reviews.forEach(function (r) {
    var card = document.createElement('article');
    card.className = 'review' + (r.stars >= 4 ? '' : ' low');

    // Шапка отзыва: звезды и дата
    var header = document.createElement('div');
    header.className = 'review-header';

    var stars = document.createElement('p');
    stars.className = 'stars';
    stars.setAttribute('aria-label', 'Оценка: ' + r.stars + ' из 5');
    for (var i = 0; i < 5; i++) {
      var st = document.createElement('span');
      st.textContent = '★';
      if (i >= r.stars) { st.className = 'off'; st.setAttribute('aria-hidden', 'true'); }
      stars.appendChild(st);
    }
    header.appendChild(stars);

    if (r.date) {
      var dateSpan = document.createElement('span');
      dateSpan.className = 'review-date';
      dateSpan.textContent = r.date;
      header.appendChild(dateSpan);
    }

    card.appendChild(header);

    var p = document.createElement('p');
    p.textContent = r.text;
    card.appendChild(p);

    rGrid.appendChild(card);
  });
})();