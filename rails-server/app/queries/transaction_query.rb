class TransactionQuery
  def initialize(relation = Transaction.all)
    @relation = relation
  end

  def call(params)
    scoped = @relation
    scoped = filter_by_organization(scoped, params[:organization_id])
    scoped = filter_by_date(scoped, params[:startDate], params[:endDate])
    scoped = order_by_occurred_at(scoped)
    paginate(scoped, params[:page], params[:perPage])
  end

  private

  def filter_by_organization(scope, organization_id)
    return scope unless organization_id.present?

    scope.by_organization(organization_id)
  end

  def filter_by_date(scope, start_date, end_date)
    scope = scope.starting_from(start_date) if start_date.present?
    scope = scope.ending_at(end_date) if end_date.present?
    scope
  end

  def order_by_occurred_at(scope)
    scope.order(occurred_at: :desc)
  end

  def paginate(scope, page, per_page)
    page = page.presence || 0
    per_page = per_page.presence || 25

    scope.page(page).per(per_page)
  end
end
