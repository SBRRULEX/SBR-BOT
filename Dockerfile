# सही कॉन्टेक्स्ट सेट करें
FROM node:18

# सभी आवश्यक फाइल्स कॉपी करें
WORKDIR /app
COPY package*.json ./
COPY . .

# डिपेंडेंसी इंस्टॉल करें
RUN npm install

# एंट्री पॉइंट सेट करें
CMD ["node", "index.js"]  # या "app.js" अगर वह आपकी मेन फाइल है
