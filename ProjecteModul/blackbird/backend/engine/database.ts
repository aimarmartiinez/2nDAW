import { knex } from "knex";
import { Model } from "objection";
import User from "../models/user.model";
import bcrypt from "bcryptjs"
import Post from "../models/post.model";
import PostComment from "../models/postcomment.model";


class Database {
  db!: knex.Knex
  async start() {
    let db = knex({
      client: 'sqlite3',
      connection: {
        filename: './backend/data/db.sqlite'
      },
      useNullAsDefault: true
    })
    this.db = db
    Model.knex(db)
    checkUpdates(db)
  }
}

let db = new Database()
export default db

async function checkUpdates(db: knex.Knex) {
  const existConfigTable = await db.schema.hasTable('configs')
  if (!existConfigTable) {
    initialDatabase(db)
  }
}

async function initialDatabase(db: knex.Knex) {
  await db.schema.createTable('users', (t) => {
    t.increments('userId').primary()
    t.string('fullName').notNullable()
    t.string('userName').notNullable()
    t.string('hashPass').notNullable()
    t.string('avatar').notNullable()
  })

  await db.schema.createTable('posts', t => {
    t.increments('postId').primary();
    t.integer('userId').unsigned().references('userId').inTable('users').onDelete('CASCADE');
    t.string('title');
    t.text('body');
    t.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    t.integer('likeCount').notNullable().defaultTo(0);
  })
await db.schema.createTable('likes', t => {
    t.increments('likeId').primary();
    t.integer('userId').unsigned().references('userId').inTable('users').onDelete('CASCADE');
    t.integer('postId').unsigned().references('postId').inTable('posts').onDelete('CASCADE');
    t.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
    t.unique(['userId', 'postId']);
  })
  
  await db.schema.createTable('comments', t => {
    t.increments('commentId').primary();
    t.integer('userId').unsigned().references('postId').inTable('users').onDelete('CASCADE');
    t.integer('postId').unsigned().references('postId').inTable('posts').onDelete('CASCADE');
    t.text('body');
    t.timestamp('createdAt').notNullable().defaultTo(db.fn.now());
  })

  await db.schema.createTable('configs', (t) => {
    t.string('key').primary()
    t.string('value').notNullable()
  })
  await db('configs').insert({
    key: 'version',
    value: '0.1'
  })

  await insertUsers()
  await insertPosts()
  await insertComments()
}


async function insertUsers() {
  const users = [
    { userId: 0, fullName: 'Administrator', userName: 'admin', avatar: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Auburn&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=FlatNatural&mouthType=Twinkle&skinColor=Light" },
    { userId: 1, fullName: 'Jon Gordon', userName: 'jgordon', avatar: "https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Prescription01&hatColor=Heather&hairColor=Auburn&facialHairType=MoustacheMagnum&facialHairColor=Blonde&clotheType=ShirtCrewNeck&clotheColor=Blue02&eyeType=Close&eyebrowType=SadConcernedNatural&mouthType=Eating&skinColor=Pale" },
    { userId: 2, fullName: 'Alice Morgan', userName: 'amorgan', avatar: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Kurt&hairColor=Blonde&facialHairType=Blank&clotheType=Overall&clotheColor=Blue03&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Black" },
    { userId: 3, fullName: 'Carlos Rivera', userName: 'crivera', avatar: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=Blue01&graphicType=Hola&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=Tanned" },
    { userId: 4, fullName: 'Emily Zhang', userName: 'ezhang', avatar: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=PastelRed&graphicType=Selena&eyeType=Side&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Brown" },
    { userId: 5, fullName: 'Liam Smith', userName: 'lsmith', avatar: "https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Sunglasses&facialHairType=BeardMajestic&facialHairColor=Blonde&clotheType=Hoodie&clotheColor=Gray02&eyeType=Default&eyebrowType=RaisedExcited&mouthType=Default&skinColor=Brown" },
  ];

  for (let user of users) {
    const u = new User();
    u.userId = user.userId;
    u.fullName = user.fullName;
    u.userName = user.userName;
    u.avatar = user.avatar
    u.hashPass = await bcrypt.hash(user.userName, 10);
    await u.$query().insert();
  }
}

async function insertPosts() {
  const posts = [
    {
      postId: 1,
      title: 'La Diada Nacional de Catalunya',
      body: 'El 11 de setembre es celebra la Diada Nacional de Catalunya amb multitudinàries manifestacions.',
      createdAt: new Date('2025-09-11'),
      userId: 1,
    },
    {
      postId: 2,
      title: 'Barcelona acull el Mobile World Congress',
      body: 'Barcelona torna a ser la capital mundial de la tecnologia amb l\'MWC 2025.',
      createdAt: new Date('2025-02-25'),
      userId: 1,
    },
    {
      postId: 3,
      title: 'Nou parc natural inaugurat',
      body: 'S\'ha inaugurat un nou parc natural a la comarca del Montseny per preservar la biodiversitat.',
      createdAt: new Date('2025-06-10'),
      userId: 2,
    },
    {
      postId: 4,
      title: 'Aprovat el pla de mobilitat sostenible',
      body: 'El govern català aprova un nou pla per reduir emissions i fomentar el transport públic.',
      createdAt: new Date('2025-03-15'),
      userId: 2,
    },
    {
      postId: 5,
      title: 'Festival de música al Parc Güell',
      body: 'Aquest estiu se celebrarà un festival de música amb artistes locals i internacionals.',
      createdAt: new Date('2025-07-20'),
      userId: 3,
    },
    {
      postId: 6,
      title: 'Increment del turisme cultural',
      body: 'Catalunya veu un augment del turisme cultural amb visites a museus i patrimoni.',
      createdAt: new Date('2025-05-05'),
      userId: 3,
    },
    {
      postId: 7,
      title: 'Millores en la xarxa de carrils bici',
      body: 'Les ciutats catalanes amplien la xarxa de carrils bici per fomentar la mobilitat sostenible.',
      createdAt: new Date('2025-04-22'),
      userId: 4,
    },
    {
      postId: 8,
      title: 'Exposició d\'art contemporani a Girona',
      body: 'Una nova exposició presenta artistes emergents catalans i internacionals.',
      createdAt: new Date('2025-08-13'),
      userId: 4,
    },
    {
      postId: 9,
      title: 'Campionat de futbol base a Tarragona',
      body: 'Aquest cap de setmana Tarragona acull un campionat de futbol base amb equips de tot Catalunya.',
      createdAt: new Date('2025-09-12'),
      userId: 5,
    },
    {
      postId: 10,
      title: 'Inici de la temporada de castells',
      body: 'Els castellers comencen la temporada amb diverses actuacions a les festes majors.',
      createdAt: new Date('2025-04-30'),
      userId: 5,
    },
  ];

  for (let post of posts) {
    const p = new Post();
    p.postId = post.postId;
    p.title = post.title;
    p.body = post.body;
    p.userId = post.userId;
    p.createdAt = post.createdAt.toISOString();
    await p.$query().insert();

  }

}

async function insertComments() {
  const comments = [
    // Post 1 - 2025-09-11
    { commentId: 1, postId: 1, userId: 2, body: 'Una data molt significativa per a tots els catalans.', createdAt: new Date('2025-09-11T10:15:00') },
    { commentId: 2, postId: 1, userId: 3, body: 'He anat a la manifestació, ha estat molt emotiva.', createdAt: new Date('2025-09-12T08:30:00') },
    { commentId: 3, postId: 1, userId: 4, body: 'És important recordar la nostra història.', createdAt: new Date('2025-09-13T14:45:00') },

    // Post 2 - 2025-02-25
    { commentId: 4, postId: 2, userId: 1, body: 'Cada any el MWC supera les expectatives. Impressionant!', createdAt: new Date('2025-02-25T12:00:00') },
    { commentId: 5, postId: 2, userId: 4, body: 'Barcelona brilla amb esdeveniments com aquest.', createdAt: new Date('2025-02-26T09:40:00') },
    { commentId: 6, postId: 2, userId: 5, body: 'Gran oportunitat per a les start-ups catalanes.', createdAt: new Date('2025-02-28T17:25:00') },

    // Post 3 - 2025-06-10
    { commentId: 7, postId: 3, userId: 1, body: 'Una gran notícia per al medi ambient!', createdAt: new Date('2025-06-11T11:20:00') },
    { commentId: 8, postId: 3, userId: 2, body: 'El Montseny és un tresor que cal protegir.', createdAt: new Date('2025-06-12T16:10:00') },

    // Post 4 - 2025-03-15
    { commentId: 9, postId: 4, userId: 3, body: 'És hora de prendre mesures sostenibles. Bona iniciativa!', createdAt: new Date('2025-03-15T13:35:00') },
    { commentId: 10, postId: 4, userId: 5, body: 'Esperem que es notin els canvis aviat.', createdAt: new Date('2025-03-17T10:50:00') },

    // Post 5 - 2025-07-20
    { commentId: 11, postId: 5, userId: 2, body: 'Aquest festival promet molt! Ja tinc l’entrada.', createdAt: new Date('2025-07-21T09:00:00') },
    { commentId: 12, postId: 5, userId: 4, body: 'Un lloc ideal per combinar música i patrimoni.', createdAt: new Date('2025-07-22T18:45:00') },
    { commentId: 13, postId: 5, userId: 1, body: 'M’encanta que es potenciï la música local.', createdAt: new Date('2025-07-23T11:10:00') },

    // Post 6 - 2025-05-05
    { commentId: 14, postId: 6, userId: 3, body: 'És genial veure com creix el turisme cultural.', createdAt: new Date('2025-05-06T10:05:00') },
    { commentId: 15, postId: 6, userId: 2, body: 'Una bona alternativa al turisme de platja.', createdAt: new Date('2025-05-07T15:00:00') },

    // Post 7 - 2025-04-22
    { commentId: 16, postId: 7, userId: 1, body: 'Les bicicletes són el futur! Bona notícia.', createdAt: new Date('2025-04-22T08:30:00') },
    { commentId: 17, postId: 7, userId: 5, body: 'Ara només falta que millorin la seguretat viària.', createdAt: new Date('2025-04-23T14:55:00') },

    // Post 8 - 2025-08-13
    { commentId: 18, postId: 8, userId: 2, body: 'Girona sempre apostant per la cultura!', createdAt: new Date('2025-08-13T13:10:00') },
    { commentId: 19, postId: 8, userId: 3, body: 'Vaig visitar l’exposició i és molt recomanable.', createdAt: new Date('2025-08-15T17:45:00') },

    // Post 9 - 2025-09-12
    { commentId: 20, postId: 9, userId: 1, body: 'Els joves talents del futbol mereixen visibilitat!', createdAt: new Date('2025-09-12T11:30:00') },
    { commentId: 21, postId: 9, userId: 4, body: 'Gran ambient a Tarragona aquest cap de setmana.', createdAt: new Date('2025-09-13T10:15:00') },

    // Post 10 - 2025-04-30
    { commentId: 22, postId: 10, userId: 2, body: 'Els castells són una tradició que emociona!', createdAt: new Date('2025-05-01T12:20:00') },
    { commentId: 23, postId: 10, userId: 3, body: 'Ja tinc ganes de veure les actuacions a la meva ciutat.', createdAt: new Date('2025-05-02T16:35:00') },
  ];

  for (let comment of comments) {
    const u = new PostComment();
    u.commentId = comment.commentId
    u.postId = comment.postId;
    u.userId = comment.userId;
    u.createdAt = comment.createdAt.toISOString();
    u.body = comment.body;
    await u.$query().insert();
  }
}
