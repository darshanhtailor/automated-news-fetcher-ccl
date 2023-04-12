require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_KEY);

const connectToAtlas = require('./db');
connectToAtlas();

const News = require('./models/News');

app.get('/', async(req, res)=>{
    try{
        const news = await News.find();
        res.render('index', { news });
    } catch(err){
        console.error(err.message);
    }
});

app.post('/update-news', async(req, res)=>{
    try{
        const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
        const to = new Date().toISOString().substring(0, 10);

        const news = await newsapi.v2.everything({
            q: 'india',
            from,
            to,
            language: 'en',
            sortBy: 'publishedAt'
        });
        console.log('news fetched')

        let articles = news.articles, arr = [];
        for(let article of articles){
            arr.push({
                source: article.source.name,
                title: article.title,
                description: article.description,
                url: article.url,
                imgUrl: article.urlToImage,
                publishedAt: article.publishedAt,
                content: article.content
            });
        }

        await News.deleteMany();
        await News.insertMany(arr);

        console.log(arr.length + ' news updated')
        // res.status(200).json(news.articles);
        res.status(200).send('news updated');
    } catch(err){
        console.log(err.message);
    }
});

app.listen(process.env.PORT || 8000, ()=>{
    console.log('server started on port 8000');
});