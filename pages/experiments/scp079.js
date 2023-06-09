import { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const model = "nomic-ai/gpt4all-lora";

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const chat = async () => {
    try {
      const { data } = await axios.post(`https://api-inference.huggingface.co/models/${model}`, {
        inputs: `${conversation.length ? `You: ${input}\nChatGPT:` : ''}${input}`,
      });

      const message = data.generated_text.trim();

      const newConversation = [
        ...conversation,
        { text: input, author: 'user' },
        { text: message, author: 'chatbot' },
      ];

      setConversation(newConversation);
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {conversation.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.author === 'user' ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: message.author === 'user' ? 'primary.main' : 'grey.300',
                  color: message.author === 'user' ? 'white' : 'black',
                  borderRadius: 8,
                  p: 2,
                  maxWidth: '70%',
                }}
              >
                {message.text}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? chat() : null)}
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={chat}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatGPT;
