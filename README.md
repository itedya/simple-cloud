<h1 style="text-align: center">
    SimpleCloud
</h1>

<p style="text-align: center;">Simple cloud server built in <a href="nodejs.org">Node.js</a><p>

## Description

Alternative to <a href="https://nextcloud.com/">Nextcloud</a> or <a href="https://owncloud.com/">ownCloud</a>.
For now, **it's buggy** and lacks lots of features, but in future it can be very promising alternative to php based cloud systems.

I build it with main focus on tiny linux servers (like 250 - 500MB of ram, for ex. polish provider <a href="https://mikr.us/?r=56f6945b">MIKRUS</a>).

## Some measurements

**All of these measurements were made in development mode, with file watcher and compiler. Below is the command I am talking about.**

```bash
$ npm run start:dev
```

For now app uses from 30 - 45MB of ram in idle. It automatically reduces it's usage when doing heavier load to approximately 32MB.

<img src="https://i.imgur.com/DSPHt80.png" />

When app makes archive out of directory data (I tested it on two samples, 200MB and 3 - 4GB of data in directory) it's usage is in range of 30 - 33MB.

<img src="https://i.imgur.com/CN0P2gX.png" />

## Want to help?

If yes, I don't have skill in front-end. I can do basic stuff, but design is my weak point. You can redesign it or even create from start.

and english in that readme can be improved too

## Set up development
```bash
$ npm install
```

```bash
$ prisma migrate reset
```

```bash
$ prisma db push
```
