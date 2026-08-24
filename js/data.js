/**
 * كشري الزعيم - Koshary El Zaeem
 * قاعدة البيانات الأولية الشاملة
 */

const INITIAL_CATEGORIES = [
  { id: "koshary", name: "كشري الزعيم الأصلي", icon: "🍲", count: 6, desc: "خلطة الزعيم السرية بالعدس البلدي والتقلية المقرمشة" },
  { id: "casseroles", name: "طواجن فرن بالسمن البلدي", icon: "🥘", count: 5, desc: "طواجن مكرونة بلحم طازة وفراخ وسجق محمرة في الفرن" },
  { id: "combos", name: "وجبات وعروض التوفير", icon: "👑", count: 4, desc: "بوكسات اللمة ولمة الصحاب مع التوفير الأكبر" },
  { id: "extras", name: "إضافات ودقات الزعيم", icon: "🌶️", count: 7, desc: "تقلية، صلصة حارة، دقة توم وخل، حمص وشطة زيت" },
  { id: "desserts", name: "حلويات شرقية", icon: "🍮", count: 4, desc: "أرز بلبن فرن وأم علي بالسمن البلدي والمكسرات" },
  { id: "drinks", name: "مشروبات منعشة", icon: "🥤", count: 6, desc: "كانز مثلج، عصائر طبيعية، كركديه أسواني مثلج ومياه" }
];

const INITIAL_MENU_ITEMS = [
  // كشري
  {
    id: "koshary-small",
    categoryId: "koshary",
    name: "كشري الزعيم (صغير)",
    desc: "طبق كشري مصري أصيل غني بالعدس البلدي، الحمص، والمكرونة المشكلة مع التقلية الذهبية والصلصة.",
    price: 35,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    tags: ["نباتي", "الأكثر طلبًا"],
    spicyLevel: 1,
    inStock: true,
    featured: true,
    sizes: [
      { name: "صغير (عادي)", price: 35, default: true },
      { name: "وسط (مشبع)", price: 45 },
      { name: "كبير (وحش)", price: 60 }
    ],
    addons: ["extra-onion", "extra-sauce", "extra-dakkah", "extra-chickpeas", "extra-lentils"]
  },
  {
    id: "koshary-medium",
    categoryId: "koshary",
    name: "كشري الزعيم (وسط)",
    desc: "الحجم المثالي للغداء السريع، كمية مضاعفة من العدس أبو جبة والحمص المسلوق مع صوص الطماطم المتسبك.",
    price: 45,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    tags: ["نباتي", "الأكثر مبيعًا"],
    spicyLevel: 1,
    inStock: true,
    featured: true,
    sizes: [
      { name: "وسط (مشبع)", price: 45, default: true },
      { name: "كبير (وحش)", price: 60 },
      { name: "ميجا الزعيم", price: 80 }
    ],
    addons: ["extra-onion", "extra-sauce", "extra-dakkah", "extra-chickpeas", "extra-lentils", "extra-shatta-oil"]
  },
  {
    id: "koshary-large",
    categoryId: "koshary",
    name: "كشري الزعيم (كبير)",
    desc: "لعشاق الكشري الحقيقيين، طبق كبير متكامل مع علبة دقة وعلبة شطة زيت حار وتقلية إضافية مجانية.",
    price: 60,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    tags: ["وجبة مشبعة"],
    spicyLevel: 2,
    inStock: true,
    featured: true,
    sizes: [
      { name: "كبير (وحش)", price: 60, default: true },
      { name: "ميجا الزعيم", price: 80 },
      { name: "فويل عائلي", price: 110 }
    ],
    addons: ["extra-onion", "extra-sauce", "extra-dakkah", "extra-chickpeas", "extra-lentils", "extra-shatta-oil", "extra-liver"]
  },
  {
    id: "koshary-mega",
    categoryId: "koshary",
    name: "طبق ميجا الزعيم الخارق",
    desc: "طبق سوبر عملاق مع إضافة كبدة إسكندراني محمرة أو سجق بلدي مبهر حسب اختيارك مع صوص الزعيم الخاص.",
    price: 90,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80",
    tags: ["مميز", "إضافات لحوم"],
    spicyLevel: 2,
    inStock: true,
    featured: true,
    sizes: [
      { name: "ميجا الزعيم (فردين)", price: 90, default: true },
      { name: "كنج الزعيم (3 أفراد)", price: 130 }
    ],
    addons: ["extra-liver", "extra-sausage", "extra-minced-meat", "extra-onion", "extra-sauce", "extra-mozzarella"]
  },
  {
    id: "koshary-casserole-mix",
    categoryId: "koshary",
    name: "كشري بالفرن مع ميكس جبن",
    desc: "ابتكار الزعيم! كشري فاخر يدخل الفرن مع طبقة موتزاريلا وشيدر سايحة تعطي نكهة غير مسبوقة.",
    price: 75,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    tags: ["جديد", "جبنة سايحة"],
    spicyLevel: 1,
    inStock: true,
    featured: false,
    sizes: [
      { name: "وسط", price: 75, default: true },
      { name: "كبير", price: 95 }
    ],
    addons: ["extra-mozzarella", "extra-sauce", "extra-onion"]
  },
  {
    id: "koshary-diet",
    categoryId: "koshary",
    name: "كشري لايت (صحي)",
    desc: "معد بزيت زيتون بكر ومكرونة شوفان حبوب كاملة، عدس مضاعف وتقلية مجففة بالهواء الساخن بدون دهون.",
    price: 55,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
    tags: ["صحي", "لايت"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [
      { name: "طبق صحي متوازن", price: 55, default: true }
    ],
    addons: ["extra-chickpeas", "extra-lentils", "extra-dakkah"]
  },

  // طواجن
  {
    id: "tagen-meat",
    categoryId: "casseroles",
    name: "طاجن مكرونة باللحمة المفرومة",
    desc: "طاجن فخار مصري أصيل في الفرن، مكرونة فرن بالصلصة الغنية مع لحم بلدي مفروم بالتوابل الشرقية الخاصة.",
    price: 65,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    tags: ["لحم بلدي", "الأكثر مبيعًا"],
    spicyLevel: 1,
    inStock: true,
    featured: true,
    sizes: [
      { name: "طاجن وسط", price: 65, default: true },
      { name: "طاجن كبير سوبر", price: 85 }
    ],
    addons: ["extra-mozzarella", "extra-sauce", "extra-minced-meat"]
  },
  {
    id: "tagen-chicken",
    categoryId: "casseroles",
    name: "طاجن مكرونة بالفراخ المتبلة",
    desc: "قطع صدور فراخ طازجة متبلة بالزعتر والبهارات مع صوص الطماطم والمكرونة المحمرة بالفرن.",
    price: 60,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=80",
    tags: ["فراخ طازة"],
    spicyLevel: 1,
    inStock: true,
    featured: true,
    sizes: [
      { name: "طاجن وسط", price: 60, default: true },
      { name: "طاجن كبير سوبر", price: 80 }
    ],
    addons: ["extra-mozzarella", "extra-sauce"]
  },
  {
    id: "tagen-sausage",
    categoryId: "casseroles",
    name: "طاجن مكرونة بالسجق البلدي الإسكندراني",
    desc: "سجق بلدي حار مع الفلفل الألوان والبصل وصوص الطماطم المتسبك في طاجن فخار مقرمش الأطراف.",
    price: 70,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    tags: ["سجق بلدي", "حار"],
    spicyLevel: 3,
    inStock: true,
    featured: true,
    sizes: [
      { name: "طاجن وسط", price: 70, default: true },
      { name: "طاجن كبير سوبر", price: 90 }
    ],
    addons: ["extra-mozzarella", "extra-shatta-oil", "extra-sauce"]
  },
  {
    id: "tagen-liver",
    categoryId: "casseroles",
    name: "طاجن مكرونة بالكبدة الإسكندراني",
    desc: "كبدة بتلو متبلة بالثوم والليمون والفلفل الحامي مع مكرونة الفرن اللذيذة.",
    price: 70,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    tags: ["كبدة إسكندراني", "حار"],
    spicyLevel: 2,
    inStock: true,
    featured: false,
    sizes: [
      { name: "طاجن وسط", price: 70, default: true },
      { name: "طاجن كبير سوبر", price: 90 }
    ],
    addons: ["extra-dakkah", "extra-sauce", "extra-liver"]
  },
  {
    id: "tagen-mix-meat",
    categoryId: "casseroles",
    name: "طاجن مشكل لحوم الزعيم (سوبر)",
    desc: "ميكس لحمة مفرومة + سجق بلدي + كبدة + طبقة موتزاريلا غنية تغطي الطاجن بالكامل.",
    price: 95,
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
    tags: ["سوبر الزعيم", "إكسترا جبنة"],
    spicyLevel: 2,
    inStock: true,
    featured: true,
    sizes: [
      { name: "طاجن عملاق", price: 95, default: true }
    ],
    addons: ["extra-mozzarella", "extra-sauce"]
  },

  // وجبات التوفير والكومبو
  {
    id: "combo-zaeem-single",
    categoryId: "combos",
    name: "كومبو الزعيم الفردي",
    desc: "1 طبق كشري كبير + 1 طاجن لحمة مفرومة صغير + 1 كانز بيبسي + 1 أرز بلبن فرن.",
    price: 135,
    oldPrice: 165,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    tags: ["توفير 30 ج", "وجبة متكاملة"],
    spicyLevel: 1,
    inStock: true,
    featured: true,
    sizes: [
      { name: "وجبة فردية مشبعة", price: 135, default: true }
    ],
    addons: ["extra-onion", "extra-sauce", "extra-shatta-oil"]
  },
  {
    id: "combo-sahab",
    categoryId: "combos",
    name: "بوكس لِمّة الصحاب (فردين)",
    desc: "2 كشري وسط + 1 طاجن سجق كبير + 2 كانز بيبسي مثلج + علب دقة وشطة وتقلية إضافية.",
    price: 210,
    oldPrice: 250,
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80",
    tags: ["توفير 40 ج", "لشخصين"],
    spicyLevel: 2,
    inStock: true,
    featured: true,
    sizes: [
      { name: "بوكس فردين", price: 210, default: true }
    ],
    addons: ["extra-onion", "extra-sauce", "extra-dakkah"]
  },
  {
    id: "combo-family-mega",
    categoryId: "combos",
    name: "بوكس العيلة الزعيم (4 - 5 أفراد)",
    desc: "فويل كشري عائلي عملاق + 2 طاجن لحمة وفراخ + 4 أرز بلبن + 1 لتر بيبسي عائلي + باقة دقات وصلصات كاملة.",
    price: 360,
    oldPrice: 440,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
    tags: ["توفير 80 ج", "عائلي سوبر"],
    spicyLevel: 1,
    inStock: true,
    featured: true,
    sizes: [
      { name: "بوكس عائلي ضخم", price: 360, default: true }
    ],
    addons: ["extra-onion", "extra-sauce", "extra-mozzarella"]
  },
  {
    id: "combo-student",
    categoryId: "combos",
    name: "عرض الطلبة والموظفين",
    desc: "1 طبق كشري وسط + كانز + باكت تقلية مقرمشة إضافي، وجبة سريعة ومغذية واقتصادية.",
    price: 65,
    oldPrice: 80,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    tags: ["اقتصادي", "عرض الطلبة"],
    spicyLevel: 1,
    inStock: true,
    featured: false,
    sizes: [
      { name: "وجبة طالب", price: 65, default: true }
    ],
    addons: ["extra-sauce", "extra-dakkah"]
  },

  // الإضافات والدقات
  {
    id: "extra-onion",
    categoryId: "extras",
    name: "علبة تقلية ذهبية مقرمشة (بصل محمر)",
    desc: "تقلية الزعيم الشهيرة المقرمشة والمصفاة تمامًا من الزيت، سر الطعم الذي لا يقاوم.",
    price: 12,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
    tags: ["إضافة أساسية"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "علبة وسط", price: 12, default: true }, { name: "علبة كبيرة", price: 20 }],
    addons: []
  },
  {
    id: "extra-sauce",
    categoryId: "extras",
    name: "علبة صلصة الزعيم المسبكة",
    desc: "صلصة طماطم بلدي متسبكة على نار هادئة مع الثوم والخل والكمون الأصيل.",
    price: 10,
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=600&q=80",
    tags: ["صوص"],
    spicyLevel: 1,
    inStock: true,
    featured: false,
    sizes: [{ name: "علبة عادية", price: 10, default: true }, { name: "برطمان كبير", price: 18 }],
    addons: []
  },
  {
    id: "extra-dakkah",
    categoryId: "extras",
    name: "زجاجة دقة ثوم وخل وليمون بلدي",
    desc: "دقة الزعيم السرية بالثوم البلدي والخل المركز والليمون والكزبرة الجافة.",
    price: 8,
    image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=600&q=80",
    tags: ["دقة سرية"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "زجاجة دقة", price: 8, default: true }],
    addons: []
  },
  {
    id: "extra-shatta-oil",
    categoryId: "extras",
    name: "شطة زيت نار حارة (خلطة الزعيم)",
    desc: "شطة زيت سوداني حامية جداً ومغلية مع الفلفل الأحمر لعشاق السبايسي الحقيقي.",
    price: 8,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    tags: ["حار نار 🌶️"],
    spicyLevel: 3,
    inStock: true,
    featured: false,
    sizes: [{ name: "علبة شطة زيت", price: 8, default: true }],
    addons: []
  },
  {
    id: "extra-chickpeas",
    categoryId: "extras",
    name: "علبة حمص شام متبل",
    desc: "حمص شام منقوع ومسلوق على أصوله بالكمون والليمون.",
    price: 12,
    image: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=600&q=80",
    tags: ["بروتين"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "علبة حمص", price: 12, default: true }],
    addons: []
  },
  {
    id: "extra-liver",
    categoryId: "extras",
    name: "علبة كبدة إسكندراني سوتيه إضافية",
    desc: "كبدة بلدي متبلة بالثوم والفلفل الأخضر الحامي لإضافتها فوق طبق الكشري.",
    price: 35,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    tags: ["إضافة لحوم"],
    spicyLevel: 2,
    inStock: true,
    featured: false,
    sizes: [{ name: "طبق كبدة جانبي", price: 35, default: true }],
    addons: []
  },
  {
    id: "extra-mozzarella",
    categoryId: "extras",
    name: "إكسترا جبنة موتزاريلا سايحة",
    desc: "جبنة موتزاريلا طبيعية تضاف فوق الكشري أو الطواجن وتدخل الفرن.",
    price: 20,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["جبنة"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "حصة جبنة", price: 20, default: true }],
    addons: []
  },

  // حلويات
  {
    id: "dessert-rice-pudding-oven",
    categoryId: "desserts",
    name: "أرز بلبن فرن بالكراميل والقشطة",
    desc: "أرز بلبن بلدي دسم بالقشطة الفلاحي يدخل الفرن ليأخذ وجهًا مكرملًا ذهبيًا شهيًا.",
    price: 25,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
    tags: ["الأكثر طلبًا", "حلو بلدي"],
    spicyLevel: 0,
    inStock: true,
    featured: true,
    sizes: [
      { name: "طاجن فرن عادي", price: 25, default: true },
      { name: "طاجن فرن بالمكسرات والقشطة", price: 35 }
    ],
    addons: []
  },
  {
    id: "dessert-rice-pudding-nuts",
    categoryId: "desserts",
    name: "أرز بلبن كولد بالمكسرات والعسل",
    desc: "أرز بلبن بارد مع الكاجو، الفستق، اللوز، ورشة عسل نحل صافي.",
    price: 30,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
    tags: ["مكسرات فاخرة"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "كوب كبير", price: 30, default: true }],
    addons: []
  },
  {
    id: "dessert-om-ali",
    categoryId: "desserts",
    name: "أم علي بالسمن البلدي والمكسرات",
    desc: "رقاق مقرمش مشرب بالحليب الساخن والمكسرات المحمصة والقشطة الفلاحي تحت شواية الفرن.",
    price: 35,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    tags: ["ساخن", "سمن بلدي"],
    spicyLevel: 0,
    inStock: true,
    featured: true,
    sizes: [{ name: "طاجن فخار", price: 35, default: true }],
    addons: []
  },
  {
    id: "dessert-mehalabeya",
    categoryId: "desserts",
    name: "مهلبية قمر الدين بالمكسرات",
    desc: "مهلبية منعشة ولذيذة بنكهة المشمش الطبيعي وقمر الدين السوري الأصيل.",
    price: 22,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    tags: ["منعش"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "طبق مهلبية", price: 22, default: true }],
    addons: []
  },

  // مشروبات
  {
    id: "drink-pepsi-can",
    categoryId: "drinks",
    name: "كانز بيبسي مثلج 330 مل",
    desc: "مشروب غازي منعش يقدم مثلجًا مع مكعبات الثلج وشريحة ليمون.",
    price: 18,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80",
    tags: ["مشروب غازي"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "كانز 330 مل", price: 18, default: true }],
    addons: []
  },
  {
    id: "drink-7up-can",
    categoryId: "drinks",
    name: "كانز سفن أب دايت / عادي",
    desc: "ليمون صودا منعش يهضم بعد وجبة الكشري الدسمة.",
    price: 18,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
    tags: ["هضم سريع"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "كانز 330 مل", price: 18, default: true }],
    addons: []
  },
  {
    id: "drink-karkadeh",
    categoryId: "drinks",
    name: "كركديه أسواني مثلج طبيعي",
    desc: "عصير كركديه وردي مصري طبيعي 100% مثلج ومحلى بالسكر الخفيف.",
    price: 20,
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
    tags: ["طبيعي", "بلدي"],
    spicyLevel: 0,
    inStock: true,
    featured: true,
    sizes: [{ name: "كوب كبير 500 مل", price: 20, default: true }],
    addons: []
  },
  {
    id: "drink-sugarcane",
    categoryId: "drinks",
    name: "عصير قصب بلدي مثلج",
    desc: "عصير قصب صعيدي طازج معصور على الطلب ومبرد تمامًا.",
    price: 15,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["طازج"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "كوب وسط", price: 15, default: true }],
    addons: []
  },
  {
    id: "drink-water",
    categoryId: "drinks",
    name: "مياه معدنية طبيعية",
    desc: "زجاجة مياه نقية مبردة.",
    price: 8,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
    tags: ["مياه"],
    spicyLevel: 0,
    inStock: true,
    featured: false,
    sizes: [{ name: "زجاجة 600 مل", price: 8, default: true }],
    addons: []
  }
];

const INITIAL_ADDONS_DICT = {
  "extra-onion": { id: "extra-onion", name: "تقلية مقرمشة إضافية", price: 12 },
  "extra-sauce": { id: "extra-sauce", name: "صلصة طماطم مسبكة", price: 10 },
  "extra-dakkah": { id: "extra-dakkah", name: "دقة ثوم وخل", price: 8 },
  "extra-shatta-oil": { id: "extra-shatta-oil", name: "شطة زيت نار", price: 8 },
  "extra-chickpeas": { id: "extra-chickpeas", name: "حمص شام مسلوق", price: 12 },
  "extra-lentils": { id: "extra-lentils", name: "عدس أبو جبة بلدي", price: 10 },
  "extra-liver": { id: "extra-liver", name: "كبدة إسكندراني", price: 35 },
  "extra-sausage": { id: "extra-sausage", name: "سجق بلدي محمر", price: 35 },
  "extra-minced-meat": { id: "extra-minced-meat", name: "لحمة مفرومة بلدي", price: 30 },
  "extra-mozzarella": { id: "extra-mozzarella", name: "موتزاريلا سايحة بالفرن", price: 20 }
};

const INITIAL_BRANCHES = [
  {
    id: "branch-downtown",
    name: "فرع وسط البلد - التحرير (الفرع الرئيسي)",
    address: "15 شارع طلعت حرب، بجوار ميدان التحرير، القاهرة",
    phone: "01012345671",
    landline: "0225789123",
    hours: "يوميًا من 10:00 صباحًا حتى 3:00 فجرًا",
    status: "open",
    lat: 30.0444,
    lng: 31.2357,
    mapEmbed: "https://maps.google.com/maps?q=Tahrir+Square+Cairo&t=&z=15&ie=UTF8&iwloc=&output=embed",
    zones: [
      { name: "وسط البلد / عابدين / جاردن سيتي", fee: 15, time: "25-35 دقيقة" },
      { name: "الزمالك / بولاق / المنيل", fee: 20, time: "30-45 دقيقة" },
      { name: "العباسية / باب اللوق / الدرب الأحمر", fee: 25, time: "40-50 دقيقة" }
    ]
  },
  {
    id: "branch-nasr-city",
    name: "فرع مدينة نصر - عباس العقاد",
    address: "42 شارع عباس العقاد، بجوار الجامعة العمالية، مدينة نصر",
    phone: "01012345672",
    landline: "0222718900",
    hours: "24 ساعة خدمة متواصلة وتوصيل فوري",
    status: "open",
    lat: 30.0561,
    lng: 31.3412,
    mapEmbed: "https://maps.google.com/maps?q=Abbas+El+Akkad+Nasr+City&t=&z=15&ie=UTF8&iwloc=&output=embed",
    zones: [
      { name: "مدينة نصر (المنطقة الأولى والسادسة والسابعة)", fee: 15, time: "20-30 دقيقة" },
      { name: "مصر الجديدة / النزهة / الكوربة", fee: 20, time: "30-40 دقيقة" },
      { name: "المقطم / زهراء مدينة نصر", fee: 25, time: "35-45 دقيقة" }
    ]
  },
  {
    id: "branch-mohandessin",
    name: "فرع المهندسين - جامعة الدول العربية",
    address: "28 شارع جامعة الدول العربية، أمام مسجد مصطفى محمود، الجيزة",
    phone: "01012345673",
    landline: "0237482910",
    hours: "يوميًا من 10:00 ص حتى 4:00 فجرًا",
    status: "open",
    lat: 30.0511,
    lng: 31.2001,
    mapEmbed: "https://maps.google.com/maps?q=Gamet+El+Dewal+El+Arabia+Mohandessin&t=&z=15&ie=UTF8&iwloc=&output=embed",
    zones: [
      { name: "المهندسين / الدقي / العجوزة", fee: 15, time: "20-30 دقيقة" },
      { name: "الدقي / بين السرايات / شارع مراد", fee: 20, time: "25-35 دقيقة" },
      { name: "الهرم / فيصل / بولاق الدكرور", fee: 25, time: "35-50 دقيقة" }
    ]
  },
  {
    id: "branch-tagamoa",
    name: "فرع التجمع الخامس - شارع التسعين",
    address: "مول سيتي هاب، شارع التسعين الشمالي، التجمع الخامس، القاهرة الجديدة",
    phone: "01012345674",
    landline: "0228193000",
    hours: "يوميًا من 11:00 ص حتى 2:00 بعد منتصف الليل",
    status: "open",
    lat: 30.0150,
    lng: 31.4320,
    mapEmbed: "https://maps.google.com/maps?q=90th+Street+New+Cairo&t=&z=15&ie=UTF8&iwloc=&output=embed",
    zones: [
      { name: "التجمع الخامس (حي اللوتس، النرجس، البنفسج)", fee: 20, time: "25-35 دقيقة" },
      { name: "التجمع الأول / التجمع الثالث / الرحاب", fee: 25, time: "35-45 دقيقة" },
      { name: "مدينتي / الشروق / العاصمة الإدارية", fee: 35, time: "45-60 دقيقة" }
    ]
  },
  {
    id: "branch-maadi",
    name: "فرع المعادي - شارع اللاسلكي",
    address: "18 شارع اللاسلكي، أمام البنك الأهلي، المعادي الجديدة",
    phone: "01012345675",
    landline: "0225194001",
    hours: "يوميًا من 10:30 ص حتى 3:00 فجرًا",
    status: "open",
    lat: 29.9720,
    lng: 31.2780,
    mapEmbed: "https://maps.google.com/maps?q=Laselky+Street+Maadi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    zones: [
      { name: "المعادي القديمة / المعادي الجديدة / دجلة", fee: 15, time: "20-30 دقيقة" },
      { name: "زهراء المعادي / دار السلام / حدائق المعادي", fee: 20, time: "30-40 دقيقة" },
      { name: "حلوان / طرة / المعصرة", fee: 30, time: "40-55 دقيقة" }
    ]
  },
  {
    id: "branch-alex",
    name: "فرع الإسكندرية - محطة الرمل",
    address: "12 شارع الشهداء، أمام محطة ترام الرمل، الإسكندرية",
    phone: "01012345676",
    landline: "034876543",
    hours: "يوميًا من 10:00 ص حتى 3:30 فجرًا",
    status: "open",
    lat: 31.2001,
    lng: 29.9005,
    mapEmbed: "https://maps.google.com/maps?q=Raml+Station+Alexandria&t=&z=15&ie=UTF8&iwloc=&output=embed",
    zones: [
      { name: "محطة الرمل / المنشية / بحري", fee: 15, time: "20-30 دقيقة" },
      { name: "الشاطبي / الإبراهيمية / كامب شيزار", fee: 20, time: "25-35 دقيقة" },
      { name: "سموحة / سيدي جابر / رشدي", fee: 25, time: "35-45 دقيقة" }
    ]
  }
];

const INITIAL_COUPONS = [
  { code: "ZAEEM2026", discountPercent: 15, maxDiscount: 50, minOrder: 100, desc: "خصم 15% بمناسبة العام الجديد" },
  { code: "KOSHARY10", discountPercent: 10, maxDiscount: 30, minOrder: 50, desc: "خصم 10% على جميع الطلبات" },
  { code: "VIP50", discountPercent: 20, maxDiscount: 100, minOrder: 200, desc: "خصم خاص 20% لعملاء الـ VIP" },
  { code: "FREEKOSHARY", discountPercent: 100, maxDiscount: 45, minOrder: 150, desc: "طبق كشري وسط مجانًا للطلبات فوق 150 ج" }
];

const INITIAL_ORDERS = [
  {
    id: "ZAEEM-8492",
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    customerName: "أحمد محمود سالم",
    customerPhone: "01098765432",
    customerEmail: "ahmed.salem@gmail.com",
    fulfillmentType: "delivery",
    branchId: "branch-downtown",
    branchName: "فرع وسط البلد - التحرير",
    address: {
      governorate: "القاهرة",
      area: "وسط البلد / عابدين",
      street: "شارع شريف، عمارة الأهرام",
      building: "14",
      floor: "4",
      apartment: "12",
      notes: "رن الجرس مرتين من فضلك، التوصيل للأعلى."
    },
    paymentMethod: "cash",
    paymentStatus: "pending",
    orderStatus: "preparing", // received -> preparing -> ready -> delivering -> delivered
    items: [
      {
        id: "koshary-medium",
        name: "كشري الزعيم (وسط)",
        size: "وسط (مشبع)",
        unitPrice: 45,
        quantity: 2,
        selectedAddons: [
          { id: "extra-onion", name: "تقلية مقرمشة إضافية", price: 12 },
          { id: "extra-shatta-oil", name: "شطة زيت نار", price: 8 }
        ],
        itemTotal: 130
      },
      {
        id: "tagen-meat",
        name: "طاجن مكرونة باللحمة المفرومة",
        size: "طاجن وسط",
        unitPrice: 65,
        quantity: 1,
        selectedAddons: [
          { id: "extra-mozzarella", name: "موتزاريلا سايحة بالفرن", price: 20 }
        ],
        itemTotal: 85
      },
      {
        id: "dessert-rice-pudding-oven",
        name: "أرز بلبن فرن بالكراميل والقشطة",
        size: "طاجن فرن عادي",
        unitPrice: 25,
        quantity: 2,
        selectedAddons: [],
        itemTotal: 50
      },
      {
        id: "drink-pepsi-can",
        name: "كانز بيبسي مثلج 330 مل",
        size: "كانز 330 مل",
        unitPrice: 18,
        quantity: 2,
        selectedAddons: [],
        itemTotal: 36
      }
    ],
    subtotal: 301,
    discount: 45.15,
    couponCode: "ZAEEM2026",
    deliveryFee: 15,
    tax: 0,
    total: 270.85,
    earnedPoints: 27,
    pilot: {
      name: "كابتن إبراهيم حسن",
      phone: "01123456789",
      vehicle: "سكوتر هوندا أحمر (لوحة ق هـ 482)",
      rating: 4.9,
      estimatedArrivalMinutes: 18
    }
  },
  {
    id: "ZAEEM-8491",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    customerName: "سارة عبد الرحمن",
    customerPhone: "01287654321",
    customerEmail: "sara.abdelrahman@yahoo.com",
    fulfillmentType: "delivery",
    branchId: "branch-nasr-city",
    branchName: "فرع مدينة نصر - عباس العقاد",
    address: {
      governorate: "القاهرة",
      area: "مدينة نصر",
      street: "شارع مصطفى النحاس، تقاطع الطيران",
      building: "88",
      floor: "2",
      apartment: "5",
      notes: "الدفع بفودافون كاش مسبقًا"
    },
    paymentMethod: "vodafone_cash",
    paymentStatus: "paid",
    orderStatus: "delivering",
    items: [
      {
        id: "combo-family-mega",
        name: "بوكس العيلة الزعيم (4 - 5 أفراد)",
        size: "بوكس عائلي ضخم",
        unitPrice: 360,
        quantity: 1,
        selectedAddons: [],
        itemTotal: 360
      }
    ],
    subtotal: 360,
    discount: 0,
    couponCode: null,
    deliveryFee: 15,
    tax: 0,
    total: 375,
    earnedPoints: 37,
    pilot: {
      name: "كابتن محمود علي",
      phone: "01055566778",
      vehicle: "موتوسيكل دايون أسود (لوحة ن ص 119)",
      rating: 4.8,
      estimatedArrivalMinutes: 6
    }
  },
  {
    id: "ZAEEM-8490",
    createdAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    customerName: "م. كريم الشناوي",
    customerPhone: "01511223344",
    customerEmail: "kareem.shennawy@company.com",
    fulfillmentType: "pickup",
    branchId: "branch-mohandessin",
    branchName: "فرع المهندسين - جامعة الدول العربية",
    address: null,
    paymentMethod: "card",
    paymentStatus: "paid",
    orderStatus: "delivered",
    items: [
      {
        id: "koshary-large",
        name: "كشري الزعيم (كبير)",
        size: "كبير (وحش)",
        unitPrice: 60,
        quantity: 3,
        selectedAddons: [
          { id: "extra-onion", name: "تقلية مقرمشة إضافية", price: 12 }
        ],
        itemTotal: 216
      }
    ],
    subtotal: 216,
    discount: 21.6,
    couponCode: "KOSHARY10",
    deliveryFee: 0,
    tax: 0,
    total: 194.4,
    earnedPoints: 19,
    pilot: null
  },
  {
    id: "ZAEEM-8489",
    createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    customerName: "د. هاني المصري",
    customerPhone: "01009988776",
    customerEmail: "dr.hani@clinic.eg",
    fulfillmentType: "delivery",
    branchId: "branch-tagamoa",
    branchName: "فرع التجمع الخامس - شارع التسعين",
    address: {
      governorate: "القاهرة الجديدة",
      area: "التجمع الخامس (حي اللوتس)",
      street: "شارع التسعين الشمالي، مجمع عيادات هيلث كير",
      building: "12",
      floor: "3",
      apartment: "عيادة 302",
      notes: "اتصل عند الوصول أمام البوابة"
    },
    paymentMethod: "cash",
    paymentStatus: "paid",
    orderStatus: "delivered",
    items: [
      {
        id: "tagen-meat",
        name: "طاجن مكرونة باللحمة المفرومة",
        size: "طاجن وسط",
        unitPrice: 65,
        quantity: 2,
        selectedAddons: [],
        itemTotal: 130
      },
      {
        id: "drink-karkadeh",
        name: "كركديه أسواني مثلج طبيعي",
        size: "كوب كبير 500 مل",
        unitPrice: 20,
        quantity: 2,
        selectedAddons: [],
        itemTotal: 40
      }
    ],
    subtotal: 170,
    discount: 0,
    couponCode: null,
    deliveryFee: 20,
    tax: 0,
    total: 190,
    earnedPoints: 19,
    pilot: {
      name: "كابتن تامر الشامي",
      phone: "01099881122",
      vehicle: "سكوتر بينيلي أبيض",
      rating: 5.0,
      estimatedArrivalMinutes: 0
    }
  }
];

const INITIAL_CUSTOMERS = [
  {
    id: "cust-1",
    name: "أحمد محمود سالم",
    phone: "01098765432",
    email: "ahmed.salem@gmail.com",
    ordersCount: 14,
    totalSpent: 3820,
    loyaltyPoints: 380,
    tier: "VIP الزعيم 👑",
    registeredAt: "2024-03-15",
    lastOrderAt: "منذ 12 دقيقة"
  },
  {
    id: "cust-2",
    name: "سارة عبد الرحمن",
    phone: "01287654321",
    email: "sara.abdelrahman@yahoo.com",
    ordersCount: 8,
    totalSpent: 2150,
    loyaltyPoints: 215,
    tier: "ذهبي 🥇",
    registeredAt: "2024-05-20",
    lastOrderAt: "منذ 35 دقيقة"
  },
  {
    id: "cust-3",
    name: "م. كريم الشناوي",
    phone: "01511223344",
    email: "kareem.shennawy@company.com",
    ordersCount: 5,
    totalSpent: 1240,
    loyaltyPoints: 124,
    tier: "فضي 🥈",
    registeredAt: "2024-08-10",
    lastOrderAt: "منذ ساعة"
  },
  {
    id: "cust-4",
    name: "د. هاني المصري",
    phone: "01009988776",
    email: "dr.hani@clinic.eg",
    ordersCount: 19,
    totalSpent: 5400,
    loyaltyPoints: 540,
    tier: "VIP الزعيم 👑",
    registeredAt: "2023-11-01",
    lastOrderAt: "اليوم"
  },
  {
    id: "cust-5",
    name: "نورا كمال الدين",
    phone: "01144332211",
    email: "noura.kamal@outlook.com",
    ordersCount: 3,
    totalSpent: 560,
    loyaltyPoints: 56,
    tier: "برونزي 🥉",
    registeredAt: "2025-01-12",
    lastOrderAt: "أمس"
  }
];

const INITIAL_RESERVATIONS = [
  {
    id: "RES-101",
    customerName: "عمرو دياب عبد العال",
    phone: "01066778899",
    branchId: "branch-mohandessin",
    branchName: "فرع المهندسين - جامعة الدول العربية",
    date: "2026-08-25",
    time: "08:30 مساءً",
    guests: 6,
    zoneType: "صالة عائلات مكيفة",
    occasion: "عزومة عائلية واحتفال نجاح",
    status: "confirmed"
  },
  {
    id: "RES-102",
    customerName: "د. ياسمين خيري",
    phone: "01233445566",
    branchId: "branch-tagamoa",
    branchName: "فرع التجمع الخامس - شارع التسعين",
    date: "2026-08-26",
    time: "03:00 عصرًا",
    guests: 4,
    zoneType: "تراس خارجي مفتوح",
    occasion: "غداء عمل سريع",
    status: "confirmed"
  }
];

const INITIAL_CAREERS = [
  {
    id: "job-1",
    title: "شيف كشري رئيسي (صنايعي حلل ومطبخ)",
    branch: "جميع الفروع (القاهرة والجيزة)",
    type: "دوام كامل (وردية صباحية / مسائية)",
    salary: "8,500 - 12,000 ج.م + حوافز مبيعات",
    requirements: [
      "خبرة لا تقل عن 3 سنوات في كبرى مطاعم الكشري المصرية.",
      "إتقان ضبط خلطة الصلصة والدقة والشطة وتنسيق أطباق السرعة العالية.",
      "الالتزام الصارم بمعايير النظافة وسلامة الغذاء."
    ]
  },
  {
    id: "job-2",
    title: "كاشير ومسؤول نقطة البيع (POS Cashier)",
    branch: "فرع وسط البلد والتجمع الخامس",
    type: "دوام كامل",
    salary: "6,000 - 8,000 ج.م + تيبس يومي مجزي",
    requirements: [
      "مؤهل عالي أو فوق متوسط وإجادة تامة لأنظمة الكاشير الإلكترونية.",
      "لباقة وحسن مظهر وسرعة بديهة في التعامل مع الزبائن وتنسيق الأوردرات.",
      "القدرة على العمل تحت ضغط أوقات الذروة."
    ]
  },
  {
    id: "job-3",
    title: "كابتن توصيل دليفري (طيار بسكوتر أو دراجة نارية)",
    branch: "فروع مدينة نصر والمعادي والمهندسين",
    type: "دوام كامل أو مرن",
    salary: "راتب ثابت + عمولة ممتازة لكل أوردر + تأمين",
    requirements: [
      "امتلاك دراجة نارية أو سكوتر بحالة ممتازة ورخصة قيادة سارية.",
      "حفظ شوارع ومناطق النطاق الجغرافي للفرع والالتزام بالوقت.",
      "هاتف ذكي واستخدام تطبيقات الخرائط والتتبع."
    ]
  },
  {
    id: "job-4",
    title: "مدير فرع ومشرف تشغيل (Branch Manager)",
    branch: "فرع الشيخ زايد والإسكندرية",
    type: "دوام كامل (إداري)",
    salary: "14,000 - 18,000 ج.م + بونص أرباح ربع سنوي",
    requirements: [
      "خبرة 4 سنوات فأكثر في إدارة مطاعم الـ F&B وسلاسل الوجبات السريعة.",
      "مهارات قيادية قوية وإدارة المخزون والتكلفة وفريق العمل.",
      "تحقيق أعلى معايير الجودة ورضا العملاء."
    ]
  }
];

const INITIAL_STAFF = [
  { id: "staff-1", name: "محمود الزعيم", role: "admin", roleTitle: "المدير العام (Super Admin)", branchId: "all", branchName: "جميع الفروع", email: "admin@zaeem.com", pin: "1234", phone: "01000000001", status: "active" },
  { id: "staff-2", name: "علاء حسني", role: "branch_manager", roleTitle: "مدير فرع وسط البلد", branchId: "branch-downtown", branchName: "فرع وسط البلد - التحرير", email: "downtown@zaeem.com", pin: "2233", phone: "01000000002", status: "active" },
  { id: "staff-3", name: "شريف النجار", role: "cashier", roleTitle: "كاشير ومطبخ", branchId: "branch-downtown", branchName: "فرع وسط البلد - التحرير", email: "cashier1@zaeem.com", pin: "3344", phone: "01000000003", status: "active" },
  { id: "staff-4", name: "إبراهيم حسن", role: "delivery", roleTitle: "مسؤول وكابتن التوصيل", branchId: "branch-downtown", branchName: "فرع وسط البلد - التحرير", email: "delivery1@zaeem.com", pin: "4455", phone: "01000000004", status: "active" }
];

const INITIAL_TESTIMONIALS = [
  {
    id: "test-1",
    name: "م. حسام غالي",
    role: "ناقد طعام ومحب للكشري",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "أقسم بالله أحسن كشري أكلته في حياتي! التقلية مقرمشة لآخر معلقة والصلصة متسبكة بالسمن والخلطة السرية.. وطاجن اللحمة المفرومة خطير!",
    date: "منذ يومين",
    verified: true
  },
  {
    id: "test-2",
    name: "د. ريم فاروق",
    role: "طبيبة تغذية",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "كشري الزعيم اللايت بزيت الزيتون والشوفان كان مفاجأة حقيقية بالنسبة لي.. طعم كشري بلدي حقيقي بنظافة وجودة 10 على 10 والتوصيل في أقل من نصف ساعة.",
    date: "منذ 4 أيام",
    verified: true
  },
  {
    id: "test-3",
    name: "أحمد عبد الله",
    role: "مهندس برمجيات",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "بوكس اللمة العائلي أنقذنا في عزومة الشغل.. الأصناف وصلت سخنة مولعة مع دقات وشطة زيت إكسترا والأرز بلبن فرن حكاية تانية خالص.",
    date: "منذ أسبوع",
    verified: true
  }
];

const RESTAURANT_SETTINGS = {
  name: "كشري الزعيم",
  slogan: "أصل الكشري المصري الأصيل.. بطعم زمان وجودة اليوم",
  hotline: "19888",
  whatsapp: "201012345678",
  supportEmail: "info@koshary-elzaeem.com",
  currency: "ج.م",
  vatPercent: 0, // شامل الضريبة
  serviceFeePercent: 0,
  minOrderValue: 35,
  defaultDeliveryFee: 15,
  loyaltyPointsPerPound: 0.1, // 10 ج.م = 1 نقطة
  loyaltyPointValueInEGP: 0.5, // 1 نقطة = 0.5 ج.م عند الاستبدال
  announcementBanner: "🔥 خصم خاص 15% على جميع الطلبات أونلاين بكود: ZAEEM2026 | توصيل فوري ساخن لباب بيتك 🛵",
  isOpen: true
};
