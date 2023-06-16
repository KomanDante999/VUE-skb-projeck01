export default function pluralRules(number, forms) {
  const pr = new Intl.PluralRules('ru', { type: 'cardinal' });
  return forms[pr.select(number)]  
}
