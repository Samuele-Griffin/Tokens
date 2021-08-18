process.env.PORT = process.env.PORT || 3000;

process.env.NODE_EV = process.env.NODE_EV || 'dev';

let URI;

if (URI === 'dev') {
    URI = 'mongodb://localhost:27017/siggames';
} else {
    URI = 'mongodb+srv://geralt:impro123@cluster0.22tg2.mongodb.net/cafe';
}

process.env.URI = URI;