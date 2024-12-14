require "csv"

Entry.delete_all
Transaction.delete_all
Account.delete_all
Organization.delete_all

organization = Organization.create!(name: "Otto's Onions")

acct_revenue = organization.accounts.create!(name: "Revenue", account_type: "income")
acct_shipping_revenue = organization.accounts.create!(name: "Shipping Revenue", account_type: "income")
acct_sales_tax_payable = organization.accounts.create!(name: "Sales Tax Payable", account_type: "liability")
acct_accounts_receivable = organization.accounts.create!(name: "Accounts Receivable", account_type: "asset")
acct_cash = organization.accounts.create!(name: "Cash", account_type: "asset")

CSV.foreach(Rails.root.join('db', 'seed_data', 'orders.csv'), headers: true, header_converters: :symbol) do |row|
  order_id = row[:order_id]
  ordered_at = Date.parse(row[:ordered_at])
  price_per_item = row[:price_per_item].to_f
  quantity = row[:quantity].to_i
  shipping = row[:shipping].to_f
  tax_rate = row[:tax_rate].to_f
  payment_1_amount = row[:payment_1_amount].to_f
  payment_2_amount = row[:payment_2_amount].to_f

  subtotal = price_per_item * quantity
  tax = subtotal * tax_rate
  total = subtotal + shipping + tax

  entries = [
    { account_id: acct_accounts_receivable.id, amount: total, description: "Debit for total order amount" },
    { account_id: acct_revenue.id, amount: -subtotal, description: "Credit for revenue" },
    { account_id: acct_shipping_revenue.id, amount: -shipping, description: "Credit for shipping revenue" },
    { account_id: acct_sales_tax_payable.id, amount: -tax, description: "Credit for sales tax payable" }
  ]

  if payment_1_amount.positive?
    entries << { account_id: acct_cash.id, amount: payment_1_amount, description: "Debit for payment 1" }
    entries << { account_id: acct_accounts_receivable.id, amount: -payment_1_amount, description: "Credit for payment 1 applied" }
  end

  if payment_2_amount.positive?
    entries << { account_id: acct_cash.id, amount: payment_2_amount, description: "Debit for payment 2" }
    entries << { account_id: acct_accounts_receivable.id, amount: -payment_2_amount, description: "Credit for payment 2 applied" }
  end

  begin
    puts "Creating transaction for order #{order_id} with #{entries.length} entries"
    CreateTransaction.perform(
      organization_id: organization.id,
      description: "Order ##{order_id}",
      occurred_at: ordered_at,
      entries: entries
    )
  rescue => e
    Rails.logger.error("Failed to create transaction for Order ##{order_id}: #{e.message}")
  end
end
