use("blog")

db.createCollection("BlogUsers")
db.createCollection("BlogEntries")
db.createCollection("BlogCategories")
db.createCollection("Comments")

db.BlogUsers.insertMany([
  { _id: ObjectId("67e109cb2ddc3e38cfe742b2"), username: "kanyeee", name: { firstname: "Kanye", lastname: "West" }, email: "kanye@example.com", password: "pass123" },
  { _id: ObjectId("67e109cb2ddc3e38cfe742b4"), username: "badassfukingk_id", name: { firstname: "Gunner", lastname: "Shandon" }, email: "gun@example.com", password: "pass123" },
  { _id: ObjectId("67e109cb2ddc3e38cfe742b5"), username: "markie", name: { firstname: "Mark", lastname: "Zuckerberg" }, email: "mark@example.com", password: "pass123" },
  { _id: ObjectId("67e109cb2ddc3e38cfe742b6"), username: "bobbyaltoff", name: { firstname: "Bobby", lastname: "Althoff" }, email: "bob@example.com", password: "pass123" },
  { _id: ObjectId("67e109cb2ddc3e38cfe742b1"),  username: "naoka", name: { firstname: "Naoyuki", lastname: "Kanezawa" }, email: "nao@example.com", password: "pass123" }
]);

db.BlogCategories.insertMany([
  { _id: ObjectId("67e109cb2ddc3e38cfe74bb1"), name: "Antisemitism" },
  { _id: ObjectId("67e109cb2ddc3e38cfe74bb2"), name: "MAGA" },
  { _id: ObjectId("67e109cb2ddc3e38cfe74bb3"), name: "Fourth Reich" }
]);

db.BlogEntries.insertMany([
  {
    _id: ObjectId("67e109cb2ddc3e38cfe74211"),
    title: "Rising Antisemitism Worldw_ide",
    author: ObjectId("67e109cb2ddc3e38cfe742b2"),
    description: "An analysis of the increasing antisemitic inc_idents globally.",
    creationDate: new Date(),
    editDates: [],
    impressionCount: 0,
    content: "<base64_encoded_image> Detailed analysis on antisemitism...",
    commentsAllowed: true,
    category: ObjectId("67e109cb2ddc3e38cfe74bb1")
  },
  {
    _id: ObjectId("67e109cb2ddc3e38cfe74212"),
    title: "The MAGA Movement",
    author: ObjectId("67e109cb2ddc3e38cfe742b4"),
    description: "Understanding the political and social influence of MAGA.",
    creationDate: new Date(),
    editDates: [new Date()],
    impressionCount: 5,
    content: "A deep dive into the MAGA movement...",
    commentsAllowed: true,
    category: ObjectId("67e109cb2ddc3e38cfe74bb2")
  },
  {
    _id: ObjectId("67e109cb2ddc3e38cfe74213"),
    title: "The Fourth Reich: Myth or Reality?",
    author: ObjectId("67e109cb2ddc3e38cfe742b5"),
    description: "Investigating the claims and fears around the Fourth Reich.",
    creationDate: new Date(),
    editDates: [],
    impressionCount: 12,
    content: "Exploring the Fourth Reich concept...",
    commentsAllowed: true,
    category: ObjectId("67e109cb2ddc3e38cfe74bb3")
  },
  {
    _id: ObjectId("67e109cb2ddc3e38cfe74214"),
    title: "MAGA Policies in Practice",
    author: ObjectId("67e109cb2ddc3e38cfe742b5"),
    description: "Examining the real-world impacts of MAGA-aligned policies.",
    creationDate: new Date(),
    editDates: [],
    impressionCount: 0,
    content: "Policy impacts of MAGA...",
    commentsAllowed: false,
    category: ObjectId("67e109cb2ddc3e38cfe74bb1")
  },
  {
    _id: ObjectId("67e109cb2ddc3e38cfe74215"),
    title: "Historical Parallels to the Fourth Reich",
    author: ObjectId("67e109cb2ddc3e38cfe742b6"),
    description: "Drawing parallels between historical events and modern concerns.",
    creationDate: new Date(),
    editDates: [new Date()],
    impressionCount: 8,
    content: "Historical analysis of the Fourth Reich narrative...",
    commentsAllowed: true,
    category: ObjectId("67e109cb2ddc3e38cfe74bb2")
  }
]);

db.Comments.insertMany([
  {
    blogEntry: ObjectId("67e109cb2ddc3e38cfe74211"),
    author: ObjectId("67e109cb2ddc3e38cfe742b2"),
    text: "Why tf does no one talk about this?",
    createdAt: new Date()
  },
  {
    blogEntry: ObjectId("67e109cb2ddc3e38cfe74212"),
    author: ObjectId("67e109cb2ddc3e38cfe742b6"),
    text: "MAGA movement is DAAAA BEEESSSTT",
    createdAt: new Date()
  },
  {
    blogEntry: ObjectId("67e109cb2ddc3e38cfe74213"),
    author: ObjectId("67e109cb2ddc3e38cfe742b5"),
    text: "I fear a Fourth Reich!!!!!",
    createdAt: new Date()
  },
  {
    blogEntry: ObjectId("67e109cb2ddc3e38cfe74214"),
    author: ObjectId("67e109cb2ddc3e38cfe742b4"),
    text: "Guys, calm down pls",
    createdAt: new Date()
  }
]);

db.getCollection("BlogUsers").createIndex(
  { username: 1 },
  { unique: true }
);

db.getCollection("BlogEntries").createIndex(
  { username: 1 },
  { unique: true, sparse: true}
);
