## Overview

The core principle of double-entry accounting:
every transaction should record both where the money came from and what the money was used for.

_Transactions_ are atomic events that affect accounts.
Transactions are immutable. Mistakes or refunds are corrected by subsequent transactions.
Each transaction has at least two entries.
Entries belong to an account and a transaction.

An _account_ is a segregated pool of value.
Any discrete balance can be an account.
Accounts correspond to values you want to track.

A _journal_ is the book of original entry - where all transactions are first recorded chronological order.
Each transaction is recorded as a _journal entry_.

A _ledger_ is the book of final entry - which organizes all transactions from the journal into individual accounts.
It's a summary organized by account, pulling together information from the journal for easier reference.
It shows all debits and credits for an account and a running balance.
A _general ledger_ shows the full picture for all accounts.

The five main accout categories are:

- Equity is your net worth.
- Assets are what you own.
- Liabilities are what you owe.
- Expenses are the money you spend.
- Income is the money you earn.

Key formula:
Equity = Assets - Liabilities

## How do you decide what accounts you want?

1. What do you need to track? Sales revenue, customer refunds, rent, wages, taxes
2. What financial reports do you need? P&L statement, cash flow statement, balance sheet
3. What level of detail do you want? Utilities vs. electricity and water and internet and phone, R&D costs

For a business:

- Assets: Cash, Accounts Receivable, Equipment or Inventory
- Liabilities: Accounts Payable, Loans or Lines of Credit, Taxes Payable
- Income: Product Sales, Service Revenue, Interest Income
- Expenses: Cost of Goods Sold (COGS), Salaries and Wages, Rent, Marketing and Advertising, Office Supplies

Diving in to some of the accounts:

- _Accounts Receivable_ is money owed to you by customers. It's considered a current asset because it represent future cash inflow. Example: selling something on credit, expecting customer to pay up in 30 days.
  - When the sale is made, Debit (Increase): Accounts Receivable (Asset), Credit (Increase): Revenue (Income)
  - When the customer pays, Debit (Increase): Bank account (Asset), Credit (Decrease): Accounts Receivable (Asset).
- _Accounts Payable_ is money you owe to vendors or suppliers. It's considered a liability because it represents future case outflow. Example: buying something on credit, paying for it in 30 days.

<!-- prettier-ignore -->
*Account Type*	*Debits Do This*	                      *Credits Do This*
Assets	        Increase (e.g. cash in your bank)	      Decrease (e.g. money spent)
Liabilities	    Decrease (e.g. paying off debt)	        Increase (e.g. borrowing money)
Equity	        Decrease (e.g. owner withdrawals)	      Increase (e.g. earned money)
Expenses	      Increase (e.g. paying bills)	          Decrease (e.g. refund for returned purchase)
Income	        Decrease (e.g. refund payment for job)  Increase (e.g. paycheck)

_Shorthand summary_

Two accounts will always be involved in one transaction.
Credit and debit describe the movement/direction of the amount between accounts.

Credit represents the source: where the money or value comes from.
Debit represents the destination: where the money or value goes.

When you buy something, expenses increase. If you pay with your bank account, your assets decrease. If you pay with your credit card, your liabilities increase.
This shows how the source (credit) can sometimes increase or decrease depending on the type of account.

_Summary examples_

Paying Your Mortgage (Expense)
The source of payment is your bank account (the asset), which decreases because you're using it to pay the mortgage (the expense).

Paying Netflix Subscription (Expense)
The source of payment is your Visa card (the liability), which increases because your credit card bill goes up to pay Netflix (the expense).

Paying Your Credit Card Bill (Liability)
The source of payment is your bank account (the asset), which decreases because you're using it to pay off your credit card debt (the liability).

Depositing Your Paycheck in the Bank (Asset)
The source of value is your salary (the income), which increases because you made money, and your assets also increase because you put it into the bank (the asset).

<!-- prettier-ignore -->
*Date*	    *Description*	            *Debit (Account)*	            *Credit (Account)*	        *Amount*    *Result*
2024-12-01	Paycheck deposited	        Bank account (Asset)	        Salary income (Income)	    $5,000.00   Increase assets and increase income
2024-12-02	Mortgage payment	        Mortgage expense (Expense)	    Bank account (Asset)	    $2,000.00   Increase expenses and decrease assets
2024-12-03	Subscription payment	    Subscription expense (Expense)	Credit card (Liability)	    $15.00      Increase expenses and increase liabilities
2024-12-10	Credit card payment	        Credit card (Liability)	        Bank account (Asset)	    $500.00     Decrease liabilities and decrease assets
2024-12-15	Grocery shopping	        Groceries expense (Expense)	    Debit card (Asset)	        $250.00     Increase expenses and decrease assets
2024-12-18	Utility bill payment	    Utility expense (Expense)	    Bank account (Asset)	    $120.00     Increase expenses and decrease assets
2024-12-20	Interest on savings	        Bank account (Asset)	        Interest income (Income)    $10.00      Increase assets and increase income
2024-12-25	Dining out with friends	    Dining expense (Expense)	    Credit card (Liability)	    $75.00      Increase expenses and increase liabilities
2024-12-28	Mortgage interest paid	    Interest expense (Expense)	    Bank account (Asset)	    $800.00     Increase expenses and decrease assets
2024-12-31	Credit card interest fee    Interest expense (Expense)	    Credit card (Liability)	    $20.00      Increase expenses and increase liabilities

**Deeper clarifications**

Expenses and income affect equity indirectly:

- Income increases equity because it adds to your net worth
- Expenses decrease equity because they reduce your net worth

They are separated into distinct accounts to make it easier to:

- Track where money is being earned (income) or spent (expenses)
- Analyze performance over time (e.g., monthly or quarterly profits/losses)
- If equity is credited directly, the benefits above are much harder achieve

Income is a subcategory of equity:

- It represents temporary increase in equity, specifically from money earned during a specific period
- For a person, paychecks are income, for a business, sales revenue is income
- After the accounting period ends (e.g. month, quarter, year), the balance of the income account is closed into equity (usually as retained earnings)
- This process lets you reset income for the new period while still reflecting its impact on your cumulative equity

Separating income and expenses into temporary accounts allows:

- Profit and Loss Statements (Income Statements): Shows how much money was earned (income) and spent (expenses) during a specific period.
- Balance Sheets: Reflects cumulative net worth (equity) after income and expenses have been closed into equity.

**Business perspective**

Debit normal accounts - assets and expenses - uses of money

- cash
- inventory
- physical property
- money customers owe
- taxes
- total wages

Credit normal accounts - liabilities and revenue - sources of money

- credit card balance
- bank loans
- revenue

Timeline

<!-- prettier-ignore -->
*Transaction*           *Debit*                     *Credit*
Raises money            Cash $1m increase           Equity $1m increase     
Buys inventory          Inventory $300 increase     Cash $300k decrease
Sells inventory         Cash $50k increase          Inventory $50k decrease
Takes a loans           Cash $500k increase         Loans $500k increase
Pays loan installment   Loans $30k Decrease         Cash $30k decrease

Cash + Inventory == Equity + Loans
