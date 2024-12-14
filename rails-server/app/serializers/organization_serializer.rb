class OrganizationSerializer
  def initialize(organization)
    @organization = organization
  end

  def as_json(_options = {})
    {
      id: @organization.id,
      name: @organization.name,
      createdAt: @organization.created_at.iso8601,
      createdAtFormatted: format_date(@organization.created_at)
    }
  end

  private

  def format_date(date)
    date.strftime("%m/%d/%Y")
  end
end
