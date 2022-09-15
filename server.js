const { response } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios').default;


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))
  

app.get('/', (req, res) => {
    const config = {
        headers: {
            Authorization: 'Bearer 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',
        },
    };
    axios.get('https://api.github.com/repos/tluhk/rif20-valikpraktika/issues', config)
    .then((response) => {
        var resp = response.data.map((elem) => {
            return {
                id: elem.number,
                title: elem.title,
                comments_count: elem.comments,
            };
        });
        res.render('pages/index', {persons: resp})
    })
    .catch(error => {
        console.log(error);
    })
})
app.get('/notes', (req, res) => {
    const data = {
        comments: [
            {
                date: "15.09.2022",
                text: "Lorem lorem"
            },
            {
                date: "12.09.2022",
                text: "Lorem lorem"
            },
            {
                date: "16.09.2022",
                text: "Lorem lorem"
            },
        ]
    }
    res.render('pages/notes', data);
});



/* app.get('/', (req, res) => {
    const data = {
        persons: [
        {
        name: "Pille",
        comments_count: 3
        }, 
        {
        name: "Jaanus",
        comments_count: 6
        },
        {
        name: "Kristjan",
        comments_count: 0
        },]
    }
    res.render('pages/index', data)
}) */

app.listen(3000, () => {
    console.log(
      `App is running on port 3000, visit http://localhost:3000/ for example`
    );
  });