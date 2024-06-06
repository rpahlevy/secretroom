class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "secretroom_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    ActionCable.server.broadcast "secretroom_channel", data
  end
end
