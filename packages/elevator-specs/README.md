# 🛗 Elevator Specs

`#elevator` `#jest` `#spec`

Shared virtual elevators specification tests, using @testing-library.

Used by [virtual-elevators][virtual_elevators], and other elevator projects

## Instructions

Because of limitations with [Jest and symbolic links][jest_symlink], current usage method involves copying test files from this project into the consumer project by adding a script command that runs before Jest. See [virtual-elevators/package.json][virtual_elevators_package] for usage example

```jsonc
// In consumer's package.json
{
  "scripts": {
    "setup:spec": "bash ../elevator-specs/setup.sh",
    "run:jest": "jest spec",
    "test": "run-s setup:spec run:jest",
  }
}
```

[jest_symlink]: https://github.com/facebook/jest/issues/1477

[virtual_elevators]: ../virtual-elevators/

[virtual_elevators_package]: ../virtual-elevators/package.json
