# Shopping Cart Discounts

🖥️ [Live Demo @ CodeSandbox][codesandbox]

Given the following product prices:

```python
prices = { "apple": 100, "grapeBag": 450, "peach": 90 }
```

With the following discount rules:

```
Apple: Buy at least two, and get 20% off
GrapeBag: Buy one, and get one free
Peach: No discount
```

Calculate the total price for the following carts:

```python
carts = [
  { "apple": 0, "grapeBag": 0, "peach": 0 }, # 0
  { "apple": 1, "grapeBag": 1, "peach": 1 }, # 640
  { "apple": 2, "grapeBag": 2, "peach": 1 }, # 700
  { "apple": 2, "grapeBag": 2, "peach": 2 }, # 790
  { "apple": 5, "grapeBag": 7, "peach": 7 }, # 2380
]
```

## Development

1. Install [Python 3][python]
2. Clone and open this directory
2. Run `python discounts.py`

[codesandbox]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/Discounts?file=/

[python]: https://www.python.org

