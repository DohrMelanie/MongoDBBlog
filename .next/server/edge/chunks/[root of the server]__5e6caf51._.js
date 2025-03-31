(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__5e6caf51._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/src/utils/token-manager.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
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
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(signature).toString('base64url');
    }
    async verifySignature(token, payload) {
        const key = await this.generateKey();
        const signature = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(token, 'base64url');
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
            const payload = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__["Buffer"].from(payloadB64, 'base64url').toString();
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
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$token$2d$manager$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/token-manager.ts [middleware-edge] (ecmascript)");
;
;
async function middleware(request) {
    const cookie = request.cookies.get("token");
    if (!cookie) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    const token = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$token$2d$manager$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].verifyToken(cookie.value);
    console.log(token);
    if (!token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    if (typeof token === "string") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    if (token.exp && token.exp < Date.now() / 1000) {
        const refreshToken = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$token$2d$manager$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].verifyToken(token.refreshToken || "");
        if (!refreshToken) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        if (typeof refreshToken === "string") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        if (refreshToken.exp && refreshToken.exp < Date.now() / 1000) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        const newToken = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$token$2d$manager$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].generateToken(token.username);
        request.cookies.set("token", newToken);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/api/v1/:path*"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__5e6caf51._.js.map