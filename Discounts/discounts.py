from typing import List, Literal

Price = int
Quantity = int
Product = Literal["apple", "grapeBag", "peach"]
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


prices: Prices = {"apple": 100, "grapeBag": 450, "peach": 90}

carts: List[Cart] = [
    {"apple": 0, "grapeBag": 0, "peach": 0},
    {"apple": 1, "grapeBag": 1, "peach": 1},
    {"apple": 2, "grapeBag": 2, "peach": 1},
    {"apple": 2, "grapeBag": 2, "peach": 2},
    {"apple": 5, "grapeBag": 7, "peach": 7},
]

expected_totals = [0, 640, 700, 790, 2380]

calculated_totals = [calculate_total(prices, cart) for cart in carts]

print("🟢 Passed" if calculated_totals == expected_totals else "🔴 Failed")
print("calculated_totals: ", calculated_totals)
print("expected_totals: ", expected_totals)
