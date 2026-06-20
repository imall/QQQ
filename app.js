const { createApp, reactive, ref, computed } = Vue;

const menu = [
  {
    title: "黑白切（炸物）",
    items: [
      { name: "雞排", price: 80 },
      { name: "魷魚", price: 80 },
      { name: "鹽酥雞", price: 50 },
      { name: "三角骨", price: 50 },
      { name: "脆薯", price: 50 },
      { name: "花枝丸", price: 35 },
      { name: "紅龍小香球(7顆)", price: 30 },
      { name: "甜不辣", price: 30 },
      { name: "豆干", price: 30 },
      { name: "百頁豆腐", price: 30 },
      { name: "杏鮑菇", price: 30 },
      { name: "四季豆", price: 30 },
      { name: "芋頭包", price: 30 },
      { name: "薯條", price: 30 },
      { name: "小肉條", price: 30 },
      { name: "雞蛋(1支)", price: 25 },
    ]
  },
  {
    title: "串類・其他",
    items: [
      { name: "雞屁股(1串)", price: 30 },
      { name: "雞屁股(2串)", price: 50 },
      { name: "雞心(1串)", price: 30 },
      { name: "雞心(2串)", price: 50 },
      { name: "麥克雞塊", price: 30 },
      { name: "地瓜條", price: 30 },
      { name: "炸湯圓", price: 30 },
      { name: "熱狗", price: 25 },
      { name: "芋粿", price: 25 },
      { name: "米腸", price: 25 },
      { name: "魚板", price: 25 },
      { name: "布丁酥(3個)", price: 25 },
      { name: "三角薯餅(3個)", price: 25 },
      { name: "米血", price: 20 },
      { name: "銀絲捲", price: 20 },
      { name: "可樂餅(1塊)", price: 20 },
      { name: "蘿蔔糕", price: 15 },
    ]
  }
];

createApp({
  setup() {
    const qty = reactive({});
    const showModal = ref(false);

    const inc = (item) => { qty[item.name] = (qty[item.name] || 0) + 1; };
    const dec = (item) => {
      if (qty[item.name] > 0) qty[item.name]--;
      if (qty[item.name] === 0) delete qty[item.name];
    };

    const priceMap = {};
    menu.forEach(g => g.items.forEach(i => priceMap[i.name] = i.price));

    const orderLines = computed(() =>
      Object.keys(qty)
        .filter(n => qty[n] > 0)
        .map(n => ({ name: n, qty: qty[n], price: priceMap[n] }))
    );
    const total = computed(() => orderLines.value.reduce((s, l) => s + l.price * l.qty, 0));
    const totalCount = computed(() => orderLines.value.reduce((s, l) => s + l.qty, 0));

    const resetAll = () => {
      Object.keys(qty).forEach(k => delete qty[k]);
      showModal.value = false;
    };

    return { menu, qty, inc, dec, showModal, orderLines, total, totalCount, resetAll };
  }
}).mount("#app");
