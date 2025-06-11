FROM node:18

# 1. WORKDIR पहले सेट करें
WORKDIR /app

# 2. पहले package.json और package-lock.json कॉपी करें
COPY package*.json ./

# 3. बाकी फाइल्स कॉपी करें
COPY . .

# 4. डिपेंडेंसी इंस्टॉल करें
RUN npm install

# 5. एप्लिकेशन रन करें
CMD ["node", "index.js"]
