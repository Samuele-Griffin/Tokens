process.env.PORT = process.env.PORT || 3000;

process.env.NODE_EV = process.env.NODE_EV || 'dev';

process.env.TOKEN_EXP = 60 * 60 * 24 * 30;

process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'secret';

process.env.TOKEN_PROD = process.env.TOKEN_PROD || 'prod';

let URI;

if (URI === 'dev') {
    URI = 'mongodb://localhost:27017/siggames';
} else {
    URI = 'mongodb+srv://geralt:impro123@cluster0.22tg2.mongodb.net/cafe';
}

process.env.URI = URI;