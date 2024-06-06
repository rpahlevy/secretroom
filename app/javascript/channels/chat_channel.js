import consumer from "channels/consumer"

window.chat_app = consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    window.appendThread(data);
  },

  send_message: function(data) {
    return this.perform('send_message', data);
  }
});
