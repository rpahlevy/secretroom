require "test_helper"

module ApplicationCable
  class ConnectionTest < ActionCable::Connection::TestCase
    test "connects without auth" do
      assert_no_error_reported { connect }
    end
  end
end
