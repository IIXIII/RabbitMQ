import {rabbitMQ} from './rabbitMQ';

let instance = null;
var rabbit = null;
var rabbitTopics = "";
var instance_Class = null

export class AgentController{
  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;
  }

  setInstanceClass(instance){
    instance_Class = instance;
  }

  connectRabit(topics){
    if(!rabbit){
      console.log("Topicos ==>> " + topics);
      rabbitTopics = topics;
      rabbit = new rabbitMQ();
      rabbit.subscribe(this);
      rabbit.connectToRabbit();
    }
  }

  onConnected(){
    console.log("TOPICOS ====>>" + rabbitTopics);
    rabbit.subscribeTopics(rabbitTopics);
  }

  sendMessage(topic, message){
    rabbit.sendMessage(topic, message)
  }

  onMessage(message){
    console.log("LLEGO MENSAJE ===>>" + message);
    instance_Class.on_Message(message);
  }
}
