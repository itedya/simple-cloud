<h1 style="text-align: center">
    SimpleCloud
</h1>

<p style="text-align: center;">Simple cloud server built in <a href="nodejs.org">Node.js</a><p>

## Description

Alternative to <a href="https://nextcloud.com/">Nextcloud</a> or <a href="https://owncloud.com/">ownCloud</a>.
For now, **it's buggy** and lacks lots of features, but in future it can be very promising alternative to php based cloud systems.

I build it with main focus on tiny linux servers (like 250 - 500MB of ram, for ex. polish provider <a href="https://mikr.us/?r=56f6945b">MIKRUS</a>).

## Want to help?

If yes, I don't have skill in front-end. I can do basic stuff, but design is my weak point. You can redesign it or even create from start.

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
