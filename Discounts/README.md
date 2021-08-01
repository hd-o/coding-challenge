# Shopping Cart Discounts

🖥️ [Live Demo @ CodeSandbox][codesandbox]

Given the following product prices:

```python
prices = {"apple": 100, "grapeBag": 450, "peach": 90}
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
  {"apple": 0, "grapeBag": 0, "peach": 0}, # 0
  {"apple": 1, "grapeBag": 1, "peach": 1}, # 640
  {"apple": 2, "grapeBag": 2, "peach": 1}, # 700
  {"apple": 2, "grapeBag": 2, "peach": 2}, # 790
  {"apple": 5, "grapeBag": 7, "peach": 7}, # 2380
]
```

## Development

1. Install [Python 3][python]
2. Run `python discounts.py`

[codesandbox]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/Discounts?file=/

[python]: https://www.python.org

## Scaling a Shopping Cart

In this challenge I coded a function that calculates the total price, and applies discounts for certain product quantities. The following are my current ideas related to scaling this solution.

### Scenario

1. A store with thousands of items
2. Discounts applied based on multiple rules

### Requirement

1. System architecture handling dynamic product lists  
2. Solution allowing discount updates by non-engineers 
    - Marketing department could insert a promotion

### Solution

A product's final price can be influenced by several factors: Discount based on product quantity, discount based on a brand's products quantity, coupons, loyalty plans, premium plans, e.t.c

On all purchases, two value types are certain, the product ids, and their quantities. With this data, transformations can be applied to calculate the final cart price. My current solution is to have "price rules" defining the calculation for a product price, and discounts if any. Example:

```
price_rule:
  id: unique_key
  product_id: unique_key(table: product)
  type: "price" | "discount" | "coupon"
```

For each `price_rule` there is a function which, given a `ShoppingCart`, will calculate product price, or discount. This function can be saved in a database, or in file storage like S3:

```
# File name format "price_rule_{price_rule.id}.py"

# price_rule_001.py
def price(cart: ShoppingCart) -> Price

# price_rule_002.py
def discount(cart: ShoppingCart) -> Optional[Price]

# price_rule_003.py
def coupon(cart: ShoppingCart) -> Optional[Price]
```

The class `ShoppingCart` can then fetch the price rules for each selected product, and run the defined functions, receiving a list of prices, and knowing the type of the rule  (`"price"`, `"discount"`, `"coupon"`, e.t.c). This resulting data can be used to render UI copy/text, and inform the user on prices, and applied discounts.

Some rules can return an `Optional` type, where the rule might not be applied, e.g: expired coupons, or a product quantity not enough for the discount, e.t.c.

## Further Research

> TODO
