console.log('\x1Bc'/* clear */)

type Predicate = (values: string[]) => boolean

function equals (filters: string[]): Predicate {
  return function (values) {
    return filters.sort().toString() === values.sort().toString()
  }
}

function only (filters: string[]): Predicate {
  return function (values) {
    const leftover = values.toString().replace(new RegExp(filters.join('|')), '')
    return leftover === ''
  }
}

function all (filters: string[]): Predicate {
  return function (values) {
    return values.sort().toString().includes(filters.sort().toString())
  }
}

function any (filters: string[]): Predicate {
  return function (values) {
    return new RegExp(filters.join('|')).test(values.join(' '))
  }
}

function not (predicate: Predicate): Predicate {
  return function (values) {
    return !predicate(values)
  }
}

function or (...predicates: Predicate[]): Predicate {
  return function (values) {
    return Boolean(predicates.find(p => p(values)))
  }
}

function contains (...predicates: Predicate[]) {
  return function (values: string[]) {
    return predicates.every((p) => p(values))
  }
}

const isDallasAndMiami = contains(
  equals(['Dallas', 'Miami']),
)

const containsOnlyFloridaOrTexas = contains(
  or(
    only(['Miami', 'Orlando']),
    only(['Austin', 'Dallas']),
  ),
)

const containsMiamiAndOrlandoAndNotLa = contains(
  all(['Miami', 'Orlando']),
  not(all(['LA'])),
)

const containsAustinOrDallas = contains(
  any(['Austin', 'Dallas']),
)

const containsDallasOrMiamiAndNotLaOrNYC = contains(
  any(['Dallas', 'Miami']),
  not(any(['LA', 'NYC'])),
)

const tests = [
  () => true === isDallasAndMiami(['Dallas', 'Miami']),
  () => false === isDallasAndMiami(['Dallas', 'Miami', 'NYC']),
  () => true === containsOnlyFloridaOrTexas(['Miami']),
  () => false === containsOnlyFloridaOrTexas(['Miami', 'LA']),
  () => true === containsMiamiAndOrlandoAndNotLa(['Miami', 'Orlando']),
  () => false === containsMiamiAndOrlandoAndNotLa(['Miami', 'Orlando', 'LA']),
  () => true === containsAustinOrDallas(['Austin', 'LA']),
  () => false === containsAustinOrDallas(['LA', 'NYC']),
  () => true === containsDallasOrMiamiAndNotLaOrNYC(['Dallas']),
  () => false === containsDallasOrMiamiAndNotLaOrNYC(['Dallas', 'NYC']),
]

function run (test: () => boolean) {
  try { return test() }
  catch { return false }
}

for (const test of tests) {
  const result = run(test) ? '✅' : '❌'
  const content = test.toString().match(/(t|f).+/)?.[0]
  console.log(`${result} ${content}`)
}
