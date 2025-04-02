module.exports = {

"[project]/.next-internal/server/app/api/users/[id]/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/mongodb [external] (mongodb, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}}),
"[project]/src/utils/mongo.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri);
const db = client.db("blog");
const __TURBOPACK__default__export__ = db;
}}),
"[project]/src/utils/user-manager.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mongo.ts [app-route] (ecmascript)");
;
class UserManager {
    async getUserById(id) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("users").findOne({
            _id: id
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    async getUserByUsername(username) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("users").findOne({
            username
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
const userManager = new UserManager();
const __TURBOPACK__default__export__ = userManager;
}}),
"[project]/src/utils/post-manager.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mongo.ts [app-route] (ecmascript)");
;
class PostManager {
    async createPost(post, user) {
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("BlogCategories").findOne({
            name: post.category
        });
        if (!category) {
            throw new Error("Category not found");
        }
        const blogEntry = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("BlogEntries").insertOne({
            ...post,
            category: category._id,
            author: user._id,
            creationDate: new Date(),
            editDates: [],
            impressionCount: 0
        });
        return blogEntry;
    }
    async getPost(id) {
        const post = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("BlogEntries").findOne({
            _id: id
        });
        return post;
    }
    async deletePost(id) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("BlogEntries").deleteOne({
            _id: id
        });
    }
    async getPostsByUserId(userId) {
        const posts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("BlogEntries").find({
            author: userId
        }).toArray();
        return posts;
    }
}
const __TURBOPACK__default__export__ = new PostManager();
}}),
"[project]/src/app/api/users/[id]/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$user$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/user-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$post$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/post-manager.ts [app-route] (ecmascript)");
;
;
;
async function GET(request, { params }) {
    const { id } = params;
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$user$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getUserByUsername(id);
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "User not found"
        }, {
            status: 404
        });
    }
    const publicUser = {
        _id: user._id,
        username: user.username,
        name: user.name
    };
    const posts = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$post$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getPostsByUserId(user._id);
    const publicUserPostDetails = {
        _id: user._id,
        username: user.username,
        name: user.name,
        posts: posts.map((post)=>({
                _id: post._id,
                title: post.title,
                description: post.description,
                author: {
                    _id: user._id,
                    username: user.username,
                    name: user.name
                },
                creationDate: post.creationDate,
                editDates: post.editDates,
                impressionCount: post.impressionCount,
                content: post.content,
                commentsAllowed: post.commentsAllowed,
                category: post.category
            }))
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(publicUserPostDetails);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__79f500b2._.js.map