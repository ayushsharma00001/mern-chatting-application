import Conversation from "../models/conversation.js";
import {Message} from "../models/messageModel.js";
import {io} from "../socket/socket.js"
import { getReceiverSocketId } from "../socket/socket.js";
export const sendMessage = async (req,res)=>{
    try{
        const senderId = req.id;
        const recieverId = req.params.id;
        const {message} = req.body;
        let gotConversation = await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        });
        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants:[senderId,recieverId]
            });
        };
        const newMessage = await Message.create({
            sender:senderId,
            reciever:recieverId,
            message
        });
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        };
        await Promise.all([gotConversation.save(), newMessage.save()]);

        // socket.io

        const recieverSocketId = getReceiverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }


        






        return res.status(201).json({
            newMessage
        })
    }catch(err){
        console.log(err);
    }
}


export const getMessage = async(req,res)=>{
    try{
        const recieverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        }).populate("messages");
        if(conversation){
            return res.status(200).json(conversation?.messages);
        }
        else{
            return res.status(200).json(null);
        }
    }catch(err){
        console.log(err);
    }
}