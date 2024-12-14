module Api
  module V1
    class OrganizationsController < ApplicationController
      def index
        query = OrganizationQuery.new
        organizations = query.call(index_params)

        render json: {
          metadata: pagination_metadata(organizations),
          records: organizations.map { |organization| OrganizationSerializer.new(organization).as_json }
        }
      end

      def show
        organization = Organization.find_by(id: params[:id])
        if organization
          render json: OrganizationSerializer.new(organization)
        else
          render json: { error: "Organization not found" }, status: :not_found
        end
      end

      private

      def index_params
        {
          page: params[:page] || 0,
          per_page: params[:perPage] || 25
        }
      end
    end
  end
end
