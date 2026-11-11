/* =========================================================
   КАЛЬКУЛЯТОР НСКМАСТЕР — цены и контакты
   Источник контактов: карточка компании в 2ГИС
   https://2gis.ru/novosibirsk/firm/70000001093424749 (проверено 11.11.2026)

   ВНИМАНИЕ: цены ниже — средние по городу-миллионнику из базовой версии
   калькулятора. Компания свой прайс публично не публикует.
   Перед запуском сайта цены нужно сверить с владельцем.
   ========================================================= */
window.CALC_CONFIG = {
  brand: {
    name: "Нскмастер",
    phone: "+7 913 793-09-00",
    telegram: "Kbeloz4",          // ник без @, сюда уходит заявка из калькулятора
    whatsapp: "79137930900",      // номер без +, запасной канал заявки
  },

  // Компания работает в Новосибирске — один город, коэффициент 1
  cities: [{ id: "nsk", name: "Новосибирск", k: 1 }],

  housing: [
    { id: "black", name: "Новостройка без отделки", desc: "Бетон, нужны стяжка и штукатурка", addWork: 1600, icon: "building" },
    { id: "white", name: "Новостройка white box", desc: "Предчистовая отделка от застройщика", workK: 0.85, icon: "box" },
    { id: "old", name: "Вторичное жильё", desc: "Нужен демонтаж старой отделки", demolition: 950, icon: "home" },
  ],

  // work — цена работ за м², matK — доля материалов, speed — м² в неделю, base — недель на подготовку
  repair: [
    { id: "cosm", name: "Косметический", desc: "Обои, покраска, напольные покрытия", work: 3800, matK: 0.55, speed: 22, base: 1, icon: "brush" },
    { id: "cap", name: "Капитальный", desc: "Выравнивание стен, полы, двери, плитка", work: 8200, matK: 1, speed: 9, base: 3, icon: "hammer" },
    { id: "des", name: "Дизайнерский", desc: "По дизайн-проекту, сложные решения", work: 13500, matK: 1.45, speed: 6, base: 5, icon: "compass" },
  ],

  // Материалы, ₽ за м²
  materials: [
    { id: "eco", name: "Эконом", hint: "Бюджетно", price: 3200 },
    { id: "std", name: "Стандарт", hint: "Оптимально", price: 5800 },
    { id: "prm", name: "Премиум", hint: "Европа, дизайн", price: 11000 },
  ],

  // unit: m2 — за м², bath — за санузел, room — за комнату, fix — за объект
  // plan: какие помещения подсветить на схеме (bath / rooms)
  extras: [
    { id: "elec", name: "Замена электрики", price: 1900, unit: "m2", weeks: 1 },
    { id: "tile", name: "Плитка в санузле под ключ", price: 95000, unit: "bath", plan: "bath", weeks: 1 },
    { id: "plumb", name: "Разводка сантехники", price: 45000, unit: "bath", plan: "bath" },
    { id: "floor", name: "Тёплый пол", price: 32000, unit: "bath", plan: "bath" },
    { id: "ceil", name: "Натяжные потолки", price: 950, unit: "m2" },
    { id: "noise", name: "Шумоизоляция стен", price: 1300, unit: "m2" },
    { id: "ac", name: "Кондиционеры с трассой", price: 38000, unit: "room", plan: "rooms" },
    { id: "design", name: "Дизайн-проект", price: 1800, unit: "m2", includedIn: "des" },
    { id: "trash", name: "Вывоз мусора", price: 18000, unit: "fix" },
    { id: "clean", name: "Уборка после ремонта", price: 280, unit: "m2" },
  ],

  defaults: { city: "nsk", housing: "old", repair: "cap", materials: "std", area: 54, rooms: 2, baths: 1, extras: ["elec", "trash"] },
  limits: { rooms: [1, 6], baths: [1, 3] },
  spread: 0.08, // ±8% вилка цены
};
