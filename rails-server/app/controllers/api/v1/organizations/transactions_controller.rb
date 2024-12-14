module Api
  module V1
    module Organizations
      class TransactionsController < ApplicationController
        def index
          query = TransactionQuery.new
          transactions = query.call(index_params)

          render json: {
            metadata: pagination_metadata(transactions),
            records: transactions.map { |transaction| TransactionSerializer.new(transaction).as_json }
          }
        end

        private

        def index_params
          params.permit(:organization_id, :startDate, :endDate, :page, :perPage).to_h.tap do |permitted|
            permitted[:page] ||= 0
            permitted[:perPage] ||= 25
          end
        end
      end
    end
  end
end
