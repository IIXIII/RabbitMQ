import {Stomp} from './stomp.js';

let mq_username = "guest";
let mq_password = "guest";
let mq_vhost    = "/";
let instance = null;
var instance_Class = null
var client;

export class rabbitMQ{
  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;
  }

  subscribe(instanceClass){
    instance_Class = instanceClass;
  }

  subscribeTopics(topics){
    var arrayTopics = topics.split(" ");
    for(var topic in arrayTopics) {
      console.log("Topicos SUB ==>> "+ topic);
      client.subscribe("/topic/"+arrayTopics[topic], this.on_message);
    }
  }

  on_message(m) {
    console.log('message received====>>' + m.body);
    console.log(m);
    instance_Class.onMessage(m.body);
  }

  sendMessage(topic, message){
    console.log("ENVIANDO!!!!!! ===>> " + topic + " MJE ==>>" + message);
    client.send("/topic/"+topic , {"content-type":"text/plain"}, message);
  }

  on_connect() {
    console.log("Connected to RabbitMQ-Web-Stomp<br />====>>>>");
    instance_Class.onConnected();
  }

  on_connect_error(error) {
    console.log("Connection failed! ====>>> " + error);
    instance.connectToRabbit();
  }

  connectToRabbit(){
    let ws = new WebSocket("ws://127.0.0.1:15674/ws");
    client = Stomp.over(ws);

    console.log("CONECTANDO=====>>>>>");
    client.connect(
      mq_username,
      mq_password,
      this.on_connect,
      this.on_connect_error,
      mq_vhost
    );
  }
}
