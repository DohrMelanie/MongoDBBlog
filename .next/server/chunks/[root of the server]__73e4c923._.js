module.exports = {

"[project]/.next-internal/server/app/api/auth/verify/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/utils/code-manager.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mongo.ts [app-route] (ecmascript)");
;
class CodeManager {
    async generateCode(username) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("codes").insertOne({
            username,
            code
        });
        return code;
    }
    async verifyCode(username, code) {
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("codes").findOne({
            username,
            code
        });
        return result !== null;
    }
    async deleteCode(username) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("codes").deleteOne({
            username
        });
    }
}
const __TURBOPACK__default__export__ = new CodeManager();
}}),
"[project]/src/utils/token-manager.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
class TokenManager {
    async generateKey() {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(process.env.JWT_SECRET || "default-secret");
        return await crypto.subtle.importKey("raw", keyData, {
            name: "HMAC",
            hash: "SHA-256"
        }, false, [
            "sign",
            "verify"
        ]);
    }
    async signData(data) {
        const encoder = new TextEncoder();
        const key = await this.generateKey();
        const payload = encoder.encode(JSON.stringify(data));
        const signature = await crypto.subtle.sign("HMAC", key, payload);
        return Buffer.from(signature).toString('base64url');
    }
    async verifySignature(token, payload) {
        const key = await this.generateKey();
        const signature = Buffer.from(token, 'base64url');
        const data = new TextEncoder().encode(payload);
        return await crypto.subtle.verify("HMAC", key, signature, data);
    }
    async generateToken(username) {
        const refreshToken = {
            username,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 day
        };
        const payload = {
            username,
            refreshToken: await this.signData(refreshToken)
        };
        return await this.signData(payload);
    }
    async verifyToken(token) {
        try {
            const [headerB64, payloadB64, signature] = token.split('.');
            const payload = Buffer.from(payloadB64, 'base64url').toString();
            const data = JSON.parse(payload);
            const isValid = await this.verifySignature(signature, payload);
            if (!isValid) return false;
            if (data.exp && data.exp < Math.floor(Date.now() / 1000)) {
                return false;
            }
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getUserFromToken(token) {
        const result = await this.verifyToken(token);
        if (!result) return null;
        return result.username;
    }
}
const __TURBOPACK__default__export__ = new TokenManager();
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/utils/auth.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mongo.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
class AuthManager {
    async addUser(user) {
        const hash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(user.password).digest("hex");
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("users").insertOne({
            username: user.username,
            password: hash,
            email: user.email,
            name: user.name,
            isVerified: false
        });
    }
    async verifyUserAccount(username) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("users").updateOne({
            username
        }, {
            $set: {
                isVerified: true
            }
        });
    }
    async verifyUser(username, password) {
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("users").findOne({
            username
        });
        if (!user) {
            return false;
        }
        const hash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(password).digest("hex");
        return user.password === hash;
    }
    async getUserDetails(username) {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mongo$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].collection("users").findOne({
            username
        }, {
            projection: {
                password: 0
            }
        });
    }
}
const __TURBOPACK__default__export__ = new AuthManager();
}}),
"[project]/src/app/api/auth/verify/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$code$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/code-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$token$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/token-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
;
;
async function POST(request) {
    const { username, code } = await request.json();
    const isCodeValid = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$code$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verifyCode(username, code);
    if (!isCodeValid) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid code"
        }, {
            status: 400
        });
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$code$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].deleteCode(username);
    const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getUserDetails(username);
    console.log(userData);
    if (!userData) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "User not found"
        }, {
            status: 404
        });
    }
    if (!userData.isVerified) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verifyUserAccount(username);
    }
    const token = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$token$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].generateToken(username);
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/"
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: "User verified successfully"
    }, {
        status: 200
    });
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__73e4c923._.js.map