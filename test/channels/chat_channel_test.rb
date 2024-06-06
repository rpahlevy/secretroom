require "test_helper"

class ChatChannelTest < ActionCable::Channel::TestCase
  test "subscribes" do
    subscribe
    assert subscription.confirmed?
  end

  test "assert transmitted message" do
    assert_broadcast_on "secretroom_channel", { username: "testusername", usercolor: "#AAAAAA", message: "Hi!" } do
      ActionCable.server.broadcast "secretroom_channel", { username: "testusername", usercolor: "#AAAAAA", message: "Hi!" }
    end
  end
end
