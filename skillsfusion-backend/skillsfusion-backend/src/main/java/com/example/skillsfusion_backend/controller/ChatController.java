package com.example.skillsfusion_backend.controller;

import com.example.skillsfusion_backend.model.ChatMessage;
import com.example.skillsfusion_backend.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatMessageRepository chatRepo;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ChatMessage msg) {
        msg.setTimestamp(new Timestamp(System.currentTimeMillis()));
        return ResponseEntity.ok(chatRepo.save(msg));
    }

    @GetMapping("/messages")
    public List<ChatMessage> getMessages(
            @RequestParam String user1, @RequestParam String user2) {
        return chatRepo.findBySenderEmailAndReceiverEmailOrReceiverEmailAndSenderEmail(
                user1, user2, user1, user2);
    }
}