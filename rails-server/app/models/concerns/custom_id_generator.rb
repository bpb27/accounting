module CustomIdGenerator
  extend ActiveSupport::Concern

  class_methods do
    def custom_id_prefix(prefix)
      before_create do
        self.id ||= "#{prefix}_#{SecureRandom.uuid.delete('-')}"
      end
    end
  end
end
