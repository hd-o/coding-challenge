# 🛒 Cart Discounts

Calculating total price for shopping carts, with different discounts applied

## Challenge

### Given the following product prices:


```python
prices = {"apple": 100, "grapeBag": 450, "peach": 90}
```

### With the following discount rules:

- Apple: Buy at least two, and get 20% off
- GrapeBag: Buy one, and get one free
- Peach: No discount

### Calculate the total price for the following carts:


```python
carts = [
  {"apple": 0, "grapeBag": 0, "peach": 0}, # 0
  {"apple": 1, "grapeBag": 1, "peach": 1}, # 640
  {"apple": 2, "grapeBag": 2, "peach": 1}, # 700
  {"apple": 2, "grapeBag": 2, "peach": 2}, # 790
  {"apple": 5, "grapeBag": 7, "peach": 7}, # 2380
]
```

### The expected totals are:


```python
expected_totals = [0, 640, 700, 790, 2380]
```

## Solution


```python
Price = int
Quantity = int
Product = str
Prices = dict[Product, Price]
Cart = dict[Product, Quantity]

def calculate_total(prices: Prices, cart: Cart) -> Price:
    """Calculate total cart price with discounts applied for each product"""
    total = 0
    for product, quantity in cart.items():
        if product == "apple":
            apple_total = quantity * prices["apple"]
            # Buy 2 or more, get 20% off
            if quantity > 1:
                apple_total -= apple_total * 0.2
            total += apple_total
        if product == "grapeBag":
            if quantity < 2:
                total += quantity * prices["grapeBag"]
            else:
                # Buy one, get one free
                # if quantity is even, divide by 2
                # else subtract one, then divide by 2
                calc_quantity = quantity if quantity % 2 == 0 else quantity - 1
                total += prices["grapeBag"] * (calc_quantity / 2)
        if product == "peach":
            # No discounts
            total += quantity * prices["peach"]
    return int(total)
```

## Test


```python
calculated_totals = [calculate_total(prices, cart) for cart in carts]
print("🟢 Passed" if calculated_totals == expected_totals else "🔴 Failed")
print("calculated_totals: ", calculated_totals)
print("expected_totals: ", expected_totals)
```

    🟢 Passed
    calculated_totals:  [0, 640, 700, 790, 2380]
    expected_totals:  [0, 640, 700, 790, 2380]


## Scaling a Shopping Cart

The following are my current ideas related to scaling a shopping cart architecture.

### Scenario

1. A store with thousands of items
2. Discounts applied based on multiple rules

### Requirement

1. System architecture handling dynamic product lists  
2. Solution allowing discount updates by non-engineers 
    - Marketing department could insert a promotion

### Solution

A product's final price can be influenced by several factors: Discount based on product quantity, discount based on a brand's products quantity, coupons, loyalty plans, premium plans, e.t.c. On all purchases, two value types are certain, the product ids, and their quantities. With this data, transformations can be applied to calculate the final cart price. My current solution is to have "price rules" defining the calculation for a product price, and discounts if any. Example:


```python
from typing import Literal

# DB Table price_rule
class PriceRule:
    # Unique rule key
    # Used for data joins, and UI copy/text
    id: str
    # Used by ShoppingCart to know which price
    # rules should be fetched/loaded
    product_id: str
    # Used by ShoppingCart to know how a product's
    # price is calculated, and inform the customer
    type: Literal["price", "discount", "coupon"]
```

For each price rule there is a function which will calculate product price. This function can be saved in a database, or in storage like AWS S3.


```python
# Price rule function examples

from typing import Optional

# Example shopping cart class
class ShoppingCart: pass

# Example file name format: "rule_{price_rule.id}.py"

# rule_001.py
def price(cart: ShoppingCart) -> Price: pass

# rule_002.py
def discount(cart: ShoppingCart) -> Optional[Price]: pass

# rule_003.py
def coupon(cart: ShoppingCart) -> Optional[Price]: pass
```

The class `ShoppingCart` could fetch the price rules for each selected product, and run the defined functions, receiving a list of prices, and knowing the type of the rule  (price, discount, coupon, e.t.c). This resulting data can be used to render UI copy/text, and inform the user on prices, and applied discounts. Some rules can return an `Optional` type, where the rule might not be applied, e.g: expired coupons, or a product quantity not enough for the discount, e.t.c.

