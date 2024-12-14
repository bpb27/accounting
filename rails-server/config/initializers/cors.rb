Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*" # replace '*' with specific domains (e.g., 'example.com') for security
    resource "*",
             headers: :any,
             methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
