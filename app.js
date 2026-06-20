const { createApp, reactive, ref, computed } = Vue;

createApp({
  setup() {
    const menu = ref([]);
    const qty = reactive({});
    const showModal = ref(false);
    const priceMap = {};

    fetch("menu.json")
      .then(res => res.json())
      .then(data => {
        menu.value = data;
        data.forEach(g => g.items.forEach(i => priceMap[i.name] = i.price));
      })
      .catch(err => console.error("無法載入 menu.json：", err));

    const inc = (item) => { qty[item.name] = (qty[item.name] || 0) + 1; };
    const dec = (item) => {
      if (qty[item.name] > 0) qty[item.name]--;
      if (qty[item.name] === 0) delete qty[item.name];
    };

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
