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
    title: "Rising Antisemitism Worldwide",
    author: ObjectId("67e109cb2ddc3e38cfe742b2"),
    description: "An analysis of the increasing antisemitic incidents globally.",
    creationDate: new Date(),
    editDates: [],
    impressionCount: 0,
    content: {
      text: "Detailed analysis on antisemitism...",
    },
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
    content: {
      text: "A deep dive into the MAGA movement...",
    },
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
    content: {
      text: "Exploring the Fourth Reich concept...",
      images: [],
      link: ""
    },
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
    content: {
      text: "Policy impacts of MAGA...",
    },
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
    content: {
      text: "Historical analysis of the Fourth Reich narrative...",
    },
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

// Design Pattern: Outlier Pattern
db.PopularBlogEntries.createIndex(
  { title: 1, author: 1 },
  { unique: true }
);

// Query of getting newest 2 Comments under a Users Entries, because it wouldn't fit into the application
db.Comments.aggregate([
  {
    $lookup: {
      from: "BlogEntries",
      localField: "blogEntry",
      foreignField: "_id",
      as: "blogInfo"
    }
  },
  { $unwind: "$blogInfo" },
  {
    $match: {
      "blogInfo.author": ObjectId("67e109cb2ddc3e38cfe742b4")
    }
  },
  { $sort: { createdAt: -1 } },
  { $limit: 2 }
])

// Changes (because those weren't reasonable in our application)

// Change the author of a blog entry
db.BlogEntries.updateOne(
  { _id: ObjectId("67e109cb2ddc3e38cfe74211") },
  { $set: { author: ObjectId("67e109cb2ddc3e38cfe742b1") } }
);

// Extend the newest blog-entry by an additional field ‘hashtag’ with content
const newestPost = db.BlogEntries.find().sort({ creationDate: -1 }).limit(1).toArray()[0];
if (newestPost) {
  db.BlogEntries.updateOne(
    {
      _id: newestPost._id,
      "content.hashtag": { $exists: false }
    },
    {
      $set: { "content.hashtag": "#CurrentNews" }
    }
  );
} else {
  const newestPopular = db.PopularBlogEntries.find().sort({ creationDate: -1 }).limit(1).toArray()[0];
  if (newestPopular) {
    db.PopularBlogEntries.updateOne(
      {
        _id: newestPopular._id,
        "content.hashtag": { $exists: false }
      },
      {
        $set: { "content.hashtag": "#CurrentNews" }
      }
    );
  }
}
