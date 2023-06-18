// n = number, forms = ['товар', 'товара', 'товаров']
export default function pluralRules(n, forms) {
  return forms[
    (n % 10 == 1 && n % 100 != 11)
      ? 0
      : ([2, 3, 4].indexOf(n % 10) >= 0 && [12, 13, 14].indexOf(n % 100) < 0)
      ? 1
      : 2
  ];
}

