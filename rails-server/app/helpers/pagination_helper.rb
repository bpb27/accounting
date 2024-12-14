module PaginationHelper
  def pagination_metadata(paginated_records)
    {
      totalRecords: paginated_records.total_count,
      page: paginated_records.current_page,
      perPage: paginated_records.limit_value,
      totalPages: paginated_records.total_pages
    }
  end
end
