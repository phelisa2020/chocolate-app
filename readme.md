# Chocolate app.

Create a database called : `choco` on PostgreSQL.

Give your laptop user access to this database.

Now run psql as the postgres user:

```
sudo -u postgres psql;
```

Grant your user access to the `choco` database by running this command:

```
grant all privileges on database `choco` to <your username here>;
```

Create  the `chocolate` table in the database.

```
create table chocolate (
    id serial primary key not null,
    name text,
    qty int);
```

## Run the app

To run the app do an: `npm install` followed by `npm start`.

## JavaScript  dependencies

You will need Axios, Handlebars JS & lodash JavaScript dependencies. To integrate Teachable Maching into this project.

### Handlebars

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js" integrity="sha512-zT3zHcFYbQwjHdKjCu6OMmETx8fJA9S7E6W7kBeFxultf75OPTYUJigEKX58qgyQMi1m1EgenfjMXlRZG8BXaw==" crossorigin="anonymous"></script>
```

### Axios

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js"></script>
```

### Lodash

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js" integrity="sha512-90vH1Z83AJY9DmlWa8WkjkV79yfS2n2Oxhsi2dZbIv0nC4E6m5AbH8Nh156kkM7JePmqD6tcZsfad1ueoaovww==" crossorigin="anonymous"></script>
```