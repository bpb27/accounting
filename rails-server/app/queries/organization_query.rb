class OrganizationQuery
  def initialize(relation = Organization.all)
    @relation = relation
  end

  def call(params)
    scoped = @relation
    scoped = order_by_occurred_at(scoped)
    paginate(scoped, params[:page], params[:perPage])
  end

  private

  def order_by_occurred_at(scope)
    scope.order(name: :asc)
  end

  def paginate(scope, page, per_page)
    page = page.presence || 0
    per_page = per_page.presence || 25

    scope.page(page).per(per_page)
  end
end
